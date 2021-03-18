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

		var outPath = "./package-browser.lock"
		if len(args) > 0 {
			outPath = args[0]
		}

		start := time.Now()

		asJSON, _ := cmd.Flags().GetBool("json")

		var jsonText []byte

		jsonText, err = ioutil.ReadFile(pkgJsonPath)

		if err != nil {
			cmd.Println("An error occurred while reading " + pkgJsonPath)
			cmd.PrintErr(err)
		}

		file, err := lockfile.NewJavascriptPackageManifestPartial(&jsonText, true)

		if err != nil {
			cmd.Println("An error occurred while parsing " + pkgJsonPath)
			cmd.PrintErr(err)
		}
		version := "1.0.0"
		name := file.Name
		var err error
		var manifest lockfile.JavascriptPackageManifest

		host, _ := cmd.Flags().GetString("cache")
		var cacheType CacheType

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
				req := lockfile.JavascriptPackageRequest{
					Manifest:      &file,
					ClientVersion: &version,
					Name:          &name,
				}

				reqBuffer := buffer.Buffer{
					Bytes: &bytebufferpool.ByteBuffer{},
				}

				req.Encode(&reqBuffer)
				httpReq := fasthttp.AcquireRequest()
				httpReq.Header.SetMethod("POST")
				httpResp := fasthttp.AcquireResponse()
				defer fasthttp.ReleaseRequest(httpReq)
				defer fasthttp.ReleaseResponse(httpResp)

				hash := xxhash.Sum64(reqBuffer.Bytes.B)

				httpReq.SetRequestURI(fmt.Sprintf("%s/pkg/%d", host, hash))
				cmd.Printf("> POST %s", httpReq.URI().String())
				httpReq.Header.Add("Content-Type", string(server.AcceptEncodingBinary))
				fasthttp.DoDeadline(httpReq, httpResp, time.Now().Add(time.Second*30))
				statusCode := httpResp.StatusCode()
				cmd.Printf("< Status: %d", statusCode)

				if statusCode != 200 {
					cmd.Printf("<%s> [ERR]: %s", statusCode)
					return
				}

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
				store := lockfile.NewMemoryPackageManifestStore()
				manifest, err = store.ResolveDependencies(&file, cmd.Context())

				if err != nil {
					cmd.Printf("<%d> [ERR]: %s", lockfile.ErrorCodeGeneric, err.Error())
					os.Exit(1)
				}
			}
		}

		if asJSON {
			json, err := jsoniter.ConfigCompatibleWithStandardLibrary.Marshal(manifest)
			if err != nil {
				cmd.Printf("<%d> [ERR]: %s", lockfile.ErrorCodeGeneric, "Failed to decode as json")
			}
			os.WriteFile(outPath, json, os.ModePerm)
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
	clientCmd.Flags().StringP("to", "h", "https://jspm.io", "If its a local file path, download & extract tarballs. If its a remote file path, use an import map.")

	// Cobra supports local flags which will only run when this command
	// is called directly, e.g.:
	// clientCmd.Flags().BoolP("toggle", "t", false, "Help message for toggle")
}
