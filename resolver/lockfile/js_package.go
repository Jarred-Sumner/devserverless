package lockfile

import (
	"context"
	"crypto/tls"
	"errors"
	"fmt"
	"sort"
	"sync"
	"sync/atomic"
	"time"

	semver "github.com/Jarred-Sumner/semver-1"
	"github.com/gammazero/workerpool"
	runner "github.com/jarred-sumner/devserverless/resolver/runner"
	"github.com/jarred-sumner/peechy/buffer"
	jsoniter "github.com/json-iterator/go"
	"github.com/valyala/bytebufferpool"
	"github.com/valyala/fasthttp"
	"github.com/vmihailenco/msgpack/v5"
	"go.uber.org/zap"
)

type PackageManifestCache interface {
	Get(name string, version string) (*JavascriptPackageManifestPartial, bool)
	GetKey(key string) (*JavascriptPackageManifestPartial, bool)
	Put(name string, version string, manifest *JavascriptPackageManifestPartial)
}

type PackageRangeCache interface {
	Get(name string) (*JSDelivrPackageData, bool)
	Put(name string, result JSDelivrPackageData)
}

type PackageAliasCache interface {
	Get(name string) (string, bool)
	Put(name string, result string)
}

type MemoryPackageAliasCache struct {
	Store *sync.Map
}

func (m *MemoryPackageAliasCache) Get(name string) (string, bool) {
	v, e := m.Store.Load(name)
	if e {
		return v.(string), e
	} else {
		return "", e
	}

}

func (m *MemoryPackageAliasCache) Put(name string, alias string) {
	m.Store.Store(name, alias)
}

type JSDelivrPackageData struct {
	Tags     map[string]string `json:"tags"`
	Versions semver.Collection `json:"versions"`
}

type RawJSDelivrPackageData struct {
	Tags     map[string]string `json:"tags"`
	Versions []string          `json:"versions"`
}

func (p *JSDelivrPackageData) satisfying(version string) (string, error) {
	if version == "*" {
		version = "latest"
	}
	if len(p.Tags[version]) > 0 {
		version = p.Tags[version]
	}

	vr := NewVersionRange(version)
	var semverRange semver.Constraints
	var parsedVersion semver.Version
	var err error

	switch vr {
	case VersionRangeCaret:
		{
			semverRange, err = semver.NewConstraint(version)
		}
	case VersionRangeTilda:
		{
			semverRange, err = semver.NewConstraint(version)
		}
	case VersionRangeComplex:
		{

			semverRange, err = semver.NewConstraint(version)
		}

	case VersionRangeNone:
		{
			parsedVersion, err = semver.NewVersion(version)

			for i := p.Versions.Len() - 1; i > -1; i-- {
				if parsedVersion.Equal(&p.Versions[i]) {
					return p.Versions[i].String(), err
				}
			}

		}
	default:
		{
			return version, nil
		}
	}

	if err != nil {
		return version, err
	}

	if vr > VersionRangeNone {
		// Iterate through backwards because we want to find the latest satisfying version
		for i := len(p.Versions) - 1; i > -1; i-- {
			if semverRange.Check(&p.Versions[i]) {
				return p.Versions[i].String(), err
			}
		}
	}

	return version, err
}

var JSDelivrMetadataFormatterString = "https://data.jsdelivr.com/v1/package/npm/%s"

func (store *PackageManifestStore) FetchPackageMetadata(name string, parentName string) (JSDelivrPackageData, error) {
	logger := store.Logger.With(zap.String("pkg", name))

	req := fasthttp.AcquireRequest()
	resp := fasthttp.AcquireResponse()

	defer fasthttp.ReleaseResponse(resp)
	defer fasthttp.ReleaseRequest(req)

	req.SetRequestURI(fmt.Sprintf(JSDelivrMetadataFormatterString, name))
	var _logger *zap.Logger
	_logger = (*logger).With(zap.String("url", req.URI().String()), zap.String("name", name), zap.String("parent", parentName))
	_logger.Info("GET metadata")

	// log.Println(fmt.Sprintf(packageJsonFormatterString, name, version))
	var err error
	err = store.jsdelivrClient.DoDeadline(req, resp, time.Now().Add(time.Second))

	statusCode := resp.StatusCode()
	_logger = _logger.With(zap.Int("statusCode", statusCode))
	rawResult := RawJSDelivrPackageData{}
	var result JSDelivrPackageData

	if err != nil {
		_logger.Error("HTTP error", zap.Error(err))

		store.Ranges.Put(name, result)
		return result, err
	}

	switch statusCode {
	case 200:
		{
			var body []byte
			encoding := string(resp.Header.Peek(fasthttp.HeaderContentEncoding))
			switch encoding {
			case "deflate":
			case "gzip":
				{
					body, err = resp.BodyGunzip()
				}
			case "br":
				{
					body, err = resp.BodyUnbrotli()
				}
			default:
				{
					body = resp.Body()
				}
			}

			if err != nil {
				_logger.Error("Body error", zap.Error(err))

				store.Ranges.Put(name, result)
				return result, err
			}

			err = jsoniter.ConfigCompatibleWithStandardLibrary.Unmarshal(body, &rawResult)

			if err != nil {
				_logger.Error("Unmarshall error", zap.Error(err))

				store.Ranges.Put(name, result)
				return result, err
			}

			result = JSDelivrPackageData{
				Tags:     rawResult.Tags,
				Versions: make(semver.Collection, len(rawResult.Versions)),
			}

			for i, versionStr := range rawResult.Versions {
				parsed := semver.MustParse(versionStr)
				result.Versions[i] = parsed
			}

			sort.Sort(result.Versions)

			store.Ranges.Put(name, result)
			_logger.Info("Success")
			return result, err
		}
	case 404:
		{
			err = errors.New(fmt.Sprintf("package \"%s\" not found", name))
			_logger.Info("Fail")

			store.Ranges.Put(name, result)
			return result, err
		}

	case 509:
	case 505:
	case 504:
	case 503:
	case 502:
	case 501:
	case 500:
		{
			err = errors.New("internal error while validating package")
			_logger.Info("Fail")

			store.Ranges.Put(name, result)
			return result, err
		}

	case 429:
		{
			err = errors.New("too many requests")
			_logger.Info("Fail")

			store.Ranges.Put(name, result)
			return result, err
		}

	default:
		{
			err = errors.New(fmt.Sprintf("error: status code %d", statusCode))
			_logger.Info("Fail")
			store.Ranges.Put(name, result)
			return result, err
		}
	}

	return result, err
}

type MemoryPackageManifestCache struct {
	Store *sync.Map
}

const packageFormatterKey = "%s@%s"

func NewPackageManifestKey(name string, version string) string {
	return fmt.Sprintf(packageFormatterKey, name, version)
}

type MemoryPackageTagStore struct {
	Store  *sync.Map
	Logger *zap.Logger
}

func (i *MemoryPackageTagStore) Get(name string) (*JSDelivrPackageData, bool) {
	v, ok := i.Store.Load(name)

	if ok {
		jsdelivr := JSDelivrPackageData{}
		msgpack.Unmarshal(v.([]byte), &jsdelivr)

		return &jsdelivr, ok
	} else {
		return nil, false
	}

}

func (i *MemoryPackageTagStore) Put(name string, manifest JSDelivrPackageData) {

	b, err := msgpack.Marshal(&manifest)

	if err != nil {
		i.Logger.Error("Error marshaling jsdelivr")
		return
	}

	i.Store.Store(name, b)
}

func (i *MemoryPackageManifestCache) Get(name string, version string) (*JavascriptPackageManifestPartial, bool) {
	return i.GetKey(NewPackageManifestKey(name, version))
}

func (i *MemoryPackageManifestCache) GetKey(key string) (*JavascriptPackageManifestPartial, bool) {
	v, ok := i.Store.Load(key)

	if ok {
		buf := buffer.Buffer{
			Bytes: &bytebufferpool.ByteBuffer{
				B: v.([]byte),
			},
		}

		pkg, _ := DecodeJavascriptPackageManifestPartial(&buf)

		return &pkg, ok
	} else {
		return nil, false
	}

}

func (i *MemoryPackageManifestCache) Put(name string, version string, manifest *JavascriptPackageManifestPartial) {

	buf := buffer.Buffer{
		Bytes:  bytebufferpool.Get(),
		Offset: 0,
	}

	manifest.Encode(&buf)

	var res []byte

	res = make([]byte, buf.Bytes.Len())

	copy(res, buf.Bytes.B)

	defer bytebufferpool.Put(buf.Bytes)

	i.Store.Store(NewPackageManifestKey(name, version), res)
}

type PackageManifestStore struct {
	Manifests          PackageManifestCache
	Ranges             PackageRangeCache
	Aliases            PackageAliasCache
	MetadataWorkers    *workerpool.WorkerPool
	PackageJSONWorkers *workerpool.WorkerPool
	Emitter            runner.Bus
	Logger             *zap.Logger
	npmClient          *fasthttp.Client
	jsdelivrClient     *fasthttp.Client
}

func NewMemoryPackageManifestStore() PackageManifestStore {
	manifest := MemoryPackageManifestCache{
		Store: &sync.Map{},
	}

	aliases := MemoryPackageAliasCache{
		Store: &sync.Map{},
	}

	logger, _ := zap.NewDevelopment()
	rangeStore := MemoryPackageTagStore{
		Logger: logger,
		Store:  &sync.Map{},
	}

	store := PackageManifestStore{
		Manifests:          &manifest,
		Logger:             logger,
		Aliases:            &aliases,
		Ranges:             &rangeStore,
		PackageJSONWorkers: workerpool.New(100),
		MetadataWorkers:    workerpool.New(100),
		Emitter:            runner.New(),
		npmClient:          &fasthttp.Client{Name: "devserver"},
		jsdelivrClient:     &fasthttp.Client{Name: "devserver"},
	}

	if store.jsdelivrClient.TLSConfig == nil {
		store.jsdelivrClient.TLSConfig = &tls.Config{}
	}

	if store.npmClient.TLSConfig == nil {
		store.npmClient.TLSConfig = &tls.Config{}
	}

	// I don't want this to stop working if the npm provider forgets to renew their SSL cert.
	store.npmClient.TLSConfig.InsecureSkipVerify = true
	store.jsdelivrClient.TLSConfig.InsecureSkipVerify = true

	return store
}

type resultStruct struct {
	success bool
}

var successStruct = resultStruct{success: true}
var errorStruct = resultStruct{success: false}

const packageJsonFormatterString = "https://ga.jspm.io/npm:%s@%s/package.json"

type FetchPackageResult int

const FetchPackageSuccess FetchPackageResult = 1
const FetchPackageError FetchPackageResult = -1

func (s *PackageManifestStore) flattenDependencies(pkg *JavascriptPackageManifestPartial, parentCtx context.Context) (JavascriptPackageManifest, error) {
	logger := s.Logger.With(zap.String("rootPackage", pkg.Name))
	start := time.Now()

	val := atomic.Value{}
	val.Store(make([]string, 0, 1000))

	pack := PackageFlatPack{
		list:        make([]JavascriptPackageManifestPartial, 0),
		store:       s,
		packageKeys: val,
		Logger:      logger,
		Waiter:      &sync.WaitGroup{},
	}

	pack.FetchDependencies(pkg, false)
	pack.Waiter.Wait()

	logger.Info("Complete", zap.Uint64("successCount", pack.PackageCount), zap.Uint64("errorCount", pack.ErrorPackageCount), zap.Duration("elapsed", time.Since(start)))
	return pack.appendDependencies(pkg), nil
}

type PackageFlatPack struct {
	list        []JavascriptPackageManifestPartial
	packageKeys atomic.Value
	mutex       sync.Mutex

	PackageCount      uint64
	ErrorPackageCount uint64
	store             *PackageManifestStore
	Logger            *zap.Logger
	Waiter            *sync.WaitGroup
}

func (pack *PackageFlatPack) Append(key string) {
	keys := pack.packageKeys.Load().([]string)
	keys = append(keys, key)
	pack.packageKeys.Store(keys)
}

func (pack *PackageFlatPack) FetchDependencies(res *JavascriptPackageManifestPartial, includeDevDependencies bool) {
	var i int
	i = 0
	var n int

	if res.DependencyNames != nil && len(res.DependencyNames) > 0 {
		n = len(res.DependencyNames)
		i = 0
		for i < n {
			pack.enqueue(res.DependencyNames[i], res.DependencyVersions[i], res.Name)

			i++
		}
	}

	if includeDevDependencies && res.DevDependencyNames != nil && len(res.DevDependencyNames) > 0 {
		n = len(res.DevDependencyNames)
		i = 0
		for i < n {
			pack.enqueue(res.DevDependencyNames[i], res.DevDependencyVersions[i], res.Name)
			i++
		}
	}

	if res.PeerDependencyNames != nil && len(res.PeerDependencyVersions) > 0 {
		n = len(res.PeerDependencyNames)
		i = 0
		for i < n {
			pack.enqueue(res.PeerDependencyNames[i], res.PeerDependencyVersions[i], res.Name)
			i++
		}
	}
}

// func (s *PackageFlatPack) BuildManifest(manifest *JavascriptPackageManifest) {
// 	count := len(s.list) + 1

// }

func (p *PackageFlatPack) enqueue(name string, version string, parentName string) {
	var metadata *JSDelivrPackageData
	var hasMetadata bool
	var err error

	denormalizedVersion := version
	normalizedVersion := NormalizePackageVersionString(version)
	versionRange := NewVersionRange(normalizedVersion)
	s := p.store

	if versionRange != VersionRangeNone {
		metadata, hasMetadata = s.Ranges.Get(name)

		if !hasMetadata {
			w := p.Waiter
			w.Add(1)

			defer s.Emitter.SubscribeOnceAsync(name, func() {
				p := p
				w := p.Waiter
				w.Done()

				name := name
				version := version
				parentName := parentName

				p.enqueue(name, version, parentName)

			})

			p.EnqueueFetchPackageMetadata(name, denormalizedVersion, parentName)

			return
		}

		version, err = metadata.satisfying(normalizedVersion)
		s.Aliases.Put(NewPackageManifestKey(name, denormalizedVersion), version)

		if err != nil || version == "" {
			s.Logger.Info("No matching version found", zap.String("name", name), zap.String("version", normalizedVersion), zap.String("parent", parentName))
			manifest := JavascriptPackageManifestPartial{
				Name: name,
			}
			manifest.SetVersion(normalizedVersion)
			manifest.Status = PackageResolutionStatusInvalidVersion

			s.Manifests.Put(name, normalizedVersion, &manifest)
			// pkgErrorCount++
			atomic.AddUint64(&p.ErrorPackageCount, 1)
			return
		}

	}

	manifest, exists := s.Manifests.Get(name, version)
	if exists {
		key := NewPackageManifestKey(name, version)
		p.Append(key)
		atomic.AddUint64(&p.PackageCount, 1)
		p.FetchDependencies(manifest, false)

		// pkgSuccessCount++
		return
	}

	p.EnqueueFetchPackageJSON(name, version, p.Waiter, parentName)
}

func (p *PackageFlatPack) EnqueueFetchPackageJSON(name string, version string, w *sync.WaitGroup, parentName string) {
	s := p.store

	key := NewPackageManifestKey(name, version)
	w.Add(1)

	var isNew = !s.Emitter.HasCallback(key)

	s.Emitter.SubscribeOnceAsync(key, func(result resultStruct) {
		w := w
		p := p
		key := key
		if result.success {
			p.Append(key)
			atomic.AddUint64(&p.PackageCount, 1)
		} else {
			atomic.AddUint64(&p.ErrorPackageCount, 1)
		}
		w.Done()
	})

	if isNew {
		s.Logger.Info("Enqueue package.json", zap.String("name", name), zap.String("version", version))

		s.PackageJSONWorkers.Submit(func() {
			key := key
			name := name
			version := version
			parentName := parentName

			// broadcaster.L.Lock()

			p := p
			s := s
			res, err := s.FetchPackageJSON(name, version, parentName)

			if err == nil {
				defer s.Emitter.Publish(key, successStruct)
				p.FetchDependencies(res, false)
			} else {
				defer s.Emitter.Publish(key, errorStruct)
			}

		})
	}

}

func (p *PackageFlatPack) EnqueueFetchPackageMetadata(name string, pendingVersion string, parentName string) {
	s := p.store

	var isNew = !s.Emitter.HasCallback(name)

	// if !ok {

	// 	s.MetadataBroadcaster.Store(name, broadcaster)

	// } else {

	// }

	// broadcaster.L.Lock()

	if isNew {
		p.Logger.Info("Enqueue metadata", zap.String("name", name))

		s.MetadataWorkers.Submit(func() {

			name := name
			s := s
			p := p
			pendingVersion := pendingVersion
			parentName := parentName

			jsdelivr, _ := s.FetchPackageMetadata(name, parentName)

			s.Ranges.Put(name, jsdelivr)
			p.enqueue(name, pendingVersion, parentName)

			s.Emitter.Publish(name)
		})
	}

}

// func (s *PackageFlatPack) appendDependencyGroup(names []string, versions []string, recurseDep bool, recurseDev bool, recursePeer bool) {
// 	var value *JavascriptPackageManifestPartial
// 	var exists bool
// 	var alias string
// 	for i, name := range names {
// 		value, exists = s.store.Manifests.Get(name, versions[i])
// 		if !exists {
// 			alias, exists = s.store.Aliases.Get(NewPackageManifestKey(name, versions[i]))

// 			if exists {
// 				value, exists = s.store.Manifests.Get(name, alias)
// 			}
// 		}

// 		if exists {
// 			s.list = append(s.list, *value)

// 			if recurseDep && len(value.DependencyNames) > 0 {
// 				s.appendDependencyGroup(value.DependencyNames, value.DependencyVersions, true, true, true)
// 			}

// 			if recurseDev && len(value.DevDependencyNames) > 0 {
// 				s.appendDependencyGroup(value.DevDependencyNames, value.DevDependencyVersions, true, false, true)
// 			}

// 			if recursePeer && len(value.PeerDependencyNames) > 0 {
// 				s.appendDependencyGroup(value.PeerDependencyNames, value.PeerDependencyVersions, true, true, true)
// 			}
// 		}
// 	}
// }

func (p *JavascriptPackageManifest) GrowArrays(to int) {
	Name := make([]string, len(p.Name), to)
	Version := make([]Version, len(p.Version), to)
	// Dependencies := make([]uint, len(p.Dependencies), to)
	// DependenciesIndex := make([]uint, len(p.DependenciesIndex), to)

	copy(Name, p.Name)
	copy(Version, p.Version)
	// copy(Dependencies, p.Dependencies)
	// copy(DependenciesIndex, p.DependenciesIndex)

	p.Name = Name
	p.Version = Version
	// p.Dependencies = Dependencies
	// p.DependenciesIndex = DependenciesIndex
}

func (s *PackageFlatPack) appendDependencies(pkg *JavascriptPackageManifestPartial) JavascriptPackageManifest {
	full := JavascriptPackageManifest{
		Count:    uint(s.PackageCount),
		Provider: PackageProviderNpm,
		Name:     make([]string, 0, s.PackageCount),
		Version:  make([]Version, 0, s.PackageCount),
		// Dependencies:      make([]uint, 0, s.PackageCount),
		// DependenciesIndex: make([]uint, 0, s.PackageCount),
	}

	// var dependencyI uint
	var dependencyIndexer = make(map[string]uint, s.PackageCount)
	var manifest *JavascriptPackageManifestPartial
	var maxDependencyI uint
	var manifestExists bool
	var depExists bool
	keys := s.packageKeys.Load().([]string)
	for _, key := range keys {
		manifest, manifestExists = s.store.Manifests.GetKey(key)
		if manifestExists {
			_, depExists = dependencyIndexer[key]
			if depExists {

			} else {
				full.Name = append(full.Name, manifest.Name)
				full.Version = append(full.Version, manifest.Version)
				dependencyIndexer[key] = maxDependencyI
				maxDependencyI++
			}
		} else {
			s.Logger.Sugar().Warnf("Expected %s to exist", key)
		}
	}
	full.Count = maxDependencyI
	return full
}

func (s *PackageManifestStore) ResolveDependencies(pkg *JavascriptPackageManifestPartial, parentCtx context.Context) (JavascriptPackageManifest, error) {
	list, err := s.flattenDependencies(pkg, parentCtx)

	if err != nil {
		return list, err
	}

	// Count := len(list)

	// manifest := JavascriptPackageManifest{
	// 	Count: Count,
	// 	Name:  make([]string),
	// }
	return list, err
}

func (store *PackageManifestStore) FetchPackageJSON(name string, version string, parentName string) (*JavascriptPackageManifestPartial, error) {
	req := fasthttp.AcquireRequest()
	resp := fasthttp.AcquireResponse()

	defer fasthttp.ReleaseResponse(resp)
	defer fasthttp.ReleaseRequest(req)

	req.SetRequestURI(fmt.Sprintf(packageJsonFormatterString, name, version))
	var _logger *zap.Logger
	_logger = store.Logger.With(zap.String("url", req.URI().String()), zap.String("name", name), zap.String("version", version), zap.String("parent", parentName))
	_logger.Info("GET Dependency")

	// log.Println(fmt.Sprintf(packageJsonFormatterString, name, version))
	var err error
	err = store.npmClient.DoDeadline(req, resp, time.Now().Add(time.Second))
	statusCode := resp.StatusCode()
	_logger = _logger.With(zap.Int("statusCode", statusCode))
	var manifest JavascriptPackageManifestPartial

	if err != nil {
		_logger.Error("HTTP error", zap.Error(err))

		manifest = NewJavascriptPackageManifestWithError(name, version, PackageResolutionStatusInternal)
		store.Manifests.Put(name, version, &manifest)
		return &manifest, err
	}

	switch statusCode {
	case 200:
		{
			var body []byte
			encoding := string(resp.Header.Peek(fasthttp.HeaderContentEncoding))
			switch encoding {
			case "deflate":
			case "gzip":
				{
					body, err = resp.BodyGunzip()
				}
			case "br":
				{
					body, err = resp.BodyUnbrotli()
				}
			default:
				{
					body = resp.Body()
				}
			}

			if err != nil {
				manifest = NewJavascriptPackageManifestWithError(name, version, PackageResolutionStatusInternal)
				store.Manifests.Put(name, version, &manifest)
				return &manifest, err
			}

			manifest, err = NewJavascriptPackageManifestPartial(&body, true)

			if err != nil {
				manifest = NewJavascriptPackageManifestWithError(name, version, PackageResolutionStatusInternal)
				store.Manifests.Put(name, version, &manifest)
				return &manifest, err
			}

			store.Manifests.Put(name, version, &manifest)

			_logger.Info("Success")
		}
	case 404:
		{
			err = errors.New(fmt.Sprintf("package \"%s\" : \"%s\" not found", name, version))
			_logger.Info("Fail")
			manifest := NewJavascriptPackageManifestWithError(name, version, PackageResolutionStatusNotFound)
			store.Manifests.Put(name, version, &manifest)
			return &manifest, err
		}

	case 509:
	case 505:
	case 504:
	case 503:
	case 502:
	case 501:
	case 500:
		{
			err = errors.New("internal error while validating package")
			_logger.Info("Fail")
			manifest = NewJavascriptPackageManifestWithError(name, version, PackageResolutionStatusInternal)
			store.Manifests.Put(name, version, &manifest)
			return &manifest, err
		}

	case 429:
		{
			err = errors.New("too many requests")
			manifest = NewJavascriptPackageManifestWithError(name, version, PackageResolutionStatusRateLimit)
			_logger.Info("Fail")
			store.Manifests.Put(name, version, &manifest)
			return &manifest, err
		}

	default:
		{
			err = errors.New(fmt.Sprintf("error: status code %d", statusCode))
			manifest = NewJavascriptPackageManifestWithError(name, version, PackageResolutionStatusInternal)
			store.Manifests.Put(name, version, &manifest)
			_logger.Info("Fail")
			return &manifest, err
		}
	}

	return &manifest, err
}
