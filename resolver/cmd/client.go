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
	"context"
	"fmt"
	"io/ioutil"
	"os"
	"path/filepath"
	"sync"
	"time"

	"github.com/cespare/xxhash"
	"github.com/jarred-sumner/devserverless/config"
	"github.com/jarred-sumner/devserverless/resolver/cache"
	"github.com/jarred-sumner/devserverless/resolver/internal/installer"
	"github.com/jarred-sumner/devserverless/resolver/internal/server"
	"github.com/jarred-sumner/devserverless/resolver/lockfile"
	"github.com/jarred-sumner/peechy/buffer"
	jsoniter "github.com/json-iterator/go"
	"github.com/spf13/cobra"
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
		start := time.Now()

		config.Global.NormalizePackageJSONPath()
		pkgJsonPath := config.Global.PackageJSONPath
		var err error

		err = config.Global.NormalizeRegistrar()
		if err != nil {
			cmd.PrintErr(err)
			doExit(1, nil)
			return
		}

		var skipResolve = false

		host := config.Global.Cache
		config.Global.LoadCacheType()

		cacheType := config.Global.From
		var pkgInstaller installer.PackageInstaller

		var flushChannel chan error

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
		var installWaitGroup *sync.WaitGroup

		var jsonText []byte

		jsonText, err = ioutil.ReadFile(pkgJsonPath)

		if err != nil {
			cmd.Println("An error occurred while reading " + pkgJsonPath)
			cmd.PrintErr(err)
			doExit(1, flushChannel)
		}

		file, err = lockfile.NewJavascriptPackageManifestPartial(&jsonText, config.BLACKLIST_PACKAGES, true)

		if err != nil {
			cmd.Println("An error occurred while parsing " + pkgJsonPath)
			cmd.PrintErr(err)
			doExit(1, flushChannel)
		}
		version = "1.0.0"
		name = file.Name

		packageHash := file.GeneratePackageHash()

		if !config.Global.Resolve {
			if _, err := os.Stat(config.Global.LockfilePath); os.IsNotExist(err) {
				skipResolve = false
			} else {
				var manifestB []byte

				manifestB, err = os.ReadFile(config.Global.LockfilePath)
				if err != nil {
					cmd.Println("Failed to read lockfile at " + config.Global.LockfilePath)
					cmd.PrintErr(err)
					doExit(1, flushChannel)
				}

				buf := buffer.Buffer{
					Bytes: &bytebufferpool.ByteBuffer{B: manifestB},
				}

				manifest, err = lockfile.DecodeJavascriptPackageManifest(&buf)

				if err != nil {
					cmd.Println("Lockfile at " + config.Global.LockfilePath + " is corrupt or uses an older version of ducky.")
					cmd.PrintErr(err)
					doExit(1, flushChannel)
				}

				if manifest.Hash != packageHash {
					cmd.Println("Dependencies changed. Resolving dependencies")
					skipResolve = false
				} else {
					skipResolve = true
				}
			}
		}

		ctx := cmd.Context()

		if config.Global.Install {
			installCtx, cancel := context.WithCancel(ctx)
			defer cancel()

			if installWaitGroup == nil {
				installWaitGroup = &sync.WaitGroup{}
			}
			var absDir string
			absDir = filepath.Join(config.Global.PackageJSONPath, "../")
			absDir, err = filepath.Abs(absDir)
			if err != nil {
				cmd.Println("Unable to access " + absDir)
				cmd.PrintErr(err)
				return
			}

			pkgInstaller, err = installer.NewPackageInstaller(absDir, host, &installCtx, installWaitGroup)

			if shoulClear, _ := cmd.Flags().GetBool("nuke"); shoulClear {
				os.RemoveAll(pkgInstaller.NodeModulesFolder)
				os.MkdirAll(pkgInstaller.NodeModulesFolder, 0700)
			}
		}

		if !skipResolve {

			switch cacheType {
			case config.CacheTypeRemote:
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
			case config.CacheTypeLocal:
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

					cmd.Printf("resolved dir in %s", time.Since(dur0).String())
					dur1 := time.Now()
					store, err := cache.NewLocalPackageManifestStore(filepath.Join(host, ".duckcache"))

					cmd.Printf("opened db in %s", time.Since(dur1).String())
					if err != nil {
						cmd.Printf("<%d> [ERR]: %s", lockfile.ErrorCodeGeneric, err.Error())
						os.Exit(1)
					}

					store.Store.RegistrarAPI = config.Global.Registrar
					if config.Global.Install {
						store.Store.Installer = installer.PackageInstallerBox{
							Installer: &pkgInstaller,
						}
					}

					manifest, err = store.Store.ResolveDependencies(&file, ctx)

					if err != nil {
						cmd.Printf("<%d> [ERR]: %s", lockfile.ErrorCodeGeneric, err.Error())
						os.Exit(1)
					}
					flushChannel = make(chan error)
					go store.Flush(flushChannel, true)
				}
			case config.CacheTypeNone:
				{
					store := cache.NewMemoryPackageManifestStore()
					store.RegistrarAPI = config.Global.Registrar
					if config.Global.Install {
						store.Installer = installer.PackageInstallerBox{
							Installer: &pkgInstaller,
						}
					}

					manifest, err = store.ResolveDependencies(&file, ctx)

					if err != nil {
						cmd.Printf("<%d> [ERR]: %s", lockfile.ErrorCodeGeneric, err.Error())
						doExit(1, nil)
						return
					}
				}
			}

			var importBuffer []byte

			importBuffer, err = lockfile.NewImportMap(&manifest, string(config.Global.ImportMapHost))

			if err != nil {
				cmd.Printf("<%d> [ERR]: %s\n", lockfile.ErrorCodeGeneric, "Failed to generate import map")
				doExit(1, flushChannel)
				return
			}

			err = os.WriteFile(config.Global.ImportMapPath, importBuffer, os.ModePerm)

			if err != nil {
				cmd.Printf("<%d> [ERR]: %s\n", lockfile.ErrorCodeGeneric, "Failed to write import map")
				doExit(1, flushChannel)
				return
			}

			manifest.Hash = packageHash
			manifestBuffer := buffer.Buffer{
				Bytes: bytebufferpool.Get(),
			}

			err = manifest.Encode(&manifestBuffer)
			defer bytebufferpool.Put(manifestBuffer.Bytes)

			if err != nil {
				cmd.Printf("<%d> [ERR]: %s\n", lockfile.ErrorCodeGeneric, "Encoding error")
				doExit(1, flushChannel)
				return
			}

			cmd.Printf("🔗 Saved import map to %s\n", config.Global.ImportMapPath)

			err = os.WriteFile(config.Global.LockfilePath, manifestBuffer.Slice(), os.ModePerm)

			if err != nil {
				cmd.Printf("<%d> [ERR]: Failed to save to %s\n", lockfile.ErrorCodeGeneric, config.Global.LockfilePath)
				cmd.PrintErr(err)
				doExit(1, flushChannel)
				return
			} else {
				cmd.Printf("💾 Saved lockfile (%d deps, %d modules) to %s\n", manifest.Count, len(manifest.ExportsManifest.Source)+int(manifest.Count), config.Global.LockfilePath)
			}

			if asJSON {
				json, err := jsoniter.ConfigCompatibleWithStandardLibrary.Marshal(manifest)
				if err != nil {
					cmd.Printf("<%d> [ERR]: %s\n", lockfile.ErrorCodeGeneric, "Failed to generate json")
				}
				os.WriteFile(config.Global.LockfilePath+".json", formatJSON(json), os.ModePerm)
			}
		} else if config.Global.Install {
			// list := make([]lockfile.PackageManifestCache)
		}

		if config.Global.Install {
			installWaitGroup.Wait()
		}

		if err == nil {
			cmd.Printf("✅ Completed in %s", time.Since(start).Truncate(time.Microsecond))
		}

		doExit(0, flushChannel)

	},
}

func doExit(exitCode int, flusher chan error) {
	if flusher == nil {
		// os.Exit(exitCode)
	} else {
		<-flusher
		// os.Exit(exitCode)
	}
}

func init() {
	rootCmd.AddCommand(clientCmd)

	// Here you will define your flags and configuration settings.

	// Cobra supports Persistent Flags which will work for this command
	// and all subcommands, e.g.:
	clientCmd.Flags().BoolP("json", "j", true, "Write json version of lockfile to disk")
	clientCmd.Flags().BoolP("write", "w", true, "Write binary version of lockfile to disk")
	clientCmd.Flags().BoolVarP(&config.Global.Install, "install", "i", true, "Allow installing")
	clientCmd.Flags().Bool("nuke", false, "Delete node_modules before installing")
	clientCmd.Flags().BoolVarP(&config.Global.Resolve, "resolve", "r", false, "Write binary version of lockfile to disk")
	clientCmd.Flags().StringVarP(&config.Global.PackageJSONPath, "package", "p", "./package.json", "Path to package.json file")
	clientCmd.TraverseChildren = true
	// Cobra supports local flags which will only run when this command
	// is called directly, e.g.:
	// clientCmd.Flags().BoolP("toggle", "t", false, "Help message for toggle")
}
