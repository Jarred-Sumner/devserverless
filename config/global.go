//go:generate go-enum -f=$GOFILE --marshal

package config

import (
	"errors"
	"fmt"
	"path/filepath"
	"strings"
)

/*ENUM(
	None = 0
	Remote
	Local
)
*/
type CacheType int

type UserConfig struct {
	Cache           string
	From            CacheType
	ConfigFile      string
	Registrar       RegistrarString
	Port            uint
	ImportMapHost   RegistrarString
	PackageJSONPath string
	Resolve         bool
	Install         bool
	LockfilePath    string
	ImportMapPath   string
}

func (c *UserConfig) NormalizePackageJSONPath() {
	c.PackageJSONPath = filepath.Clean(c.PackageJSONPath)
	c.LockfilePath = filepath.Join(c.PackageJSONPath, "../", "package-browser.lock")
	c.ImportMapPath = filepath.Join(c.PackageJSONPath, "../", "package.importmap")
}

type RegistrarString string

const JSRegistrarFormatterStringJSPM = RegistrarString("https://ga.jspm.io/npm:%s@%s/package.json")
const JSRegistrarFormatterStringNPM = RegistrarString("https://registry.npmjs.org/%s/%s")
const JSRegistrarFormatterStringSkypack = RegistrarString("https://cdn.skypack.dev/%s@%s/package.json")

func (r RegistrarString) PackageJSON(name string, version string) string {
	return fmt.Sprintf(string(r), name, version)
}

func (c *UserConfig) NormalizeRegistrar() error {
	registrar := string(c.Registrar)

	if registrar == "npm" || c.Registrar == JSRegistrarFormatterStringNPM {
		c.Registrar = JSRegistrarFormatterStringNPM
	} else if registrar == "skypack" || c.Registrar == JSRegistrarFormatterStringSkypack {
		c.Registrar = JSRegistrarFormatterStringSkypack
	} else if registrar == "jspm" || c.Registrar == JSRegistrarFormatterStringJSPM {
		c.Registrar = JSRegistrarFormatterStringJSPM
	} else if strings.HasPrefix(registrar, "https://") || strings.HasPrefix(registrar, "http://") {

		if strings.Count(registrar, "%s") != 2 {
			registrar += "%s/%s"
		}

		c.Registrar = RegistrarString(registrar)
	} else {
		return errors.New("Expected registrar to be a url starting with https://, http://, or \"npm\", \"jspm\" or \"skypack\"")
	}

	return nil
}

func (c *UserConfig) LoadCacheType() {
	if strings.HasPrefix(c.Cache, "http://") || strings.HasPrefix(c.Cache, "https://") {
		c.From = CacheTypeRemote
	} else if c.Cache == "none" || c.Cache == "" || c.Cache == "disable" {
		c.From = CacheTypeNone
	} else {
		c.From = CacheTypeLocal
	}
}

var Global UserConfig

type Stopper interface {
	Stop()
}

var Profiler Stopper
