package cache

import (
	"crypto/tls"

	"github.com/gammazero/workerpool"
	"github.com/jarred-sumner/devserverless/resolver/lockfile"
	runner "github.com/jarred-sumner/devserverless/resolver/runner"
	cmap "github.com/orcaman/concurrent-map"
	"github.com/valyala/fasthttp"
	"go.uber.org/zap"
)

type MemoryPackageAliasCache struct {
	Store cmap.ConcurrentMap
}

type MemoryPackageManifestCache struct {
	Store lockfile.JavascriptPackageManifestPartialMap
}

type MemoryPackageTagStore struct {
	Store  lockfile.JSDelivrPackageDataMap
	Logger *zap.Logger
}

func (i *MemoryPackageTagStore) Get(name string) (*lockfile.JSDelivrPackageData, bool) {
	v, ok := i.Store.Load(name)

	if ok {
		return v, ok
	} else {
		return nil, false
	}

}

func (i *MemoryPackageTagStore) Put(name string, manifest lockfile.JSDelivrPackageData) {
	i.Store.Store(name, &manifest)
}

func (i *MemoryPackageManifestCache) Get(name string, version string) (*lockfile.JavascriptPackageManifestPartial, bool) {
	return i.GetKey(lockfile.NewPackageManifestKey(name, version))
}

func (i *MemoryPackageManifestCache) GetKey(key string) (*lockfile.JavascriptPackageManifestPartial, bool) {
	v, ok := i.Store.Load(key)

	if ok {
		return v, ok
	} else {
		return nil, false
	}

}

func (i *MemoryPackageManifestCache) Put(name string, version string, manifest *lockfile.JavascriptPackageManifestPartial) {

	i.Store.Store(lockfile.NewPackageManifestKey(name, version), manifest)
}

func NewMemoryPackageManifestStore() lockfile.PackageManifestStore {
	manifest := MemoryPackageManifestCache{
		Store: lockfile.JavascriptPackageManifestPartialMap{},
	}

	aliases := MemoryPackageAliasCache{
		Store: cmap.New(),
	}

	logger, _ := zap.NewDevelopment()
	rangeStore := MemoryPackageTagStore{
		Logger: logger,
		Store:  lockfile.JSDelivrPackageDataMap{},
	}

	store := lockfile.PackageManifestStore{
		Manifests:          &manifest,
		Logger:             logger,
		Aliases:            &aliases,
		Ranges:             &rangeStore,
		PackageJSONWorkers: workerpool.New(100),
		MetadataWorkers:    workerpool.New(100),
		Emitter:            runner.New(),
		NPMClient:          &fasthttp.Client{Name: "devserver"},
		JSDelivrClient:     &fasthttp.Client{Name: "devserver"},
	}

	if store.JSDelivrClient.TLSConfig == nil {
		store.JSDelivrClient.TLSConfig = &tls.Config{}
	}

	if store.NPMClient.TLSConfig == nil {
		store.NPMClient.TLSConfig = &tls.Config{}
	}

	// I don't want this to stop working if the npm provider forgets to renew their SSL cert.
	store.NPMClient.TLSConfig.InsecureSkipVerify = true
	store.JSDelivrClient.TLSConfig.InsecureSkipVerify = true

	return store
}

func (m *MemoryPackageAliasCache) Get(name string) (string, bool) {
	v, e := m.Store.Get(name)
	if e {
		return v.(string), e
	} else {
		return "", e
	}

}

func (m *MemoryPackageAliasCache) Put(name string, alias string) {
	m.Store.Set(name, alias)
}
