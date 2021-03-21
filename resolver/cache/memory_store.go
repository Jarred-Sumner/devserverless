package cache

import (
	"crypto/tls"

	"github.com/dgraph-io/ristretto"
	"github.com/gammazero/workerpool"
	"github.com/jarred-sumner/devserverless/resolver/lockfile"
	runner "github.com/jarred-sumner/devserverless/resolver/runner"
	"github.com/valyala/fasthttp"
	"go.uber.org/zap"
)

type MemoryPackageAliasCache struct {
	Store ristretto.Cache
}

type MemoryPackageManifestCache struct {
	Store ristretto.Cache
}

type MemoryPackageTagStore struct {
	Store ristretto.Cache
}

func (i *MemoryPackageTagStore) Get(name string) (*lockfile.JSDelivrPackageData, bool) {
	v, ok := i.Store.Get(name)

	if ok {
		pkg := v.(lockfile.JSDelivrPackageData)
		return &pkg, ok
	} else {
		return nil, false
	}

}

func (i *MemoryPackageTagStore) Put(name string, manifest lockfile.JSDelivrPackageData) {
	i.Store.Set(name, manifest, 1)
}

func (i *MemoryPackageManifestCache) Get(name string, version string) (*lockfile.JavascriptPackageManifestPartial, bool) {
	return i.GetKey(lockfile.NewPackageManifestKey(name, version))
}

func (i *MemoryPackageManifestCache) GetKey(key string) (*lockfile.JavascriptPackageManifestPartial, bool) {
	v, ok := i.Store.Get(key)

	if ok {
		partial := v.(lockfile.JavascriptPackageManifestPartial)
		return &partial, ok
	} else {
		return nil, false
	}

}

func (i *MemoryPackageManifestCache) Put(name string, version string, manifest *lockfile.JavascriptPackageManifestPartial) {
	i.Store.Set(lockfile.NewPackageManifestKey(name, version), *manifest, 1)
}

func NewMemoryPackageManifestCache() *MemoryPackageManifestCache {
	manifestConfig := ristretto.Config{
		NumCounters: 1e7,     // number of keys to track frequency of (10M).
		MaxCost:     1600000, // maximum cost of cache (1GB).
		BufferItems: 64,      // number of keys per Get buffer.
	}

	manifestCache, _ := ristretto.NewCache(&manifestConfig)
	return &MemoryPackageManifestCache{
		Store: *manifestCache,
	}
}

func NewMemoryPackageAliasCache() *MemoryPackageAliasCache {
	aliasConfig := ristretto.Config{
		NumCounters: 1e7,     // number of keys to track frequency of (10M).
		MaxCost:     1600000, // maximum cost of cache (1GB).
		BufferItems: 64,      // number of keys per Get buffer.
	}

	aliasCache, _ := ristretto.NewCache(&aliasConfig)

	return &MemoryPackageAliasCache{
		Store: *aliasCache,
	}
}

func NewMemoryPackageRangeCache() *MemoryPackageTagStore {
	rangeConfig := ristretto.Config{
		NumCounters: 1e7,     // number of keys to track frequency of (10M).
		MaxCost:     1600000, // maximum cost of cache (1GB).
		BufferItems: 64,      // number of keys per Get buffer.
	}

	rangeCache, _ := ristretto.NewCache(&rangeConfig)

	return &MemoryPackageTagStore{
		Store: *rangeCache,
	}
}

// Using Ristretto here is about a 50% perf hit when everything is already cached.
// But, 50% here is approximately 125µs (0.125ms)
// So that's probably the right move.
// It needs to be an LRU because what if you have like 10,000 packages in memory will it fit?  Who the duck knows
func NewMemoryPackageManifestStore() lockfile.PackageManifestStore {
	logger, _ := zap.NewDevelopment()

	store := lockfile.PackageManifestStore{
		Manifests:          NewMemoryPackageManifestCache(),
		Logger:             logger,
		Aliases:            NewMemoryPackageAliasCache(),
		Ranges:             NewMemoryPackageRangeCache(),
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
	m.Store.Set(name, alias, 1)
}
