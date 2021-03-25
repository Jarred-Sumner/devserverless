package lockfile

import (
	"context"
	"errors"
	"fmt"
	"sort"
	"strings"
	"sync"
	"sync/atomic"
	"time"

	semver "github.com/Jarred-Sumner/semver/v4"
	"github.com/gammazero/workerpool"
	"github.com/jarred-sumner/devserverless/config"
	runner "github.com/jarred-sumner/devserverless/resolver/runner"
	jsoniter "github.com/json-iterator/go"
	"github.com/valyala/fasthttp"
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

func (store *PackageManifestStore) FetchPackageMetadata(name string, parentName string) (*JSDelivrPackageData, error) {
	logger := store.Logger.With(zap.String("pkg", name))
	var _logger *zap.Logger
	var err error
	var result JSDelivrPackageData
	var body []byte

	req := fasthttp.AcquireRequest()
	resp := fasthttp.AcquireResponse()

	defer fasthttp.ReleaseResponse(resp)
	defer fasthttp.ReleaseRequest(req)

	req.SetRequestURI(fmt.Sprintf(JSDelivrMetadataFormatterString, name))

	_logger = (*logger).With(zap.String("url", req.URI().String()), zap.String("name", name), zap.String("parent", parentName))
	_logger.Info("GET metadata")

	// log.Println(fmt.Sprintf(packageJsonFormatterString, name, version))

	err = store.JSDelivrClient.DoDeadline(req, resp, time.Now().Add(time.Minute))

	statusCode := resp.StatusCode()
	_logger = _logger.With(zap.Int("statusCode", statusCode))
	rawResult := RawJSDelivrPackageData{}

	if err != nil {
		_logger.Error("HTTP error", zap.Error(err))

		store.Ranges.Put(name, result)
		return &result, err
	}

	switch statusCode {
	case 200:
		{

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
				return &result, err
			}

			err = jsoniter.ConfigFastest.Unmarshal(body, &rawResult)

			if err != nil {
				_logger.Error("Unmarshall error", zap.Error(err))

				store.Ranges.Put(name, result)
				return &result, err
			}

			list := make(semver.Versions, 0, len(rawResult.Versions))

			for _, versionStr := range rawResult.Versions {
				parsed, e := semver.Parse(versionStr)
				if e != nil {
					_logger.Error("Error checking version", zap.Error(e), zap.String("version", versionStr))
				}
				list = append(list, parsed)
			}

			sort.Sort(list)

			result = JSDelivrPackageData{
				Tags:     rawResult.Tags,
				Versions: list,
			}

			store.Ranges.Put(name, result)
			_logger.Debug("Success")
			return &result, err
		}
	case 404:
		{
			err = errors.New(fmt.Sprintf("package \"%s\" not found", name))
			_logger.Debug("Fail")

			store.Ranges.Put(name, result)
			return &result, err
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
			_logger.Debug("Fail")

			store.Ranges.Put(name, result)
			return &result, err
		}

	case 429:
		{
			err = errors.New("too many requests")
			_logger.Debug("Fail")

			store.Ranges.Put(name, result)
			return &result, err
		}

	default:
		{
			err = errors.New(fmt.Sprintf("error: status code %d", statusCode))
			_logger.Debug("Fail")
			store.Ranges.Put(name, result)
			return &result, err
		}
	}

	return &result, err
}

func NewPackageManifestKey(name string, version string) string {
	var b strings.Builder

	b.Grow(len(name) + len(version) + 1)
	b.WriteString(name)
	b.WriteRune('@')
	b.WriteString(version)
	return b.String()
}

type CompletionNotifier interface {
	Enqueue(manifest *JavascriptPackageManifestPartial)
}

type PackageManifestStore struct {
	Manifests          PackageManifestCache
	Ranges             PackageRangeCache
	Aliases            PackageAliasCache
	MetadataWorkers    *workerpool.WorkerPool
	PackageJSONWorkers *workerpool.WorkerPool
	Installer          CompletionNotifier
	Emitter            runner.Bus
	Logger             *zap.Logger
	NPMClient          *fasthttp.Client
	JSDelivrClient     *fasthttp.Client
	RegistrarAPI       config.RegistrarString
}

type resultStruct struct {
	success bool
	value   *JavascriptPackageManifestPartial
}

var successStruct = resultStruct{success: true}
var errorStruct = resultStruct{success: false}

type FetchPackageResult int

const FetchPackageSuccess FetchPackageResult = 1
const FetchPackageError FetchPackageResult = -1

func (s *PackageManifestStore) flattenDependencies(pkg *JavascriptPackageManifestPartial, parentCtx context.Context) (JavascriptPackageManifest, error) {
	logger := s.Logger.With(zap.String("rootPackage", pkg.Name))

	start := time.Now()

	val := atomic.Value{}
	val.Store(make([]string, 0, 1000))

	pack := PackageFlatPack{
		list:             make([]JavascriptPackageManifestPartial, 0),
		store:            s,
		packageKeys:      make(map[string]bool, 100),
		packageKeysMutex: sync.Mutex{},
		Logger:           logger,
		Waiter:           &sync.WaitGroup{},
	}

	pack.FetchDependencies(pkg, true)
	pack.Waiter.Wait()

	defer logger.Info("Complete", zap.Uint64("successCount", pack.PackageCount), zap.Uint64("errorCount", pack.ErrorPackageCount), zap.Duration("elapsed", time.Since(start)))
	return pack.appendDependencies(pkg), nil
}

type PackageFlatPack struct {
	list             []JavascriptPackageManifestPartial
	packageKeys      map[string]bool
	packageKeysMutex sync.Mutex

	PackageCount      uint64
	ErrorPackageCount uint64
	store             *PackageManifestStore
	Logger            *zap.Logger
	Waiter            *sync.WaitGroup
}

func (pack *PackageFlatPack) Append(key string, value bool) {
	pack.packageKeysMutex.Lock()
	defer pack.packageKeysMutex.Unlock()
	pack.packageKeys[key] = value
}

func (pack *PackageFlatPack) Has(key string) bool {
	pack.packageKeysMutex.Lock()
	defer pack.packageKeysMutex.Unlock()
	_, ok := pack.packageKeys[key]
	return ok
}

func (pack *PackageFlatPack) FetchDependencies(res *JavascriptPackageManifestPartial, includeDevDependencies bool) {

	if res.DependencyNames != nil && len(res.DependencyNames) > 0 {
		for i := range res.DependencyNames {
			pack.enqueue(res.DependencyNames[i], res.DependencyVersions[i], res.Name)
		}
	}

	if includeDevDependencies && res.DevDependencyNames != nil && len(res.DevDependencyNames) > 0 {
		for i := range res.DevDependencyNames {
			pack.enqueue(res.DevDependencyNames[i], res.DevDependencyVersions[i], res.Name)
		}
	}

	if res.PeerDependencyNames != nil && len(res.PeerDependencyVersions) > 0 {
		for i := range res.PeerDependencyNames {
			pack.enqueue(res.PeerDependencyNames[i], res.PeerDependencyVersions[i], res.Name)
		}
	}
}

// func (s *PackageFlatPack) BuildManifest(manifest *JavascriptPackageManifest) {
// 	count := len(s.list) + 1

// }

func (p *PackageFlatPack) enqueue(name string, version string, parentName string) {
	versionLength := len(version)
	versionRange := NewVersionRange(version, versionLength)
	protocol := NewPackageVersionProtocol(version, versionLength)
	key := NewPackageManifestKey(name, protocol.ExtractTag(version))

	switch protocol {
	case PackageVersionProtocolDefault:
		{
			p.enqueueDefaultProtocol(name, version, parentName, versionRange, key)
		}
	case PackageVersionProtocolGithubBare, PackageVersionProtocolGithubDotCom, PackageVersionProtocolGithubTarball, PackageVersionProtocolGithubOwnerRepo:
		{
			p.enqueueGithubPackage(name, parentName, version, versionRange, protocol, key)
		}

	}

}

func (p *PackageFlatPack) enqueueGithubPackage(name string, parentName string, version string, versionRange VersionRange, protocol PackageVersionProtocol, key string) {

	if p.Has(key) {
		manifest, exists := p.store.Manifests.GetKey(key)
		if exists && p.store.Installer != nil && manifest.Status == PackageResolutionStatusSuccess {
			p.store.Installer.Enqueue(manifest)
		}
		return
	}

	manifest, exists := p.store.Manifests.GetKey(key)
	if exists {
		isSuccess := manifest.Status == PackageResolutionStatusSuccess
		p.Append(key, isSuccess)
		if p.store.Installer != nil && manifest.Status == PackageResolutionStatusSuccess {
			p.store.Installer.Enqueue(manifest)
		}
		atomic.AddUint64(&p.PackageCount, 1)
		p.FetchDependencies(manifest, false)
		// pkgSuccessCount++
		return
	}

	p.EnqueueFetchPackageJSON(key, name, version, p.Waiter, parentName, protocol)
}

func (p *PackageFlatPack) enqueueDefaultProtocol(name string, version string, parentName string, versionRange VersionRange, key string) {
	s := p.store
	var err error
	if versionRange != VersionRangeExact {
		aliasVersion, hasAlias := s.Aliases.Get(key)
		if !hasAlias {
			metadata, hasMetadata := s.Ranges.Get(name)

			if !hasMetadata {
				w := p.Waiter
				w.Add(1)

				p.EnqueueFetchPackageMetadata(name, version, parentName)

				s.Emitter.SubscribeOnceAsync(name, func() {
					p := p
					w := p.Waiter
					defer w.Done()

					name := name
					version := version
					parentName := parentName

					p.enqueue(name, version, parentName)

				})
				return
			}

			version, err = metadata.Satisfying(version)
			s.Aliases.Put(key, version)
		} else {
			version = aliasVersion
		}

		if err != nil || version == "" {
			s.Logger.Debug("No matching version found", zap.String("name", name), zap.String("version", version), zap.String("parent", parentName))
			manifest := JavascriptPackageManifestPartial{
				Name: name,
			}
			manifest.SetVersion(version)
			manifest.Status = PackageResolutionStatusInvalidVersion

			s.Manifests.Put(name, version, &manifest)
			// pkgErrorCount++
			atomic.AddUint64(&p.ErrorPackageCount, 1)
			return
		}

		key = NewPackageManifestKey(name, version)
	}

	if p.Has(key) {
		manifest, exists := s.Manifests.GetKey(key)
		if exists && p.store.Installer != nil && manifest.Status == PackageResolutionStatusSuccess {
			p.store.Installer.Enqueue(manifest)
		}
		return
	}

	manifest, exists := s.Manifests.GetKey(key)
	if exists {
		isSuccess := manifest.Status == PackageResolutionStatusSuccess
		p.Append(key, isSuccess)
		if p.store.Installer != nil && manifest.Status == PackageResolutionStatusSuccess {
			p.store.Installer.Enqueue(manifest)
		}
		atomic.AddUint64(&p.PackageCount, 1)
		p.FetchDependencies(manifest, false)
		// pkgSuccessCount++
		return
	}

	p.EnqueueFetchPackageJSON(key, name, version, p.Waiter, parentName, PackageVersionProtocolDefault)
}

func (p *PackageFlatPack) EnqueueFetchPackageJSON(key string, name string, version string, w *sync.WaitGroup, parentName string, protocol PackageVersionProtocol) {

	s := p.store

	w.Add(1)

	var isNew = !s.Emitter.HasCallback(key)

	s.Emitter.SubscribeOnceAsync(key, func(result resultStruct) {
		w := w
		defer w.Done()
		p := p
		key := key
		if result.success {
			p.Append(key, true)
			if p.store.Installer != nil && result.value != nil && result.value.Status == PackageResolutionStatusSuccess {
				p.store.Installer.Enqueue(result.value)
			}
			atomic.AddUint64(&p.PackageCount, 1)
		} else {
			p.Append(key, false)
			atomic.AddUint64(&p.ErrorPackageCount, 1)
		}
	})

	if isNew {
		s.Logger.Debug("Enqueue package.json", zap.String("name", name), zap.String("version", version))

		s.PackageJSONWorkers.Submit(func() {
			key := key
			name := name
			protocol := protocol
			version := version
			parentName := parentName

			// broadcaster.L.Lock()

			p := p
			s := s
			res, err := s.FetchPackageJSON(name, version, parentName, protocol)

			if err == nil {
				p.FetchDependencies(res, false)
				s.Emitter.Publish(key, resultStruct{value: res, success: true})

			} else {
				s.Emitter.Publish(key, errorStruct)
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

			s.FetchPackageMetadata(name, parentName)
			// prevent stack overflow
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
	Version := make([]string, len(p.Version), to)
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

type Slice struct {
	sort.Interface

	Others        [][]string
	Bares         []BareField
	ExportLengths []uint
}

func (s Slice) Swap(i, j int) {
	s.Interface.Swap(i, j)
	for _, other := range s.Others {
		other[i], other[j] = other[j], other[i]
	}
	s.Bares[i], s.Bares[j] = s.Bares[j], s.Bares[i]
	s.ExportLengths[i], s.ExportLengths[j] = s.ExportLengths[j], s.ExportLengths[i]
}

func (s *PackageFlatPack) appendDependencies(pkg *JavascriptPackageManifestPartial) JavascriptPackageManifest {
	keysList := make(sort.StringSlice, 0, len(s.packageKeys))
	for key, v := range s.packageKeys {
		if v {
			keysList = append(keysList, key)
		}
	}

	keysList.Sort()

	count := len(keysList)
	keysIndex := make(map[string]uint, count)
	for i, key := range keysList {
		keysIndex[key] = uint(i)
	}

	full := JavascriptPackageManifest{
		Count:    uint(s.PackageCount),
		Provider: PackageProviderNpm,
		Name:     make([]string, count),
		Version:  make([]string, count),
		ExportsManifest: ExportsManifest{
			Bare:        make([]string, count),
			Source:      make([]string, 0, s.PackageCount*4),
			Destination: make([]string, 0, s.PackageCount*4),
			BareField:   make([]BareField, count),
		},
		ExportsManifestIndex: make([]uint, count*2),
		Dependencies:         make([]uint, 0, s.PackageCount+s.ErrorPackageCount),
		DependencyIndex:      make([]uint, count),
	}

	// var dependencyI uint
	// var dependencyIndexer = make(map[string]uint, s.PackageCount)
	var manifest *JavascriptPackageManifestPartial
	var manifestExists bool

	var exportI uint
	// var depExists bool
	for key, index := range keysIndex {
		// s.packageKeys.Range(func(key string, value bool) bool {

		manifest, manifestExists = s.store.Manifests.GetKey(key)
		if manifestExists {
			full.ExportsManifest.Bare[index] = manifest.ExportsManifest.Bare
			full.ExportsManifest.BareField[index] = manifest.ExportsManifest.BareField
			full.DependencyIndex[index] = uint(len(manifest.DependencyNames) + len(manifest.PeerDependencyNames))
			exportI = index * 2
			full.ExportsManifestIndex[exportI] = uint(len(full.ExportsManifest.Source))
			exportI++
			full.ExportsManifestIndex[exportI] = uint(len(manifest.ExportsManifest.Destination))

			full.ExportsManifest.Destination = append(full.ExportsManifest.Destination, manifest.ExportsManifest.Destination...)
			full.ExportsManifest.Source = append(full.ExportsManifest.Source, manifest.ExportsManifest.Source...)
			full.Name[index] = manifest.Name
			full.Version[index] = manifest.Version.Tag

			addedDepsCount := uint(0)
			for i, depName := range manifest.DependencyNames {
				depVersion := manifest.DependencyVersions[i]
				depKey := NewPackageManifestKey(depName, depVersion)
				length := len(depVersion)

				if NewVersionRange(depVersion, length) != VersionRangeExact {
					aliasKey, ok := s.store.Aliases.Get(NewPackageManifestKey(depName, depVersion))
					if ok {
						depKey = NewPackageManifestKey(depName, aliasKey)
					}
				}

				depIndex, ok := keysIndex[depKey]

				if ok {
					full.Dependencies = append(full.Dependencies, depIndex)
					addedDepsCount++
				}
			}

			for i, depName := range manifest.PeerDependencyNames {
				depVersion := manifest.PeerDependencyVersions[i]
				depKey := NewPackageManifestKey(depName, depVersion)
				length := len(depVersion)

				if NewVersionRange(depVersion, length) != VersionRangeExact {
					aliasKey, ok := s.store.Aliases.Get(NewPackageManifestKey(depName, depVersion))
					if ok {
						depKey = NewPackageManifestKey(depName, aliasKey)
					}
				}

				depIndex, ok := keysIndex[depKey]

				if ok {
					full.Dependencies = append(full.Dependencies, depIndex)
					addedDepsCount++
				}
			}
			full.DependencyIndex[index] = addedDepsCount
		} else {
			s.Logger.Sugar().Warnf("Expected %s to exist", key)
		}
	}

	// return true
	// })

	full.Count = uint(count)

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

func (store *PackageManifestStore) FetchPackageJSON(name string, version string, parentName string, protocol PackageVersionProtocol) (*JavascriptPackageManifestPartial, error) {
	switch protocol {
	case PackageVersionProtocolGithubBare, PackageVersionProtocolGithubDotCom, PackageVersionProtocolGithubTarball, PackageVersionProtocolGithubOwnerRepo:
		{
			uri, _ := protocol.ExtractJSDelivrGithubPackageJSONURL(version)
			return store.fetchFromGithub(name, version, parentName, uri)
		}

	}

	return store.fetchFromNPM(name, version, parentName)
}
