package cache

import (
	"crypto/tls"
	"os"
	"reflect"
	"time"
	"unsafe"

	"github.com/dgraph-io/ristretto"
	"github.com/gammazero/workerpool"
	"github.com/jarred-sumner/devserverless/resolver/lockfile"
	runner "github.com/jarred-sumner/devserverless/resolver/runner"
	"github.com/jarred-sumner/peechy/buffer"
	msgpack "github.com/shamaton/msgpack"
	"github.com/valyala/bytebufferpool"
	"github.com/valyala/fasthttp"
	bolt "go.etcd.io/bbolt"
	"go.uber.org/zap"
)

type LocalPackageManifestStore struct {
	databasePath string
	Store        *lockfile.PackageManifestStore
	Manifests    *LocalPackageManifestCache
	Aliases      *LocalPackageAliasCache
	Ranges       *LocalPackageRangeCache

	SaveWorker *workerpool.WorkerPool
	Database   *bolt.DB
}

type LocalPackageManifestCache struct {
	MemoryStore *ristretto.Cache
	Database    *bolt.DB
	ChangedKeys *StringBoolMap
}

type LocalPackageAliasCache struct {
	MemoryStore *ristretto.Cache
	Database    *bolt.DB
	ChangedKeys *StringBoolMap
}

func unsafeGetBytes(s string) []byte {
	return (*[0x7fff0000]byte)(unsafe.Pointer(
		(*reflect.StringHeader)(unsafe.Pointer(&s)).Data),
	)[:len(s):len(s)]
}

type LocalPackageRangeCache struct {
	MemoryStore *ristretto.Cache
	Database    *bolt.DB
	ChangedKeys *StringBoolMap
}

func (m *LocalPackageAliasCache) Get(name string) (string, bool) {
	v, e := m.MemoryStore.Get(name)
	if e {
		return v.(string), e
	} else {
		key := []byte(name)
		tx, _ := m.Database.Begin(false)
		defer tx.Rollback()

		bucket := tx.Bucket([]byte(AliasBucketName))
		tempV := bucket.Get(key)
		if tempV == nil {
			return "", e
		}

		str := string(tempV)
		e = true
		m.MemoryStore.SetWithTTL(key, str, 1, time.Hour)
		return str, e
	}
}

func (i *LocalPackageAliasCache) Flush() ([]string, []string) {
	values := make([]string, 0, 20)
	keys := make([]string, 0, 20)

	i.ChangedKeys.Range(func(key string, value bool) bool {
		i := i
		v, ok := i.MemoryStore.Get(key)
		if ok {
			values = append(values, v.(string))
			keys = append(keys, key)
		}
		return true
	})
	i.ChangedKeys = &StringBoolMap{}

	return keys, values
}

func (m *LocalPackageAliasCache) Put(name string, alias string) {
	m.MemoryStore.Set(name, alias, 1)
	m.ChangedKeys.Store(name, true)
}

func (m *LocalPackageManifestCache) Get(name string, version string) (*lockfile.JavascriptPackageManifestPartial, bool) {
	return m.GetKey(lockfile.NewPackageManifestKey(name, version))
}

func (m *LocalPackageManifestCache) GetKey(key string) (*lockfile.JavascriptPackageManifestPartial, bool) {
	v, e := m.MemoryStore.Get(key)
	if e {
		partial := v.(lockfile.JavascriptPackageManifestPartial)
		return &partial, e
	} else {
		bytes := unsafeGetBytes(key)

		tx, _ := m.Database.Begin(false)
		bucket := tx.Bucket([]byte(ManifestBucketName))
		defer tx.Rollback()

		tempV := bucket.Get(bytes)
		if len(tempV) == 0 {
			return nil, e
		}

		e = true

		buffer := buffer.Buffer{
			Bytes: &bytebufferpool.ByteBuffer{
				B: tempV,
			},
		}

		pkg, err := lockfile.DecodeJavascriptPackageManifestPartial(&buffer)
		if err != nil {
			return nil, false
		}

		m.MemoryStore.Set(key, pkg, 1)
		return &pkg, e
	}
}

func (i *LocalPackageManifestCache) Flush() ([]string, []lockfile.JavascriptPackageManifestPartial) {
	values := make([]lockfile.JavascriptPackageManifestPartial, 0, 20)
	keys := make([]string, 0, 20)

	i.ChangedKeys.Range(func(key string, value bool) bool {
		i := i
		v, ok := i.MemoryStore.Get(key)
		if ok {
			pkg := v.(lockfile.JavascriptPackageManifestPartial)
			keys = append(keys, key)
			values = append(values, pkg)
		}
		return true
	})
	i.ChangedKeys = &StringBoolMap{}

	return keys, values
}

func (m *LocalPackageManifestCache) Put(name string, version string, manifest *lockfile.JavascriptPackageManifestPartial) {
	key := lockfile.NewPackageManifestKey(name, version)
	m.MemoryStore.Set(key, *manifest, 1)

	if manifest.Status == lockfile.PackageResolutionStatusSuccess {
		m.ChangedKeys.Store(key, true)
	}
}

const ManifestBucketName = "V1_ManifestCache"
const AliasBucketName = "V1_AliasCache"
const RangeBucketName = "V1_RangeCache"

func NewLocalPackageManifestStore(databaseFile string) (*LocalPackageManifestStore, error) {
	logger, _ := zap.NewDevelopment()
	const initialMmapSize = 256 * 1024 * 1024 * 1024 // 32M

	needsCreateBucket := false
	if _, err := os.Stat(databaseFile); os.IsNotExist(err) {
		needsCreateBucket = true
	}

	db, err := bolt.Open(databaseFile, 0644, &bolt.Options{
		// MmapFlags:       syscall,
		InitialMmapSize: initialMmapSize,
		FreelistType:    bolt.FreelistMapType,
	})

	if err != nil {
		return nil, err
	}

	if needsCreateBucket {
		tx, err := db.Begin(true)

		if err != nil {
			return nil, err
		}

		_, err = tx.CreateBucketIfNotExists([]byte(ManifestBucketName))
		if err != nil {
			return nil, err
		}

		_, err = tx.CreateBucketIfNotExists([]byte(AliasBucketName))
		if err != nil {
			return nil, err
		}

		_, err = tx.CreateBucketIfNotExists([]byte(RangeBucketName))
		if err != nil {
			return nil, err
		}

		tx.Commit()
	}

	manifestConfig := ristretto.Config{
		NumCounters: 1e7,     // number of keys to track frequency of (10M).
		MaxCost:     1600000, // maximum cost of cache (1GB).
		BufferItems: 64,      // number of keys per Get buffer.
	}

	manifestCache, _ := ristretto.NewCache(&manifestConfig)

	aliasConfig := ristretto.Config{
		NumCounters: 1e7,     // number of keys to track frequency of (10M).
		MaxCost:     1600000, // maximum cost of cache (1GB).
		BufferItems: 64,      // number of keys per Get buffer.
	}

	aliasCache, _ := ristretto.NewCache(&aliasConfig)

	rangeConfig := ristretto.Config{
		NumCounters: 1e7,     // number of keys to track frequency of (10M).
		MaxCost:     1600000, // maximum cost of cache (1GB).
		BufferItems: 64,      // number of keys per Get buffer.
	}

	rangeCache, _ := ristretto.NewCache(&rangeConfig)

	Manifests := LocalPackageManifestCache{
		Database:    db,
		MemoryStore: manifestCache,
		ChangedKeys: &StringBoolMap{},
	}

	Aliases := LocalPackageAliasCache{
		Database:    db,
		MemoryStore: aliasCache,
		ChangedKeys: &StringBoolMap{},
	}

	Ranges := LocalPackageRangeCache{
		Database:    db,
		MemoryStore: rangeCache,
		ChangedKeys: &StringBoolMap{},
	}

	Store := lockfile.PackageManifestStore{
		Manifests:          &Manifests,
		Logger:             logger,
		Aliases:            &Aliases,
		Ranges:             &Ranges,
		PackageJSONWorkers: workerpool.New(100),
		MetadataWorkers:    workerpool.New(100),
		Emitter:            runner.New(),
		NPMClient:          &fasthttp.Client{Name: "devserver"},
		JSDelivrClient:     &fasthttp.Client{Name: "devserver"},
	}

	store := LocalPackageManifestStore{
		databasePath: databaseFile,
		Database:     db,
		Store:        &Store,
		Manifests:    &Manifests,
		Aliases:      &Aliases,
		Ranges:       &Ranges,
		SaveWorker:   workerpool.New(1),
	}

	if Store.JSDelivrClient.TLSConfig == nil {
		Store.JSDelivrClient.TLSConfig = &tls.Config{}
	}

	if Store.NPMClient.TLSConfig == nil {
		Store.NPMClient.TLSConfig = &tls.Config{}
	}

	// I don't want this to stop working if the npm provider forgets to renew their SSL cert.
	Store.NPMClient.TLSConfig.InsecureSkipVerify = true
	Store.JSDelivrClient.TLSConfig.InsecureSkipVerify = true

	return &store, err
}

func (i *LocalPackageManifestStore) Flush(channel chan error, closeDB bool) {
	tx, err := i.Database.Begin(true)
	if err != nil {
		channel <- err
		return
	}

	start := time.Now()

	totalCount := 0
	i.Store.Logger.Debug("Begin flush", zap.String("destination", i.databasePath))
	hasChanges := false
	aliasKeys, aliasValues := i.Aliases.Flush()
	count := len(aliasKeys)

	if count > 0 {
		i.Store.Logger.Debug("Saving aliases", zap.Int("count", count))
		bucket := tx.Bucket([]byte(AliasBucketName))
		index := 0
		for index < count {
			bucket.Put([]byte(aliasKeys[index]), []byte(aliasValues[index]))
			index++
		}
		totalCount = index
		hasChanges = true
	}

	rangeKeys, rangeValues := i.Ranges.Flush()

	count = len(rangeKeys)

	if count > 0 {
		i.Store.Logger.Debug("Saving ranges", zap.Int("count", count))
		bucket := tx.Bucket([]byte(RangeBucketName))
		index := 0
		for index < count {
			encoded, err := msgpack.Marshal(rangeValues[index])
			if err == nil {
				bucket.Put([]byte(rangeKeys[index]), encoded)
				totalCount++
			}
			index++
		}
		hasChanges = true
	}

	manifestsKeys, manifestsValues := i.Manifests.Flush()
	count = len(manifestsKeys)
	if count > 0 {
		i.Store.Logger.Debug("Saving manifests", zap.Int("count", count))

		bucket := tx.Bucket([]byte(ManifestBucketName))
		index := 0
		buffer := buffer.Buffer{
			Bytes: bytebufferpool.Get(),
		}

		for index < count {
			buffer.Reset()
			err = manifestsValues[index].Encode(&buffer)
			if err == nil {
				b := make([]byte, buffer.Offset)
				copy(b, buffer.Bytes.B[:buffer.Offset])
				err = bucket.Put([]byte(manifestsKeys[index]), b)
				if err == nil {
					totalCount++
				} else {
					i.Store.Logger.Error("Error saving manifest", zap.Error(err))
				}

			}
			index++
		}
		defer bytebufferpool.Put(buffer.Bytes)

		hasChanges = true
	}

	if hasChanges {
		err = tx.Commit()
	} else {
		err = tx.Rollback()
	}

	if err != nil {
		i.Store.Logger.Error("Failed to flush", zap.String("destination", i.databasePath), zap.Error(err))
	} else {
		i.Store.Logger.Debug("Flush completed", zap.String("destination", i.databasePath), zap.Duration("elapsed", time.Since(start)), zap.Int("Saved", totalCount))
	}

	if closeDB {
		err = i.Database.Close()
	}

	channel <- err

}

func (i *LocalPackageRangeCache) Flush() ([]string, []lockfile.JSDelivrPackageData) {
	values := make([]lockfile.JSDelivrPackageData, 0, 20)
	keys := make([]string, 0, 20)

	i.ChangedKeys.Range(func(key string, value bool) bool {
		i := i
		v, ok := i.MemoryStore.Get(key)
		if ok {
			pkg := v.(lockfile.JSDelivrPackageData)
			values = append(values, pkg)
			keys = append(keys, key)
		}

		return true
	})
	i.ChangedKeys = &StringBoolMap{}

	return keys, values
}

func (i *LocalPackageRangeCache) Get(name string) (*lockfile.JSDelivrPackageData, bool) {
	v, ok := i.MemoryStore.Get(name)

	if ok {
		pkg := v.(lockfile.JSDelivrPackageData)
		return &pkg, ok
	} else {
		bytes := unsafeGetBytes(name)
		tx, _ := i.Database.Begin(false)
		defer tx.Rollback()

		bucket := tx.Bucket([]byte(RangeBucketName))
		tempV := bucket.Get(bytes)
		if tempV == nil {
			return nil, ok
		}

		ok = true

		pkg := lockfile.JSDelivrPackageData{}
		err := msgpack.Unmarshal(tempV, &pkg)

		if err != nil {
			return nil, false
		}

		i.MemoryStore.Set(name, pkg, 1)
		return &pkg, ok
	}

}

func (i *LocalPackageRangeCache) Put(name string, manifest lockfile.JSDelivrPackageData) {
	i.MemoryStore.Set(name, manifest, 1)
	i.ChangedKeys.Store(name, true)
}
