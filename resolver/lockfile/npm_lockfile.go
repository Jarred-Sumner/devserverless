package lockfile

import (
	"io/ioutil"
	"os"
	"sort"
	"strings"

	jsoniter "github.com/json-iterator/go"
)

type NPMLockfile struct {
	Name            string                   `json:"name"`
	Version         string                   `json:"version"`
	LockfileVersion int                      `json:"lockfileVersion"`
	Requires        bool                     `json:"requires"`
	Packages        map[string]NPMPackage    `json:"packages"`
	Dependencies    map[string]NPMDependency `json:"dependencies"`
}

type NPMPackage struct {
	Version          string            `json:"version"`
	Resolved         string            `json:"resolved"`
	Integrity        string            `json:"integrity"`
	Dependencies     map[string]string `json:"dependencies"`
	PeerDependencies map[string]string `json:"peerDependencies"`
}

func (p *NPMLockfile) FindParents(name string, dep *NPMDependency) []string {
	deps := make([]string, 0, 4)

	for key, value := range p.Dependencies {
		if _, exists := value.Requires[name]; exists {
			deps = append(deps, value.String(key))
		}
	}

	return deps
}

type NPMDependency struct {
	Version   string            `json:"version"`
	Resolved  string            `json:"resolved"`
	Integrity string            `json:"integrity"`
	Requires  map[string]string `json:"requires"`
}

func (p *NPMDependency) String(name string) string {
	return name + "@" + p.Version
}

func NewNPMLockfile(json []byte) (*NPMLockfile, error) {
	res := NPMLockfile{}
	err := jsoniter.ConfigCompatibleWithStandardLibrary.Unmarshal(json, &res)

	return &res, err
}

type DiffedPackage struct {
	SourceName    string `json:"sourceName"`
	SourceVersion string `json:"sourceVersion"`

	TargetName    string `json:"targetName"`
	TargetVersion string `json:"targetVersion"`

	Parents []string `json:"parents"`
}

func (d *DiffedPackage) String() string {
	var src string
	var tgt string

	if d.SourceName != "" {
		src = "+		" + d.SourceName + "@" + d.SourceVersion
	}

	if d.TargetName != "" {
		src = "-		" + d.TargetName + "@" + d.TargetVersion
	}

	var res string
	if src != "" && tgt != "" {
		res = src + "\n" + tgt
	} else {

		res = src + tgt
	}

	parents := "   ->  {" + strings.Join(d.Parents, " ") + "}"
	if len(d.Parents) == 0 {
		parents = ""
	}

	return res + parents

}

type PackageDiff struct {
	Added   []DiffedPackage `json:"added"`
	Changed []DiffedPackage `json:"changed"`
	Missing []DiffedPackage `json:"missing"`
}

func (p *PackageDiff) String() string {

	added := make([]string, 0, len(p.Added))
	changed := make([]string, 0, len(p.Changed))
	missing := make([]string, 0, len(p.Missing))

	for _, a := range p.Added {
		added = append(added, a.String())
	}
	sort.Strings(added)

	for _, a := range p.Changed {
		changed = append(changed, a.String())
	}
	sort.Strings(changed)
	for _, a := range p.Missing {
		missing = append(missing, a.String())
	}
	sort.Strings(missing)

	return "### Missing\n" + strings.Join(missing, "\n") + "\n\n\n" + "### Added\n" + strings.Join(added, "\n") + "\n\n\n" + "### Changed\n" + strings.Join(changed, "\n")
}

func indexof(list []string, val string) int {
	for i, v := range list {
		if strings.EqualFold(v, val) {
			return i
		}
	}

	return -1
}

func (l *NPMLockfile) Diff(manifest *JavascriptPackageManifest) PackageDiff {
	diff := PackageDiff{
		Missing: make([]DiffedPackage, 0, 100),
		Changed: make([]DiffedPackage, 0, 100),
		Added:   make([]DiffedPackage, 0, 100),
	}

	for index, key := range manifest.Name {
		_, exists := l.Dependencies[key]
		version := manifest.Version[index]
		if !exists {
			diff.Missing = append(diff.Missing, DiffedPackage{
				SourceName:    "",
				SourceVersion: "",
				TargetName:    key,
				TargetVersion: version,
			})

		}
	}

	for key, value := range l.Dependencies {

		otherI := indexof(manifest.Name, key)
		if otherI == -1 {
			diff.Added = append(diff.Added, DiffedPackage{
				SourceName:    key,
				SourceVersion: value.Version,
				TargetName:    "",
				TargetVersion: "",
				Parents:       l.FindParents(key, &value),
			})
		} else if manifest.Version[otherI] != value.Version {
			diff.Changed = append(diff.Changed, DiffedPackage{
				SourceName:    key,
				SourceVersion: value.Version,
				TargetName:    key,
				TargetVersion: manifest.Version[otherI],
			})
		}
	}

	return diff
}

func WriteNPMDiff(sourcePath string, manifest *JavascriptPackageManifest, destination string) error {
	json, err := os.ReadFile(sourcePath)
	if err != nil {
		return err
	}
	var npm *NPMLockfile
	npm, err = NewNPMLockfile(json)

	if err != nil {
		return err
	}

	diff := npm.Diff(manifest)

	return ioutil.WriteFile(destination, []byte(diff.String()), 0777)
}
