package lockfile_test

import (
	"io/ioutil"
	"os"
	"path"
	"reflect"
	"testing"

	"github.com/davecgh/go-spew/spew"
	"github.com/fatih/color"
	"github.com/jarred-sumner/devserverless/resolver/lockfile"
	"github.com/jarred-sumner/peechy/buffer"

	jsoniter "github.com/json-iterator/go"
	"github.com/valyala/bytebufferpool"
)

func loadFixture(loc string) lockfile.JavascriptPackageManifestPartial {
	dir, _ := os.Getwd()
	jsonText, _ := ioutil.ReadFile(path.Join(dir, loc))

	file, _ := lockfile.NewJavascriptPackageManifestPartial(&jsonText, true, false)

	return file
}

func failLog(t *testing.T, obj interface{}) {
	print(color.RedString(spew.Sdump(obj)))
}

func okLog(t *testing.T, obj interface{}) {
	print(color.GreenString(spew.Sdump(obj)))
}

func TestPackageManifestEncoding(t *testing.T) {
	fixture := loadFixture("../../package.json")

	buf := buffer.Buffer{
		Bytes: bytebufferpool.Get(),
	}

	defer bytebufferpool.Put(buf.Bytes)

	fixtureString, _ := jsoniter.ConfigCompatibleWithStandardLibrary.Marshal(fixture)
	fixtureReloaded := lockfile.JavascriptPackageManifestPartial{}

	jsoniter.ConfigCompatibleWithStandardLibrary.Unmarshal(fixtureString, &fixtureReloaded)

	fixture.Encode(&buf)

	buf.Offset = 0
	res, _ := lockfile.DecodeJavascriptPackageManifestPartial(&buf)

	if !reflect.DeepEqual(fixture, res) {
		okLog(t, fixture)
		failLog(t, res)

		t.FailNow()
	}

}
