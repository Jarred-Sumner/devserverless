package lockfile

import (
	"fmt"
	"os"
	"sort"
	"strconv"
	"strings"

	"github.com/cespare/xxhash"
	"github.com/jarred-sumner/devserverless/config"
	"github.com/jarred-sumner/peechy/buffer"
	jsoniter "github.com/json-iterator/go"
	"github.com/valyala/bytebufferpool"
)

var BlacklistedPackagePrefixes = [...]string{
	"@types/",
	"@babel/core",
	"@babel/plugin-",
	"@babel/preset-",
	"@babel/transform-",
	"@jest/",
	"jest",
	"webpack",
	"@typescript",
	"typescript",
	"babel-plugin-",
	"rollup",
	"@rollup",
	"eslint",
	"babel-preset",
	"babel-loader",
	"webpack-plugin",
}

// ASCII 15
const BareIdentityToken = ""

// ASCII 16
const BareIndexToken = ""

func LoadPackageManifestFromFilepath(input string) (*JavascriptPackageManifest, error) {
	manifestB, err := os.ReadFile(input)
	if err != nil {
		return nil, err
	}
	buf := buffer.Buffer{
		Bytes: &bytebufferpool.ByteBuffer{B: manifestB},
	}
	manifest, _ := DecodeJavascriptPackageManifest(&buf)
	return &manifest, err
}

func NewJavascriptPackageManifestPartialFromNameVersion(name string, version string, enableBlacklist bool) JavascriptPackageManifestPartial {
	return JavascriptPackageManifestPartial{
		Name:               "temp",
		Provider:           PackageProviderDisk,
		Status:             PackageResolutionStatusSuccess,
		DependencyNames:    []string{name},
		DependencyVersions: []string{version},
		// ExportsManifest: ExportsManifest{
		// 	Source:      []string{},
		// 	Destination: []string{},
		// 	ExportType:  []ExportsType{},
		// },
		// DependencyNames:        []string{},
		// DependencyVersions:     []string{},
		// PeerDependencyNames:    []string{},
		// PeerDependencyVersions: []string{},
		// DevDependencyNames:     []string{},
		// DevDependencyVersions:  []string{},
	}

}

func NewJavascriptPackageManifestPartial(body *[]byte, enableBlacklist bool, enableScripts bool) (JavascriptPackageManifestPartial, error) {

	res := JavascriptPackageManifestPartial{
		Name:     "",
		Provider: PackageProviderNpm,
		Status:   PackageResolutionStatusSuccess,
		// ExportsManifest: ExportsManifest{
		// 	Source:      []string{},
		// 	Destination: []string{},
		// 	ExportType:  []ExportsType{},
		// },
		// DependencyNames:        []string{},
		// DependencyVersions:     []string{},
		// PeerDependencyNames:    []string{},
		// PeerDependencyVersions: []string{},
		// DevDependencyNames:     []string{},
		// DevDependencyVersions:  []string{},
	}
	var err error
	iter := jsoniter.ConfigFastest.BorrowIterator(*body)
	var objectKey string
	// var objectType
	defer jsoniter.ConfigFastest.ReturnIterator(iter)
	var depsMap map[string]string
	depsMap = make(map[string]string)
	var bareImports = make(map[BareField]string, 2)

	for {
		objectKey = iter.ReadObject()

		if objectKey == "" {
			break
		}

		switch objectKey {
		case "name":
			{

				res.Name = NormalizePackageNameString(iter.ReadString())
			}

		case "browser":
			{
				value := stringValueFromExport(iter.ReadAny())
				if len(value) > 0 {
					bareImports[BareFieldBrowserField] = value
				}
			}

		case "module":
			{
				value := stringValueFromExport(iter.ReadAny())
				if len(value) > 0 {
					bareImports[BareFieldModuleField] = value
				}
			}

		case "exports":
			{
				obj := iter.ReadAny()
				size := obj.Size()
				res.ExportsManifest.Destination = make([]string, 0, size)
				res.ExportsManifest.Source = make([]string, 0, size)
				keys := obj.Keys()
				for _, key := range keys {

					if (config.DISABLE_CJS && strings.HasSuffix(key, "!cjs")) || strings.Contains(key, "/package.json") {
						continue
					}

					child := obj.Get(key)
					value := stringValueFromExport(child)

					if len(value) > 0 {

						if key == "." || key == "./" {
							bareImports[BareFieldExportsField] = value
						} else {
							key = strings.TrimLeft(key, "./")
							value = strings.TrimLeft(value, "./")

							res.ExportsManifest.Source = append(res.ExportsManifest.Source, key)
							if value == key {
								res.ExportsManifest.Destination = append(res.ExportsManifest.Destination, BareIdentityToken)
							} else {
								res.ExportsManifest.Destination = append(res.ExportsManifest.Destination, value)
							}
						}
					}
				}
			}
		case "main":
			{
				value := stringValueFromExport(iter.ReadAny())
				if len(value) > 0 {
					bareImports[BareFieldMainField] = value
				}
			}

		case "version":
			{
				res.SetVersion(iter.ReadString())
			}

		case "dependencies":
			{
				for k := range depsMap {
					delete(depsMap, k)
				}
				iter.ReadMapCB(func(iterator *jsoniter.Iterator, key string) bool {
					depsMap[key] = iter.ReadString()
					return true
				})

				if len(depsMap) > 0 {
					res.DependencyNames, res.DependencyVersions = res.processDependencyList(depsMap)
				}
			}

		case "devDependencies":
			{
				for k := range depsMap {
					delete(depsMap, k)
				}
				iter.ReadMapCB(func(iterator *jsoniter.Iterator, key string) bool {
					depsMap[key] = iter.ReadString()
					return true
				})

				if len(depsMap) > 0 {
					res.DevDependencyNames, res.DevDependencyVersions = res.processDependencyList(depsMap)
				}
			}

		case "peerDependencies":
			{
				for k := range depsMap {
					delete(depsMap, k)
				}
				iter.ReadMapCB(func(iterator *jsoniter.Iterator, key string) bool {
					depsMap[key] = iter.ReadString()
					return true
				})

				if len(depsMap) > 0 {
					res.PeerDependencyNames, res.PeerDependencyVersions = res.processDependencyList(depsMap)
				}

			}
		case "scripts":
			{
				if enableScripts {
					res.ScriptKeys = make([]string, 0, 3)
					res.ScriptValues = make([]string, 0, 3)
					res.HasPostInstall = false

					iter.ReadMapCB(func(iterator *jsoniter.Iterator, key string) bool {
						res.ScriptKeys = append(res.ScriptKeys, key)
						res.ScriptValues = append(res.ScriptValues, iter.ReadString())
						if key == "postinstall" {
							res.HasPostInstall = true
						}
						return true
					})
				} else {
					iter.Skip()
				}
			}

		case "bin":
			{
				res.BinKeys = make([]string, 0, 1)
				res.BinValues = make([]string, 0, 1)

				iter.ReadMapCB(func(iterator *jsoniter.Iterator, key string) bool {
					res.BinKeys = append(res.BinKeys, key)
					res.BinValues = append(res.BinValues, iter.ReadString())
					return true
				})
			}
		default:
			{
				iter.Skip()
			}

		}

		// switch objectKey {
		// }

	}

	if len(res.Name) == 0 {
		res.Status = PackageResolutionStatusMissingName
		return res, err
	}

	var specifier string
	var ok bool

	for {
		specifier, ok = bareImports[BareFieldBrowserField]
		if ok {
			res.ExportsManifest.Bare = specifier
			res.ExportsManifest.BareField = BareFieldBrowserField
			break
		}

		specifier, ok = bareImports[BareFieldExportsField]
		if ok {
			res.ExportsManifest.Bare = specifier
			res.ExportsManifest.BareField = BareFieldExportsField
			break
		}

		specifier, ok = bareImports[BareFieldModuleField]
		if ok {
			res.ExportsManifest.Bare = specifier
			res.ExportsManifest.BareField = BareFieldModuleField
			break
		}

		specifier, ok = bareImports[BareFieldJsdelivrField]
		if ok {
			res.ExportsManifest.Bare = specifier
			res.ExportsManifest.BareField = BareFieldJsdelivrField
			break
		}

		specifier, ok = bareImports[BareFieldMainField]
		if ok {
			res.ExportsManifest.Bare = specifier
			res.ExportsManifest.BareField = BareFieldMainField
			break
		}

		res.ExportsManifest.Bare = BareIndexToken
		res.ExportsManifest.BareField = BareFieldGuessedField

		break
	}

	res.ExportsManifest.Bare = strings.TrimLeft(res.ExportsManifest.Bare, "./")
	if res.ExportsManifest.Bare == "index.js" {
		res.ExportsManifest.Bare = BareIndexToken
	}

	res.Status = PackageResolutionStatusSuccess

	return res, err
}

func stringValueFromExport(obj jsoniter.Any) string {
	if obj.ValueType() == jsoniter.ObjectValue {
		if obj.Get("import").Size() > 0 {
			return obj.Get("import").ToString()
		} else if obj.Get("default").Size() > 0 {
			return obj.Get("default").ToString()
		}
	} else if obj.ValueType() == jsoniter.StringValue {
		return obj.ToString()
	}

	return ""
}

func (p *JavascriptPackageManifestPartial) processDependencyList(list map[string]string) ([]string, []string) {
	keys := make([]string, 0, len(list))
	values := make([]string, 0, len(list))

	if config.BLACKLIST_PACKAGES {
		var normalizedName string

		for key, value := range list {
			normalizedName = NormalizePackageNameString(key)

			if IsPackageNameBlacklisted(normalizedName) {
				continue
			}

			keys = append(keys, normalizedName)
			values = append(values, value)

		}
	} else {
		for key, value := range list {
			normalizedName := NormalizePackageNameString(key)

			keys = append(keys, normalizedName)
			values = append(values, value)
		}
	}

	return keys, values
}

func NewJavascriptPackageManifestWithError(name string, version string, status PackageResolutionStatus) JavascriptPackageManifestPartial {
	p := JavascriptPackageManifestPartial{
		Name:   name,
		Status: status,
	}
	p.SetVersion(version)
	return p
}

func NormalizePackageVersionString(version string) string {
	return strings.ToLower(strings.TrimLeft(strings.Trim(version, " \n"), "v"))

}

func NormalizePackageNameString(version string) string {
	return strings.ToLower(strings.Trim(version, " \n"))
}

func IsPackageNameBlacklisted(name string) bool {
	if name == "typescript" {
		return true
	}

	for prefix := range BlacklistedPackagePrefixes {
		if strings.HasPrefix(name, BlacklistedPackagePrefixes[prefix]) {
			return true
		}
	}

	return false
}

func (p *JavascriptPackageManifestPartial) SetVersion(input string) {
	NewVersion(input, p)
}

func (v *VersionRange) Trim(input string) string {
	switch *v {
	case VersionRangeExact:
		{
			return input
		}
	case VersionRangeCaret:
		{
			return strings.Trim(input, "^")
		}
	case VersionRangeTilda:
		{
			return strings.Trim(input, "~")
		}
	default:
		{
			return input
		}
	}

}

func (p *JavascriptPackageManifestPartial) GeneratePackageHash() string {
	allKeys := make([]string, 0, len(p.DependencyNames)+len(p.DevDependencyNames)+len(p.PeerDependencyNames))

	for i, dep := range p.DependencyNames {
		allKeys = append(allKeys, NewPackageManifestKey(dep, p.DependencyVersions[i]))
	}

	for i, dep := range p.DevDependencyNames {
		allKeys = append(allKeys, NewPackageManifestKey(dep, p.DevDependencyVersions[i]))
	}

	for i, dep := range p.PeerDependencyNames {
		allKeys = append(allKeys, NewPackageManifestKey(dep, p.PeerDependencyVersions[i]))
	}

	sort.Strings(allKeys)

	return strconv.FormatUint(xxhash.Sum64String(strings.Join(allKeys, ",")), 16)
}

func (p PackageProvider) ToArchiveURL(name string, version string) string {
	switch p {
	case PackageProviderNpm:
		{
			return fmt.Sprintf("https://registry.npmjs.org/%s/-/%s-%s.tgz", name, name, version)
		}
	}

	return ""
}
