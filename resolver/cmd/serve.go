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
	"log"

	"github.com/jarred-sumner/devserverless/resolver"
	"github.com/jarred-sumner/devserverless/resolver/cache"
	"github.com/jarred-sumner/devserverless/resolver/internal/server"
	"github.com/jarred-sumner/devserverless/resolver/lockfile"
	"github.com/spf13/cobra"
)

// serveCmd represents the serve command
var serveCmd = &cobra.Command{
	Use:   "serve",
	Short: "A brief description of your command",
	Long: `A longer description that spans multiple lines and likely contains examples
and usage of using your command. For example:

Cobra is a CLI library for Go that empowers applications.
This application is a tool to generate the needed files
to quickly create a Cobra application.`,
	Run: func(cmd *cobra.Command, args []string) {
		fmt.Println("serve called")
		port, _ := cmd.Flags().GetUint("port")
		resolver.LogV("Started server on port http://localhost:%d", port)
		registrar, err := NormalizeRegistrar(cmd)

		if err != nil {
			cmd.PrintErr(err)
			return
		}

		cachePath, err := cmd.PersistentFlags().GetString("cache")

		if err != nil {
			cmd.PrintErr(err)
			return
		}

		cacheType := NormalizeCacheType(cachePath)

		switch cacheType {
		case cache.CacheTypeLocal:
			{
				store, err := cache.NewLocalPackageManifestStore(cachePath)
				store.Store.RegistrarAPI = registrar
				if err != nil {
					log.Fatal(err)
					return
				}
				if err := server.StartServer(port, store.Store, nil); err != nil {
					log.Fatalf("Error in ListenAndServe: %s", err)
				}
			}
		case cache.CacheTypeNone:
			{
				store := cache.NewMemoryPackageManifestStore()
				store.RegistrarAPI = registrar
				if err := server.StartServer(port, &store, nil); err != nil {
					log.Fatalf("Error in ListenAndServe: %s", err)
				}
			}
		default:
			{
				log.Fatalf("Unsupported cache  %s", cachePath)
			}
		}

	},
}

func init() {
	rootCmd.AddCommand(serveCmd)

	serveCmd.Flags().String("registrar", lockfile.JSRegistrarFormatterStringJSPM, "Where to load the package.json files from? Can be \"npm\", \"skypack\", \"jspm\", or an absolute URL where the first %s is the package name and the second %s is the version.")

	// Here you will define your flags and configuration settings.

	// Cobra supports Persistent Flags which will work for this command
	// and all subcommands, e.g.:
	serveCmd.Flags().Uint("port", 8087, "A help for foo")

	// Cobra supports local flags which will only run when this command
	// is called directly, e.g.:

}
