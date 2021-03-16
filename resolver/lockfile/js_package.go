package lockfile

import (
	"context"
	"errors"
	"fmt"
	"sync"
	"time"

	"github.com/blang/semver/v4"
	"github.com/jarred-sumner/devserverless/resolver/runner"
	"github.com/jarred-sumner/peechy/buffer"
	"github.com/valyala/bytebufferpool"
	"github.com/valyala/fasthttp"
	"go.uber.org/zap"
)

type PackageManifestCache interface {
	Get(name string, version string) (*JavascriptPackageManifestPartial, bool)
	Put(name string, version string, manifest *JavascriptPackageManifestPartial)
}

type PackageRangeCache interface {
	Has(name string, version string) bool
	Get(name string, version string) string
	Put(name string, version string, result string)
}

type JSDelivrPackageData struct {
	Tags     map[string]string `json:"tags"`
	Versions semver.Versions   `json:"versions"`
}

func (p *JSDelivrPackageData) satisfying(version string) {
	if len(p.Tags[version]) > 0 {
		version = p.Tags[version]
	}

	vr := NewVersionRange(version)
	version = vr.Trim(version)
	var semverRange semver.Range
	var parsedVersion semver.Version
	var err error

	switch vr {
	case VersionRangeCaret:
		{
			parsedVersion, err = semver.ParseTolerant(version)
			semverRange, err = semver.ParseRange(fmt.Sprintf(">= %d.%d.%d && < %d.0.0", parsedVersion.Major, parsedVersion.Minor, parsedVersion.Patch, parsedVersion.Major+1))
		}
	case VersionRangeTilda:
		{
			parsedVersion, err = semver.ParseTolerant(version)
			semverRange, err = semver.ParseRange(fmt.Sprintf(">= %d.%d.%d && < %d.0.0", parsedVersion.Major, parsedVersion.Minor, parsedVersion.Patch, parsedVersion.Major+1))
		}
	case VersionRangeComplex:
		{

		}

	case VersionRangeNone:
		{

		}
	}
}

type MemoryPackageManifestCache struct {
	Store *sync.Map
}

const packageFormatterKey = "%s@%s"

func NewPackageManifestKey(name string, version string) string {
	return fmt.Sprintf(packageFormatterKey, name, version)
}

func (i *MemoryPackageManifestCache) Get(name string, version string) (*JavascriptPackageManifestPartial, bool) {
	v, ok := i.Store.Load(NewPackageManifestKey(name, version))

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

	defer bytebufferpool.Put(buf.Bytes)

	i.Store.Store(NewPackageManifestKey(name, version), buf.Bytes.B)
}

type PackageManifestStore struct {
	Manifests PackageManifestCache
	Ranges    PackageRangeCache
	Logger    *zap.Logger
}

func NewMemoryPackageManifestStore() PackageManifestStore {
	manifest := MemoryPackageManifestCache{
		Store: &sync.Map{},
	}

	logger, _ := zap.NewDevelopment()

	return PackageManifestStore{
		Manifests: &manifest,
		Logger:    logger,
	}
}

const packageJsonFormatterString = "https://ga.jspm.io/npm:%s@%s/package.json"

func (s *PackageManifestStore) flattenDependencies(pkg *JavascriptPackageManifestPartial, parentCtx context.Context) ([]JavascriptPackageManifestPartial, error) {
	worker := runner.NewRunner(10)

	dependencies := make([]JavascriptPackageManifestPartial, len(pkg.DependencyNames)+len(pkg.DevDependencyNames)+len(pkg.PeerDependencyNames))

	logger := s.Logger.With(zap.String("rootPackage", pkg.Name))
	defer logger.Sync()

	var enqueue func(name string, version string, logger *zap.Logger)

	enqueue = func(name string, version string, logger *zap.Logger) {
		_, exists := s.Manifests.Get(name, version)
		if exists {
			return
		}

		key := NewPackageManifestKey(name, version)
		store := s
		fmt.Printf("Enqueue %s", key)

		newName := name
		newVersion := version

		worker.Run(string(key), func(r *runner.Runner) (interface{}, error) {
			return fetchDependency(newName, newVersion, store, logger, enqueue)
		})
	}

	ctx, cancel := context.WithTimeout(parentCtx, time.Duration(time.Second)*30)

	pkg.FetchDependencies(logger, enqueue)

	defer cancel()

	err := worker.Wait(ctx)
	if err != nil {
		fmt.Println("did not get all results:", err)
	}

	if pkg.DependencyNames != nil && len(pkg.DependencyNames) > 0 {
		for i, name := range pkg.DependencyNames {
			version := pkg.DependencyVersions[i]
			value, exists := s.Manifests.Get(name, version)
			if exists {
				dependencies = append(dependencies, *value)
			} else {
			}

		}
	}

	if pkg.DevDependencyNames != nil && len(pkg.DevDependencyNames) > 0 {
		for i, name := range pkg.DevDependencyNames {
			version := pkg.DevDependencyNames[i]
			value, exists := s.Manifests.Get(name, version)
			if exists {
				dependencies = append(dependencies, *value)
			}
		}
	}

	if pkg.PeerDependencyNames != nil && len(pkg.PeerDependencyNames) > 0 {
		for i, name := range pkg.PeerDependencyNames {
			version := pkg.PeerDependencyNames[i]
			value, exists := s.Manifests.Get(name, version)
			if exists {
				dependencies = append(dependencies, *value)
			}
		}
	}

	return dependencies, err
}

func (s *PackageManifestStore) ResolveDependencies(pkg *JavascriptPackageManifestPartial, parentCtx context.Context) ([]JavascriptPackageManifestPartial, error) {
	list, err := s.flattenDependencies(pkg, parentCtx)

	if err != nil {
		return nil, err
	}

	// Count := len(list)

	// manifest := JavascriptPackageManifest{
	// 	Count: Count,
	// 	Name:  make([]string),
	// }
	return list, err
}

func fetchDependency(name string, version string, store *PackageManifestStore, logger *zap.Logger, enqueue func(name string, version string, logger *zap.Logger)) (string, error) {
	req := fasthttp.AcquireRequest()
	resp := fasthttp.AcquireResponse()

	key := NewPackageManifestKey(name, version)

	defer fasthttp.ReleaseResponse(resp)
	defer fasthttp.ReleaseRequest(req)

	req.SetRequestURI(fmt.Sprintf(packageJsonFormatterString, name, version))
	var _logger *zap.Logger
	_logger = (*logger).With(zap.String("url", req.URI().String()), zap.String("name", name), zap.String("version", version))
	_logger.Info("GET Dependency")

	// log.Println(fmt.Sprintf(packageJsonFormatterString, name, version))
	var err error
	err = fasthttp.DoDeadline(req, resp, time.Now().Add(time.Second))
	statusCode := resp.StatusCode()
	_logger = _logger.With(zap.Int("statusCode", statusCode))

	if err != nil {
		_logger.Error("HTTP error", zap.Error(err))

		manifest := NewJavascriptPackageManifestWithError(name, version, PackageResolutionStatusInternal)
		store.Manifests.Put(name, version, &manifest)
		return string(key), err
	}

	switch statusCode {
	case 200:
		{
			var res JavascriptPackageManifestPartial
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
				manifest := NewJavascriptPackageManifestWithError(name, version, PackageResolutionStatusInternal)
				store.Manifests.Put(name, version, &manifest)
				return string(key), err
			}

			res, err = NewJavascriptPackageManifestPartial(&body, true)

			if err != nil {
				manifest := NewJavascriptPackageManifestWithError(name, version, PackageResolutionStatusInternal)
				store.Manifests.Put(name, version, &manifest)
				return string(key), err
			}

			store.Manifests.Put(name, version, &res)
			res.FetchDependencies(logger.With(zap.String("parent", name)), enqueue)
			_logger.Info("Success")
			return string(key), err
		}
	case 404:
		{
			err = errors.New(fmt.Sprintf("package \"%s\" : \"%s\" not found", name, version))
			_logger.Info("Fail")
			manifest := NewJavascriptPackageManifestWithError(name, version, PackageResolutionStatusNotFound)
			store.Manifests.Put(name, version, &manifest)
			return string(key), err
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
			manifest := NewJavascriptPackageManifestWithError(name, version, PackageResolutionStatusInternal)
			store.Manifests.Put(name, version, &manifest)
			return string(key), err
		}

	case 429:
		{
			err = errors.New("too many requests")
			manifest := NewJavascriptPackageManifestWithError(name, version, PackageResolutionStatusRateLimit)
			_logger.Info("Fail")
			store.Manifests.Put(name, version, &manifest)
			return string(key), err
		}

	default:
		{
			err = errors.New(fmt.Sprintf("error: status code %d", statusCode))
			manifest := NewJavascriptPackageManifestWithError(name, version, PackageResolutionStatusInternal)
			store.Manifests.Put(name, version, &manifest)
			_logger.Info("Fail")
			return string(key), err
		}
	}

	return string(key), err
}
