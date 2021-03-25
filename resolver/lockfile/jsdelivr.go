package lockfile

import (
	semver "github.com/Jarred-Sumner/semver/v4"
)

type JSDelivrPackageData struct {
	Tags     map[string]string `json:"tags"`
	Versions semver.Versions   `json:"versions"`
}

type RawJSDelivrPackageData struct {
	Tags     map[string]string `json:"tags"`
	Versions []string          `json:"versions"`
}

func (p *JSDelivrPackageData) Satisfying(version string) (string, error) {
	if version == "*" {
		version = "latest"
	}

	if len(p.Tags[version]) > 0 {
		version = p.Tags[version]
	}

	vr := NewVersionRange(version, len(version))
	var semverRange semver.Range
	var parsedVersion semver.Version
	var err error

	switch vr {
	case VersionRangeExact:
		{
			parsedVersion, err = semver.Parse(version)

			for i := p.Versions.Len() - 1; i > -1; i-- {
				if parsedVersion.Equals(p.Versions[i]) {
					return p.Versions[i].String(), err
				}
			}

		}
	default:
		{
			semverRange, err = semver.ParseRange(version)
		}
	}

	if err != nil {
		return version, err
	}

	if vr > VersionRangeExact && len(p.Versions) > 0 {
		// Iterate through backwards because we want to find the latest satisfying version
		for i := len(p.Versions) - 1; i > -1; i-- {
			if semverRange(p.Versions[i]) {
				return p.Versions[i].String(), err
			}
		}
	}

	return version, err
}

var JSDelivrMetadataFormatterString = "https://data.jsdelivr.com/v1/package/npm/%s"
