package lockfile

import (
	"fmt"
	"path"

	jsoniter "github.com/json-iterator/go"
)

type ScopesMap = map[string]map[string]string

type ImportMap struct {
	Imports map[string]string `json:"imports"`
	Scopes  ScopesMap         `json:"scopes"`
}

func normalizeName(name string, source string) string {
	if name == BareIdentityToken {
		return "/" + path.Clean(source)
	} else if name == BareIndexToken {
		return "/index.js"
	} else {
		return "/" + path.Clean(name)
	}
}

func NewImportMap(manifest *JavascriptPackageManifest, hostBaseURL string) ([]byte, error) {
	importMap := ImportMap{
		Imports: make(map[string]string, manifest.Count*2),
		Scopes:  make(ScopesMap, manifest.Count*2),
	}

	i := uint(0)

	for i < manifest.Count {
		importMap.Imports[manifest.Name[i]] = fmt.Sprintf("%s%s@%s%s", hostBaseURL, manifest.Name[i], manifest.Version[i], normalizeName(manifest.ExportsManifest.Bare[i], manifest.ExportsManifest.Bare[i]))
		baseURL := fmt.Sprintf("%s%s@%s/", hostBaseURL, manifest.Name[i], manifest.Version[i])
		importMap.Imports[manifest.Name[i]+"/"] = baseURL

		i++
	}

	return jsoniter.Marshal(importMap)

}
