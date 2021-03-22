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
	"os"
	"path/filepath"

	"github.com/jarred-sumner/devserverless/config"
	"github.com/pkg/profile"
	"github.com/spf13/cobra"

	homedir "github.com/mitchellh/go-homedir"
	"github.com/spf13/viper"
)

// rootCmd represents the base command when called without any subcommands
var rootCmd = &cobra.Command{
	Use:   "duck",
	Short: "A brief description of your application",
	Long: `A longer description that spans multiple lines and likely contains
examples and usage of using your application. For example:

Cobra is a CLI library for Go that empowers applications.
This application is a tool to generate the needed files
to quickly create a Cobra application.`,
	// Uncomment the following line if your bare application
	// has an action associated with it:
	// Run: func(cmd *cobra.Command, args []string) { },
}

// Execute adds all child commands to the root command and sets flags appropriately.
// This is called by main.main(). It only needs to happen once to the rootCmd.
func Execute() {
	cobra.CheckErr(rootCmd.Execute())
}

func init() {
	cobra.OnInitialize(initConfig)

	// Here you will define your flags and configuration settings.
	// Cobra supports persistent flags, which, if defined here,
	// will be global for your application.

	rootCmd.PersistentFlags().StringVar(&config.Global.ConfigFile, "config", "", "config file (default is $HOME/.duckenv)")
	rootCmd.PersistentFlags().StringVarP(&config.Global.Cache, "cache", "c", filepath.Join(os.Getenv("HOME"), ".duck"), "Absolute directory or \"none\"")
	rootCmd.PersistentFlags().StringVarP((*string)(&config.Global.ImportMapHost), "to", "t", string(config.JSRegistrarFormatterStringNPM), "If its a local file path, download & extract tarballs. If its a remote file path, use an import map.")
	rootCmd.PersistentFlags().StringVar((*string)(&config.Global.Registrar), "registrar", string(config.JSRegistrarFormatterStringNPM), "Where to load the package.json files from? Can be \"npm\", \"skypack\", \"jspm\", or an absolute URL where the first %s is the package name and the second %s is the version.")
	rootCmd.PersistentFlags().String("profile", "none", "run with profiling enabled (memory, cpu, trace, goroutine, mutex, block or thread)")

	viper.BindPFlag("cache", rootCmd.Flags().Lookup("cache"))
	viper.BindPFlag("to", rootCmd.Flags().Lookup("to"))
	viper.BindPFlag("registrar", rootCmd.Flags().Lookup("registrar"))
	viper.BindEnv("cache", "DUCK_CACHE")
	viper.BindEnv("registrar", "NPM_PACKAGE_REGISTRAR")
	// rootCmd.TraverseChildren = true

}

// initConfig reads in config file and ENV variables if set.
func initConfig() {
	if config.Global.ConfigFile != "" {
		// Use config file from the flag.
		viper.SetConfigFile(config.Global.ConfigFile)
	} else {
		// Find home directory.
		home, err := homedir.Dir()
		cobra.CheckErr(err)

		pwd, err := os.Getwd()
		cobra.CheckErr(err)

		viper.AddConfigPath(pwd)
		// Search config in home directory with name ".reoslver" (without extension).
		viper.AddConfigPath(home)
		viper.SetConfigName(".duckenv")
	}

	viper.AutomaticEnv() // read in environment variables that match

	// If a config file is found, read it in.
	if err := viper.ReadInConfig(); err == nil {
		fmt.Fprintln(os.Stderr, "Using config file:", viper.ConfigFileUsed())
	}

	if profileType, _ := rootCmd.Flags().GetString("profile"); profileType != "" && profileType != "none" {
		switch profileType {
		case "memory":
			{
				config.Profiler = profile.Start(profile.MemProfile, profile.ProfilePath("."), profile.NoShutdownHook)
			}
		case "cpu":
			{
				config.Profiler = profile.Start(profile.CPUProfile, profile.ProfilePath("."), profile.NoShutdownHook)
			}
		case "trace":
			{
				config.Profiler = profile.Start(profile.TraceProfile, profile.ProfilePath("."), profile.NoShutdownHook)
			}
		case "goroutine":
			{
				config.Profiler = profile.Start(profile.GoroutineProfile, profile.ProfilePath("."), profile.NoShutdownHook)
			}
		case "mutex":
			{
				config.Profiler = profile.Start(profile.MutexProfile, profile.ProfilePath("."), profile.NoShutdownHook)
			}
		case "thread":
			{
				config.Profiler = profile.Start(profile.ThreadcreationProfile, profile.ProfilePath("."), profile.NoShutdownHook)
			}
		case "block":
			{
				config.Profiler = profile.Start(profile.BlockProfile, profile.ProfilePath("."), profile.NoShutdownHook)
			}
		default:
			{
				fmt.Printf("Invalid profile %s", profileType)
				os.Exit(1)
			}
		}

	}
}
