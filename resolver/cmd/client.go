/*
Copyright © 2021 NAME HERE <EMAIL ADDRESS>

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/
package cmd

import (
	"fmt"
	"io/ioutil"
	"os"
	"path"
	"strings"
	"time"

	"github.com/cespare/xxhash"
	"github.com/jarred-sumner/devserverless/config"
	"github.com/jarred-sumner/devserverless/resolver/cache"
	"github.com/jarred-sumner/devserverless/resolver/internal/server"
	"github.com/jarred-sumner/devserverless/resolver/lockfile"
	"github.com/jarred-sumner/peechy/buffer"
	jsoniter "github.com/json-iterator/go"
	"github.com/spf13/cobra"
	"github.com/spf13/viper"
	"github.com/valyala/bytebufferpool"
	"github.com/valyala/fasthttp"
)

// clientCmd represents the client command
var clientCmd = &cobra.Command{
	Use:   "client",
	Short: "A brief description of your command",
	Long: `A longer description that spans multiple lines and likely contains examples
and usage of using your command. For example:

Cobra is a CLI library for Go that empowers applications.
This application is a tool to generate the needed files
to quickly create a Cobra application.`,
	Run: func(cmd *cobra.Command, args []string) {
		pkgJsonPath, _ := cmd.Flags().GetString("package")
		pkgJsonPath = path.Clean(pkgJsonPath)
		var err error

		var outPathBase = "./package-browser"
		var outPathImport = "./package.importmap"
		var outPathLock = outPathBase + ".lock"
		if len(args) > 0 {
			outPathLock = args[0]
		}

		start := time.Now()

		asJSON, _ := cmd.Flags().GetBool("json")

		var jsonText []byte

		jsonText, err = ioutil.ReadFile(pkgJsonPath)

		if err != nil {
			cmd.Println("An error occurred while reading " + pkgJsonPath)
			cmd.PrintErr(err)
		}

		file, err := lockfile.NewJavascriptPackageManifestPartial(&jsonText, config.BLACKLIST_PACKAGES)

		if err != nil {
			cmd.Println("An error occurred while parsing " + pkgJsonPath)
			cmd.PrintErr(err)
		}
		version := "1.0.0"
		name := file.Name
		var manifest lockfile.JavascriptPackageManifest

		host, _ := cmd.Flags().GetString("cache")
		var cacheType cache.CacheType
		importMapHost, _ := cmd.Flags().GetString("to")

		if strings.HasPrefix(host, "http://") || strings.HasPrefix(host, "https://") {
			cacheType = cache.CacheTypeRemote
		} else if host == "none" || host == "" || host == "disable" {
			cacheType = cache.CacheTypeNone
		} else {
			cacheType = cache.CacheTypeLocal
		}

		switch cacheType {
		case cache.CacheTypeRemote:
			{
				denylist := false
				req := lockfile.JavascriptPackageRequest{
					Manifest:       &file,
					ClientVersion:  &version,
					Name:           &name,
					EnableDenylist: &denylist,
				}

				reqBuffer := buffer.Buffer{
					Bytes: &bytebufferpool.ByteBuffer{
						B: make([]byte, 0, 100),
					},
				}

				req.Encode(&reqBuffer)

				httpReq := fasthttp.AcquireRequest()
				httpReq.SetBody(reqBuffer.Slice())
				httpReq.Header.SetMethod("POST")
				httpResp := fasthttp.AcquireResponse()
				defer fasthttp.ReleaseRequest(httpReq)
				defer fasthttp.ReleaseResponse(httpResp)

				hash := xxhash.Sum64(reqBuffer.Bytes.B)

				httpReq.SetRequestURI(fmt.Sprintf("%s/pkg/%d", host, hash))
				cmd.Printf("> POST %s (%d bytes) \n", httpReq.URI().String(), reqBuffer.Offset)
				httpReq.Header.Add("Content-Type", string(server.AcceptEncodingBinary))
				fasthttp.DoDeadline(httpReq, httpResp, time.Now().Add(time.Second*30))
				statusCode := httpResp.StatusCode()
				cmd.Printf("< Status: %d\n", statusCode)

				encoding := string(httpResp.Header.Peek(fasthttp.HeaderContentEncoding))
				var body []byte
				switch encoding {
				case "deflate":
				case "gzip":
					{
						body, err = httpResp.BodyGunzip()
					}
				case "br":
					{
						body, err = httpResp.BodyUnbrotli()
					}
				default:
					{
						body = httpResp.Body()
					}
				}

				if statusCode != 200 {
					cmd.Printf("<%d> [ERR]: %s", statusCode, httpResp.Body())
					return
				}

				var decoder buffer.Buffer

				decoder = buffer.Buffer{
					Bytes: &bytebufferpool.ByteBuffer{B: body},
				}

				resp, _ := lockfile.DecodeJavascriptPackageResponse(&decoder)
				if resp.Result == nil && resp.Message != nil {
					cmd.Printf("<%d> [ERR]: %s", &resp.ErrorCode, *resp.Message)
					os.Exit(1)
				} else if resp.Result == nil {
					cmd.Printf("<%d> [ERR]: %s", &resp.ErrorCode, "Something went wrong.")
					os.Exit(1)
				}

				manifest = *resp.Result
			}
		case cache.CacheTypeLocal:
			{

			}
		case cache.CacheTypeNone:
			{
				store := cache.NewMemoryPackageManifestStore()
				manifest, err = store.ResolveDependencies(&file, cmd.Context())

				if err != nil {
					cmd.Printf("<%d> [ERR]: %s", lockfile.ErrorCodeGeneric, err.Error())
					os.Exit(1)
				}
			}
		}

		var importBuffer []byte

		importBuffer, err = lockfile.NewImportMap(&manifest, importMapHost)

		if err != nil {
			cmd.Printf("<%d> [ERR]: %s\n", lockfile.ErrorCodeGeneric, "Failed to generate import map")
			os.Exit(1)
		}

		err = os.WriteFile(outPathImport, importBuffer, os.ModePerm)

		if err != nil {
			cmd.Printf("<%d> [ERR]: %s\n", lockfile.ErrorCodeGeneric, "Failed to write import map")
			os.Exit(1)
		}

		manifestBuffer := buffer.Buffer{
			Bytes: bytebufferpool.Get(),
		}

		err = manifest.Encode(&manifestBuffer)

		if err != nil {
			cmd.Printf("<%d> [ERR]: %s\n", lockfile.ErrorCodeGeneric, "Encoding error")
			os.Exit(1)
		}

		err = os.WriteFile(outPathLock, manifestBuffer.Slice(), os.ModePerm)

		if err != nil {
			cmd.Printf("<%d> [ERR]: Failed to save to %s\n", lockfile.ErrorCodeGeneric, outPathLock)
			cmd.PrintErr(err)
			os.Exit(1)
		} else {
			cmd.Printf("💾 Saved lockfile to %s\n", outPathLock)
		}

		if asJSON {
			json, err := jsoniter.ConfigCompatibleWithStandardLibrary.Marshal(manifest)
			if err != nil {
				cmd.Printf("<%d> [ERR]: %s\n", lockfile.ErrorCodeGeneric, "Failed to generate json")
			}
			os.WriteFile(outPathLock+".json", formatJSON(json), os.ModePerm)
		}

		if err == nil {
			cmd.Printf("✅ Completed in %s", time.Since(start))
		}

	},
}

func init() {
	rootCmd.AddCommand(clientCmd)

	// Here you will define your flags and configuration settings.

	// Cobra supports Persistent Flags which will work for this command
	// and all subcommands, e.g.:
	clientCmd.Flags().StringP("cache", "c", "$HOME/.cache", "File path or API server (https:// for API)")
	viper.BindPFlag("cache", clientCmd.Flags().Lookup("cache"))
	viper.BindEnv("cache", "PACKAGE_CACHE")

	clientCmd.Flags().BoolP("json", "j", true, "Write json version of lockfile to disk")
	clientCmd.Flags().BoolP("write", "w", true, "Write binary version of lockfile to disk")
	clientCmd.Flags().StringP("package", "p", "./package.json", "Path to package.json file")
	clientCmd.Flags().StringP("to", "t", "https://ga.jspm.io/npm:", "If its a local file path, download & extract tarballs. If its a remote file path, use an import map.")

	// Cobra supports local flags which will only run when this command
	// is called directly, e.g.:
	// clientCmd.Flags().BoolP("toggle", "t", false, "Help message for toggle")
}
