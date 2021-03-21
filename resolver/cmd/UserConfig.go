package cmd

import "github.com/jarred-sumner/devserverless/resolver/cache"

type UserConfig struct {
	Cache      string
	From       cache.CacheType
	ConfigFile string
	Registrar  string
	Port       uint
}
