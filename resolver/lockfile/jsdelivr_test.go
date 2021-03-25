package lockfile_test

import (
	"path/filepath"
	"testing"

	"github.com/jarred-sumner/devserverless/resolver/cache"
	"github.com/jarred-sumner/devserverless/resolver/lockfile"
	"github.com/stretchr/testify/assert"
)

func WriteDiff(t *testing.T) {

	source, e := filepath.Abs("../../fixtures/pkgjson-small/package-browser.lock")
	if e != nil {
		t.Fatal(e)
	}
	npm, e := filepath.Abs("../../fixtures/pkgjson-small/package-lock.json")
	if e != nil {
		t.Fatal(e)
	}

	dest, e := filepath.Abs("../../fixtures/pkgjson-small/lock-diff.md.patch")
	if e != nil {
		t.Fatal(e)
	}

	manifest, err := lockfile.LoadPackageManifestFromFilepath(source)
	if err != nil {
		t.Fatal(err)
	}
	err = lockfile.WriteNPMDiff(npm, manifest, dest)
	if err != nil {
		t.Fatal(err)
	}
}

func TestGetDiff(t *testing.T) {
	WriteDiff(t)
}

var rollup = "^1.20.0||^2.0.0"

func TestSatisfying(t *testing.T) {
	var store lockfile.PackageManifestStore
	store = cache.NewMemoryPackageManifes\tStore()

	assertRange(t, rollup, lockfile.VersionRangeRange)
	assertResolves(t, &store, "rollup", rollup, "2.42.2")

	res := TRICKY_VERSIONS[0]
	name := res[0]

	assertRange(t, "^1.1.2", lockfile.VersionRangeRange)
	assertResolves(t, &store, name, res[1], "1.1.2")

	assertRange(t, "1", lockfile.VersionRangeWildcard)
	assertResolves(t, &store, "abbrev", "1", "1.1.1")
}

func assertRange(t *testing.T, version string, r lockfile.VersionRange) {
	assert.Equal(t, lockfile.NewVersionRange(version, len(version)), r)
}

func assertResolves(t *testing.T, store *lockfile.PackageManifestStore, name string, version string, to string) {

	metadata, _ := store.FetchPackageMetadata(name, "")
	resolved, err := metadata.Satisfying(version)
	assert.Nil(t, err)
	assert.Equal(t, to, resolved)
}

func TestNewVersionRange(t *testing.T) {
	for _, tilda := range TILDA_VERSIONS {
		assert.Equal(t, lockfile.NewVersionRange(tilda, len(tilda)), lockfile.VersionRangeRange)
	}

}

var extraTricky = [...][2]string{
	{
		"webpack",
		"2 || 3 || 4",
	},
	{
		"webpack-dev-server",
		"3.x",
	},
}

var TRICKY_VERSIONS = [...][2]string{

	{
		"vary",
		"~1.1.2",
	},
	{
		"compressible",
		"~2.0.16",
	},
	{
		"on-headers",
		"~1.0.2",
	},
	{
		"@types/webpack",
		"4.x",
	},
	{
		"safe-buffer",
		"~5.1.1",
	},
	{
		"webpack-hot-middleware",
		"2.x",
	},
	{
		"accepts",
		"~1.3.4",
	},
	{
		"accepts",
		"~1.3.5",
	},
	{
		"mime-types",
		"~2.1.17",
	},
	{
		"type-check",
		"~0.4.0",
	},
	{
		"asap",
		"~2.0.6",
	},
	{
		"postcss",
		"^7",
	},
	{
		"escape-html",
		"~1.0.3",
	},
	{
		"parseurl",
		"~1.3.2",
	},
	{
		"http-errors",
		"~1.6.2",
	},
	{
		"source-map",
		"~0.7.2",
	},
	{
		"async-limiter",
		"~1.0.0",
	},
	{
		"language-subtag-registry",
		"~0.3.2",
	},
	{
		"source-map-support",
		"~0.5.19",
	},
	{
		"source-map",
		"~0.6.1",
	},
	{
		"utila",
		"~0.4",
	},
	{
		"source-map-support",
		"~0.5.12",
	},
	{
		"errno",
		"~0.1.7",
	},
	{
		"fsevents",
		"~2.3.1",
	},
	{
		"inherits",
		"~2.0.1",
	},
	{
		"parseurl",
		"~1.3.3",
	},
	{
		"range-parser",
		"~1.2.1",
	},
	{
		"sprintf-js",
		"~1.0.2",
	},
	{
		"etag",
		"~1.8.1",
	},
	{
		"readdirp",
		"~3.5.0",
	},
	{
		"normalize-path",
		"~3.0.0",
	},
	{
		"glob-parent",
		"~5.1.0",
	},
	{
		"is-binary-path",
		"~2.1.0",
	},
	{
		"pako",
		"~1.0.5",
	},
	{
		"is-glob",
		"~4.0.1",
	},
	{
		"finalhandler",
		"~1.1.2",
	},
	{
		"anymatch",
		"~3.1.1",
	},
	{
		"accepts",
		"~1.3.7",
	},
	{
		"type-is",
		"~1.6.18",
	},
	{
		"depd",
		"~1.1.2",
	},
	{
		"encodeurl",
		"~1.0.2",
	},
	{
		"safe-buffer",
		"~5.2.0",
	},
	{
		"proxy-addr",
		"~2.0.5",
	},
	{
		"statuses",
		"~1.5.0",
	},
	{
		"methods",
		"~1.1.2",
	},
	{
		"content-type",
		"~1.0.4",
	},
	{
		"on-finished",
		"~2.3.0",
	},
	{
		"braces",
		"~3.0.2",
	},
	{
		"dom-converter",
		"^0.2",
	},
	{
		"source-map",
		"~0.6.0",
	},
	{
		"microevent.ts",
		"~0.2.1",
	},
	{
		"fresh",
		"~0.5.2",
	},
	{
		"debug",
		"~3.1.0",
	},
	{
		"content-disposition",
		"~0.5.2",
	},
	{
		"cookies",
		"~0.8.0",
	},
	{
		"only",
		"~0.0.2",
	},
	{
		"prr",
		"~1.0.1",
	},
	{
		"methods",
		"~1.1.0",
	},
	{
		"mkdirp",
		"~0.5.1",
	},
	{
		"util.promisify",
		"~1.0.0",
	},
	{
		"unquote",
		"~1.1.1",
	},
	{
		"sax",
		"~1.2.4",
	},
	{
		"json-stringify-safe",
		"~5.0.1",
	},
	{
		"is-typedarray",
		"~1.0.0",
	},
	{
		"qs",
		"~6.5.2",
	},
	{
		"set-blocking",
		"~2.0.0",
	},
	{
		"isstream",
		"~0.1.2",
	},
	{
		"console-control-strings",
		"~1.1.0",
	},
	{
		"mime-types",
		"~2.1.19",
	},
	{
		"extend",
		"~3.0.2",
	},
	{
		"forever-agent",
		"~0.6.1",
	},
	{
		"oauth-sign",
		"~0.9.0",
	},
	{
		"aws-sign2",
		"~0.7.0",
	},
	{
		"are-we-there-yet",
		"~1.1.2",
	},
	{
		"destroy",
		"~1.0.4",
	},
	{
		"mime-types",
		"~2.1.24",
	},
	{
		"caseless",
		"~0.12.0",
	},
	{
		"readable-stream",
		"~2.3.6",
	},
	{
		"forever-agent",
		"~0.6.1",
	},
	{
		"xtend",
		"~4.0.1",
	},
	{
		"form-data",
		"~2.3.2",
	},
	{
		"color-name",
		"~1.1.4",
	},
	{
		"tough-cookie",
		"~2.5.0",
	},
	{
		"minimatch",
		"~3.0.2",
	},
	{
		"http-errors",
		"~1.7.2",
	},
	{
		"http-signature",
		"~1.2.0",
	},
	{
		"har-validator",
		"~5.1.3",
	},
	{
		"lodash",
		"~4.17.10",
	},
	{
		"glob",
		"~7.1.1",
	},
	{
		"combined-stream",
		"~1.0.6",
	},
	{
		"type-is",
		"~1.6.17",
	},
	{
		"ret",
		"~0.1.10",
	},
	{
		"deep-equal",
		"~1.0.1",
	},
	{
		"gauge",
		"~2.7.3",
	},
	{
		"process-nextick-args",
		"~1.0.0",
	},
	{
		"string_decoder",
		"~0.10.x",
	},
	{
		"util-deprecate",
		"~1.0.1",
	},
	{
		"abbrev",
		"1.0.0",
	},
	{
		"boolbase",
		"~1.0.0",
	},
	{
		"core-util-is",
		"~1.0.0",
	},
	{
		"domelementtype",
		"~1.1.1",
	},
	{
		"cssom",
		"~0.3.6",
	},
	{
		"entities",
		"~1.1.1",
	},
	{
		"jsesc",
		"~0.5.0",
	},
	{
		"strip-json-comments",
		"~2.0.1",
	},
	{
		"ini",
		"~1.3.0",
	},
}

var TILDA_VERSIONS = [...]string{
	"~1.1.2",
	"~2.0.16",
	"~1.0.2",
	"~5.1.1",
	"~1.3.4",
	"~1.3.5",
	"~2.1.17",
	"~0.4.0",
	"~2.0.6",
	"~1.0.3",
	"~1.3.2",
	"~1.6.2",
	"~0.7.2",
	"~1.0.0",
	"~0.3.2",
	"~0.5.19",
	"~0.6.1",
	"~0.4",
	"~0.5.12",
	"~0.1.7",
	"~2.3.1",
	"~2.0.1",
	"~1.3.3",
	"~1.2.1",
	"~1.0.2",
	"~1.8.1",
	"~3.5.0",
	"~3.0.0",
	"~5.1.0",
	"~2.1.0",
	"~1.0.5",
	"~4.0.1",
	"~1.1.2",
	"~3.1.1",
	"~1.3.7",
	"~1.6.18",
	"~1.1.2",
	"~1.0.2",
	"~5.2.0",
	"~2.0.5",
	"~1.5.0",
	"~1.1.2",
	"~1.0.4",
	"~2.3.0",
	"~3.0.2",
	"~0.6.0",
	"~0.2.1",
	"~0.5.2",
	"~3.1.0",
	"~0.5.2",
	"~0.8.0",
	"~0.0.2",
	"~1.0.1",
	"~1.1.0",
	"~0.5.1",
	"~1.0.0",
	"~1.1.1",
	"~1.2.4",
	"~5.0.1",
	"~1.0.0",
	"~6.5.2",
	"~2.0.0",
	"~0.1.2",
	"~1.1.0",
	"~2.1.19",
	"~3.0.2",
	"~0.6.1",
	"~0.9.0",
	"~0.7.0",
	"~1.1.2",
	"~1.0.4",
	"~2.1.24",
	"~0.12.0",
	"~2.3.6",
	"~0.6.1",
	"~4.0.1",
	"~2.3.2",
	"~1.1.4",
	"~2.5.0",
	"~3.0.2",
	"~1.7.2",
	"~1.2.0",
	"~5.1.3",
	"~4.17.10",
	"~7.1.1",
	"~1.0.6",
	"~1.6.17",
	"~0.1.10",
	"~1.0.1",
	"~2.7.3",
	"~1.0.0",
	"~0.10.x",
	"~1.0.1",
	"~1.0.0",
	"~1.0.0",
	"~1.1.1",
	"~0.3.6",
	"~1.1.1",
	"~0.5.0",
	"~2.0.1",
	"~1.3.0",
}
