package lockfile

import (
	"github.com/jarred-sumner/devserverless/resolver/node_semver"
)

type JSDelivrPackageData struct {
	Tags     map[string]string    `json:"tags"`
	Versions node_semver.Versions `json:"versions"`
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

	tokenized := node_semver.Tokenize(version)

	if len(p.Versions) > 0 {

		switch tokenized.Value {
		case node_semver.TokenizeResultValueVersion:
			{
				version := tokenized.Version

				for i := range p.Versions {
					if p.Versions[i].EQ(*version) {
						return p.Versions[i].String(), nil
					}
				}
			}
		case node_semver.TokenizeResultValueRange:
			{
				for i := range p.Versions {
					if tokenized.Range(p.Versions[i]) {
						return p.Versions[i].String(), nil
					}
				}
			}
		}
	}

	return "latest", nil
}

var JSDelivrMetadataFormatterString = "https://data.jsdelivr.com/v1/package/npm/%s"
