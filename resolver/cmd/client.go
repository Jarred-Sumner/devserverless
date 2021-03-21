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
	"errors"
	"fmt"
	"io/ioutil"
	"os"
	"path"
	"path/filepath"
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
	"github.com/valyala/bytebufferpool"
	"github.com/valyala/fasthttp"
)

func NormalizeRegistrar(cmd *cobra.Command) (string, error) {
	registrar, _ := cmd.Flags().GetString("registrar")

	if registrar == "npm" {
		registrar = lockfile.JSRegistrarFormatterStringNPM
	} else if registrar == "skypack" {
		registrar = lockfile.JSRegistrarFormatterStringSkypack
	} else if registrar == "jspm" {
		registrar = lockfile.JSRegistrarFormatterStringJSPM
	} else if strings.HasPrefix(registrar, "https://") || strings.HasPrefix(registrar, "http://") {

		if strings.Count(registrar, "%s") != 2 {
			registrar += "%s/%s"
		}
	} else {
		return "", errors.New("Expected registrar to be a url starting with https://, http://, or \"npm\", \"jspm\" or \"skypack\"")
	}

	return registrar, nil
}

func NormalizeCacheType(host string) cache.CacheType {
	if strings.HasPrefix(host, "http://") || strings.HasPrefix(host, "https://") {
		return cache.CacheTypeRemote
	} else if host == "none" || host == "" || host == "disable" {
		return cache.CacheTypeNone
	} else {
		return cache.CacheTypeLocal
	}
}

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
		start := time.Now()

		pkgJsonPath, _ := cmd.Flags().GetString("package")
		pkgJsonPath = path.Clean(pkgJsonPath)
		var err error

		var outPathBase = "./package-browser"
		var outPathImport = "./package.importmap"
		var outPathLock = outPathBase + ".lock"
		if len(args) > 0 {
			outPathLock = args[0]
		}

		var host string
		host, err = cmd.PersistentFlags().GetString("cache")
		var cacheType cache.CacheType
		importMapHost, _ := cmd.Flags().GetString("to")

		var flushChannel chan error

		cacheType = NormalizeCacheType(host)
		var registrar string
		registrar, err = NormalizeRegistrar(cmd)

		if err != nil {
			cmd.PrintErr(err)
			doExit(1, flushChannel)
			return
		}

		asJSON, _ := cmd.Flags().GetBool("json")
		var file lockfile.JavascriptPackageManifestPartial
		var name string
		var version string
		var manifest lockfile.JavascriptPackageManifest

		var loadContent = func() {
			var jsonText []byte

			jsonText, err = ioutil.ReadFile(pkgJsonPath)

			if err != nil {
				cmd.Println("An error occurred while reading " + pkgJsonPath)
				cmd.PrintErr(err)
				doExit(1, flushChannel)
			}

			file, err = lockfile.NewJavascriptPackageManifestPartial(&jsonText, config.BLACKLIST_PACKAGES)

			if err != nil {
				cmd.Println("An error occurred while parsing " + pkgJsonPath)
				cmd.PrintErr(err)
				doExit(1, flushChannel)
			}
			version = "1.0.0"
			name = file.Name
		}

		switch cacheType {
		case cache.CacheTypeRemote:
			{
				loadContent()
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
				host = filepath.Clean(host)

				dur0 := time.Now()

				if !filepath.IsAbs(host) {
					host, err = filepath.Abs(host)

					if err != nil {
						cmd.Printf("<%d> [ERR]: Cannot access cache directory at %s. Set --cache to \"none\", to an https URL, or to a directory you have write permissions to.\n%s", lockfile.ErrorCodeGeneric, err.Error())
						os.Exit(1)
						return
					}
				}

				if _, err := os.Stat(host); os.IsNotExist(err) {

					err = os.MkdirAll(host, 0755)
					if err != nil {
						cmd.Printf("<%d> [ERR]: Cannot access cache directory at %s. Set --cache to \"none\", to an https URL, or to a directory you have write permissions to.\n%s", lockfile.ErrorCodeGeneric, err.Error())
						os.Exit(1)
					}

				}

				if err != nil {
					cmd.Printf("<%d> [ERR]: Cannot access cache directory at %s. Set --cache to \"none\", to an https URL, or to a directory you have write permissions to.\n%s", lockfile.ErrorCodeGeneric, err.Error())
					os.Exit(1)
				}

				loadContent()
				cmd.Printf("resolved dir in %s", time.Since(dur0).String())
				dur1 := time.Now()
				store, err := cache.NewLocalPackageManifestStore(filepath.Join(host, ".duckcache"))
				cmd.Printf("opened db in %s", time.Since(dur1).String())
				if err != nil {
					cmd.Printf("<%d> [ERR]: %s", lockfile.ErrorCodeGeneric, err.Error())
					os.Exit(1)
				}
				store.Store.RegistrarAPI = registrar
				manifest, err = store.Store.ResolveDependencies(&file, cmd.Context())
				if err != nil {
					cmd.Printf("<%d> [ERR]: %s", lockfile.ErrorCodeGeneric, err.Error())
					os.Exit(1)
				}
				flushChannel = make(chan error)
				go store.Flush(flushChannel, true)
			}
		case cache.CacheTypeNone:
			{
				loadContent()
				store := cache.NewMemoryPackageManifestStore()
				store.RegistrarAPI = registrar
				manifest, err = store.ResolveDependencies(&file, cmd.Context())

				if err != nil {
					cmd.Printf("<%d> [ERR]: %s", lockfile.ErrorCodeGeneric, err.Error())
					doExit(1, nil)
					return
				}
			}
		}

		var importBuffer []byte

		importBuffer, err = lockfile.NewImportMap(&manifest, importMapHost)

		if err != nil {
			cmd.Printf("<%d> [ERR]: %s\n", lockfile.ErrorCodeGeneric, "Failed to generate import map")
			doExit(1, flushChannel)
			return
		}

		err = os.WriteFile(outPathImport, importBuffer, os.ModePerm)

		if err != nil {
			cmd.Printf("<%d> [ERR]: %s\n", lockfile.ErrorCodeGeneric, "Failed to write import map")
			doExit(1, flushChannel)
			return
		}

		manifestBuffer := buffer.Buffer{
			Bytes: bytebufferpool.Get(),
		}

		err = manifest.Encode(&manifestBuffer)

		if err != nil {
			cmd.Printf("<%d> [ERR]: %s\n", lockfile.ErrorCodeGeneric, "Encoding error")
			doExit(1, flushChannel)
			return
		}

		cmd.Printf("🔗 Saved import map to %s\n", outPathImport)

		err = os.WriteFile(outPathLock, manifestBuffer.Slice(), os.ModePerm)

		if err != nil {
			cmd.Printf("<%d> [ERR]: Failed to save to %s\n", lockfile.ErrorCodeGeneric, outPathLock)
			cmd.PrintErr(err)
			doExit(1, flushChannel)
			return
		} else {
			cmd.Printf("💾 Saved lockfile (%d deps, %d modules) to %s\n", manifest.Count, len(manifest.ExportsManifest.Source)+int(manifest.Count), outPathLock)
		}

		if err == nil {
			cmd.Printf("✅ Completed in %s", time.Since(start).Truncate(time.Microsecond))
		}

		if asJSON {
			json, err := jsoniter.ConfigCompatibleWithStandardLibrary.Marshal(manifest)
			if err != nil {
				cmd.Printf("<%d> [ERR]: %s\n", lockfile.ErrorCodeGeneric, "Failed to generate json")
			}
			os.WriteFile(outPathLock+".json", formatJSON(json), os.ModePerm)
		}

		doExit(0, flushChannel)
		return

	},
}

func doExit(exitCode int, flusher chan error) {
	if flusher == nil {
		os.Exit(exitCode)
	} else {
		<-flusher
		os.Exit(exitCode)
	}
}

func init() {
	rootCmd.AddCommand(clientCmd)

	// Here you will define your flags and configuration settings.

	// Cobra supports Persistent Flags which will work for this command
	// and all subcommands, e.g.:
	clientCmd.Flags().BoolP("json", "j", true, "Write json version of lockfile to disk")
	clientCmd.Flags().BoolP("write", "w", true, "Write binary version of lockfile to disk")
	clientCmd.Flags().StringP("package", "p", "./package.json", "Path to package.json file")
	clientCmd.Flags().StringP("to", "t", "https://ga.jspm.io/npm:", "If its a local file path, download & extract tarballs. If its a remote file path, use an import map.")
	clientCmd.Flags().String("registrar", lockfile.JSRegistrarFormatterStringSkypack, "Where to load the package.json files from? Can be \"npm\", \"skypack\", \"jspm\", or an absolute URL where the first %s is the package name and the second %s is the version.")

	// Cobra supports local flags which will only run when this command
	// is called directly, e.g.:
	// clientCmd.Flags().BoolP("toggle", "t", false, "Help message for toggle")
}
