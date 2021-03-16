package lockfile

import (
	"strings"

	semver "github.com/blang/semver/v4"
	jsoniter "github.com/json-iterator/go"
	"go.uber.org/zap"
)

var BlacklistedPackagePrefixes = [...]string{
	"@types/",
	"@babel/core",
	"@babel/plugin-",
	"@babel/preset-",
	"@babel/transform-",
	"webpack",
}

func NewJavascriptPackageManifestPartial(body *[]byte, enableBlacklist bool) (JavascriptPackageManifestPartial, error) {
	var file map[string]interface{}

	res := JavascriptPackageManifestPartial{
		Name: "",
		Version: Version{
			Major: 0,
			Minor: 0,
			Patch: 0,
			Range: VersionRangeNone,
			Build: "",
		},
		Provider: PackageProviderDisk,
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

	err = jsoniter.ConfigCompatibleWithStandardLibrary.Unmarshal(*body, &file)

	if err != nil {
		res.Status = PackageResolutionStatusCorruptPackage
		return res, err
	}

	if len(file["name"].(string)) == 0 {
		res.Status = PackageResolutionStatusMissingName
		return res, err
	}

	res.Name = NormalizePackageNameString(file["name"].(string))

	if len(file["version"].(string)) == 0 {
		res.Status = PackageResolutionStatusMissingVersion
		return res, err
	}

	res.SetVersion(file["version"].(string))
	if res.Status > PackageResolutionStatusSuccess {
		return res, err
	}

	// if file["exports"] != nil {
	// 	res.ExportsManifest
	// }

	if file["dependencies"] != nil {
		res.DependencyNames, res.DependencyVersions = getDependencies(file["dependencies"].(map[string]interface{}), enableBlacklist)
	}

	if file["devDependencies"] != nil {
		res.DevDependencyNames, res.DevDependencyVersions = getDependencies(file["devDependencies"].(map[string]interface{}), enableBlacklist)
	}

	if file["peerDependencies"] != nil {
		res.PeerDependencyNames, res.PeerDependencyVersions = getDependencies(file["peerDependencies"].(map[string]interface{}), enableBlacklist)
	}

	res.Status = PackageResolutionStatusSuccess

	return res, err
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
	return strings.ToLower(strings.Trim(version, " \n"))
}

func NormalizePackageNameString(version string) string {
	return strings.ToLower(strings.Trim(version, " \n"))
}

func IsPackageNameBlacklisted(name string) bool {
	for prefix := range BlacklistedPackagePrefixes {
		if strings.HasPrefix(name, BlacklistedPackagePrefixes[prefix]) {
			return true
		}
	}

	return false
}

func getDependencies(list map[string]interface{}, enableBlacklist bool) ([]string, []string) {
	keys := make([]string, len(list))
	values := make([]string, len(list))
	var i int
	i = 0

	var err error
	var tag semver.Version
	var normalizedVersion string

	if enableBlacklist {
		var normalizedName string

		for key, value := range list {
			normalizedName = NormalizePackageNameString(key)

			if IsPackageNameBlacklisted(normalizedName) {
				continue
			}

			keys[i] = normalizedName
			normalizedVersion = NormalizePackageVersionString(value.(string))

			if NewVersionRange(normalizedVersion) == VersionRangeNone {
				tag, err = semver.ParseTolerant(normalizedVersion)

				if err != nil {
					values[i] = tag.String()
				} else {
					values[i] = normalizedVersion
				}
			} else {
				values[i] = normalizedVersion
			}

			i++
		}
	} else {
		for key, value := range list {
			keys[i] = NormalizePackageNameString(key)
			normalizedVersion = NormalizePackageVersionString(value.(string))

			if NewVersionRange(normalizedVersion) == VersionRangeNone {
				tag, err = semver.ParseTolerant(normalizedVersion)

				if err != nil {
					values[i] = tag.String()
				} else {
					values[i] = normalizedVersion
				}
			} else {
				values[i] = normalizedVersion
			}

			i++
		}
	}

	return keys[0:i], values[0:i]
}

func NewVersionRange(input string) VersionRange {
	if strings.HasPrefix(input, "^") {
		return VersionRangeCaret
	} else if strings.HasPrefix(input, "~") {
		return VersionRangeTilda
	} else if strings.ContainsAny(input, "<>&|-+=/") {
		return VersionRangeComplex
	} else {
		return VersionRangeNone
	}
}

func (res *JavascriptPackageManifestPartial) FetchDependencies(logger *zap.Logger, enqueue func(name string, version string, logger *zap.Logger)) {
	var i int
	i = 0
	var n int
	var _name string
	var _version string

	if res.DependencyNames != nil && len(res.DependencyNames) > 0 {
		n = len(res.DependencyNames)
		i = 0
		for i < n {
			_name = res.DependencyNames[i]
			_version = res.DependencyVersions[i]

			enqueue(_name, _version, logger)
			i++
		}
	}

	if res.DevDependencyNames != nil && len(res.DevDependencyNames) > 0 {
		n = len(res.DevDependencyNames)
		i = 0
		for i < n {
			_name = res.DevDependencyNames[i]
			_version = res.DevDependencyNames[i]
			enqueue(_name, _version, logger)
			i++
		}
	}

	if res.PeerDependencyNames != nil && len(res.PeerDependencyVersions) > 0 {
		n = len(res.PeerDependencyNames)
		i = 0
		for i < n {
			_name = res.PeerDependencyNames[i]
			_version = res.PeerDependencyVersions[i]
			enqueue(_name, _version, logger)
			i++
		}
	}
}

func (p *JavascriptPackageManifestPartial) SetVersion(input string) {
	var normalizedVersion string
	normalizedVersion = NormalizePackageVersionString(input)

	p.Version.Range = NewVersionRange(normalizedVersion)

	normalizedVersion = p.Version.Range.Trim(normalizedVersion)

	tag, err := semver.ParseTolerant(NormalizePackageVersionString(normalizedVersion))
	if err != nil {
		p.Status = PackageResolutionStatusInvalidVersion
		return
	}

	p.Version.Major = int(tag.Major)
	p.Version.Minor = int(tag.Minor)
	p.Version.Patch = int(tag.Patch)
	if len(p.Version.Pre) > 0 {
		p.Version.Pre = tag.Pre[0].VersionStr
	}
	p.Version.Build = NormalizePackageVersionString(tag.String())
}

func (v *VersionRange) Trim(input string) string {
	switch *v {
	case VersionRangeNone:
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
