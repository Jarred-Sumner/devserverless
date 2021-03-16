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
	"encoding/json"
	"io/ioutil"
	"path"

	"github.com/jarred-sumner/devserverless/resolver/lockfile"
	"github.com/spf13/cobra"
)

// jsonCmd represents the json command
var jsonCmd = &cobra.Command{
	Use:   "json",
	Short: "A brief description of your command",
	Long: `A longer description that spans multiple lines and likely contains examples
and usage of using your command. For example:

Cobra is a CLI library for Go that empowers applications.
This application is a tool to generate the needed files
to quickly create a Cobra application.`,
	Run: func(cmd *cobra.Command, args []string) {
		var pkgJsonPath string = "./package.json"
		if len(args) > 0 {
			pkgJsonPath = args[0]
		}
		pkgJsonPath = path.Clean(pkgJsonPath)
		var err error

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

		if shouldPrint, _ := cmd.Flags().GetBool("print-request"); shouldPrint {
			reqString, err := json.Marshal(&file)
			cmd.Printf(string(reqString))

			if err != nil {
				cmd.Println("An error occurred while parsing " + pkgJsonPath)
				cmd.PrintErr(err)
			}
		}

		store := lockfile.NewMemoryPackageManifestStore()
		deps, err := store.ResolveDependencies(&file, cmd.Context())

		if err != nil {
			cmd.Println("An error occurred while resolving " + pkgJsonPath)
			cmd.PrintErr(err)
			return
		}

		reqString, err := json.Marshal(&deps)

		if err != nil {
			cmd.Println("An error occurred while stringifying " + pkgJsonPath)
			cmd.PrintErr(err)
			return
		}

		cmd.Printf(string(reqString))

	},
}

func init() {
	rootCmd.AddCommand(jsonCmd)
	jsonCmd.Flags().Bool("print-request", false, "print a json version of the encoded & unresolved package.json file")

	// Here you will define your flags and configuration settings.

	// Cobra supports Persistent Flags which will work for this command
	// and all subcommands, e.g.:
	// jsonCmd.PersistentFlags().String("foo", "", "A help for foo")

	// Cobra supports local flags which will only run when this command
	// is called directly, e.g.:
	// jsonCmd.Flags().BoolP("toggle", "t", false, "Help message for toggle")
}
