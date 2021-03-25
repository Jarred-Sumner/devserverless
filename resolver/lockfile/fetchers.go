package lockfile

import (
	"errors"
	"fmt"
	"time"

	"github.com/jarred-sumner/devserverless/config"
	"github.com/valyala/fasthttp"
	"go.uber.org/zap"
)

func (store *PackageManifestStore) fetchFromNPM(name string, version string, parentName string) (*JavascriptPackageManifestPartial, error) {
	_req := fasthttp.AcquireRequest()
	_resp := fasthttp.AcquireResponse()

	defer fasthttp.ReleaseResponse(_resp)
	defer fasthttp.ReleaseRequest(_req)
	req := _req
	resp := _resp

	req.SetRequestURI(store.RegistrarAPI.PackageJSON(name, version))
	var _logger *zap.Logger
	_logger = store.Logger.With(zap.String("url", req.URI().String()), zap.String("name", name), zap.String("version", version), zap.String("parent", parentName))
	_logger.Info("GET Dependency")

	// log.Println(fmt.Sprintf(packageJsonFormatterString, name, version))
	var err error
	err = store.NPMClient.DoDeadline(req, resp, time.Now().Add(time.Minute))
	statusCode := resp.StatusCode()
	var loc string
	if statusCode == 302 || statusCode == 301 {
		loc = string(resp.Header.Peek("Location"))
		if len(loc) > 0 {
			_req := fasthttp.AcquireRequest()
			uri := fasthttp.AcquireURI()
			uri.Update(store.RegistrarAPI.PackageJSON(name, version))
			uri.Update(loc)
			_req.SetRequestURI(uri.String())
			fasthttp.ReleaseURI(uri)
			defer fasthttp.ReleaseRequest(_req)
			defer fasthttp.ReleaseResponse(_resp)
			_resp = fasthttp.AcquireResponse()

			req = _req
			resp = _resp

			err = store.NPMClient.DoDeadline(_req, _resp, time.Now().Add(time.Minute))
			statusCode = resp.StatusCode()
		}
	}
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

			manifest, err = NewJavascriptPackageManifestPartial(&body, config.BLACKLIST_PACKAGES, false)

			if err != nil {
				manifest = NewJavascriptPackageManifestWithError(name, version, PackageResolutionStatusInternal)
				store.Manifests.Put(name, version, &manifest)
				return &manifest, err
			}

			store.Manifests.Put(name, version, &manifest)

			_logger.Debug("Success")
		}
	case 404:
		{
			err = errors.New(fmt.Sprintf("package \"%s\" : \"%s\" not found", name, version))
			_logger.Debug("Fail")
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
			_logger.Debug("Fail")
			manifest = NewJavascriptPackageManifestWithError(name, version, PackageResolutionStatusInternal)
			store.Manifests.Put(name, version, &manifest)
			return &manifest, err
		}

	case 429:
		{
			err = errors.New("too many requests")
			manifest = NewJavascriptPackageManifestWithError(name, version, PackageResolutionStatusRateLimit)
			_logger.Debug("Fail")
			store.Manifests.Put(name, version, &manifest)
			return &manifest, err
		}

	default:
		{
			err = errors.New(fmt.Sprintf("error: status code %d", statusCode))
			manifest = NewJavascriptPackageManifestWithError(name, version, PackageResolutionStatusInternal)
			store.Manifests.Put(name, version, &manifest)
			_logger.Debug("Fail")
			return &manifest, err
		}
	}

	return &manifest, err
}

func (store *PackageManifestStore) fetchFromGithub(name string, version string, parentName string, partialURL string) (*JavascriptPackageManifestPartial, error) {
	_req := fasthttp.AcquireRequest()
	_resp := fasthttp.AcquireResponse()

	defer fasthttp.ReleaseResponse(_resp)
	defer fasthttp.ReleaseRequest(_req)
	req := _req
	resp := _resp

	req.SetRequestURI(partialURL)
	var _logger *zap.Logger
	_logger = store.Logger.With(zap.String("url", req.URI().String()), zap.String("name", name), zap.String("version", version), zap.String("parent", parentName))
	_logger.Info("GET Dependency")

	// log.Println(fmt.Sprintf(packageJsonFormatterString, name, version))
	var err error
	err = store.NPMClient.DoDeadline(req, resp, time.Now().Add(time.Minute))
	statusCode := resp.StatusCode()
	var loc string
	if statusCode == 302 || statusCode == 301 {
		loc = string(resp.Header.Peek("Location"))
		if len(loc) > 0 {
			_req := fasthttp.AcquireRequest()
			uri := fasthttp.AcquireURI()
			uri.Update(store.RegistrarAPI.PackageJSON(name, version))
			uri.Update(loc)
			_req.SetRequestURI(uri.String())
			fasthttp.ReleaseURI(uri)
			defer fasthttp.ReleaseRequest(_req)
			defer fasthttp.ReleaseResponse(_resp)
			_resp = fasthttp.AcquireResponse()

			req = _req
			resp = _resp

			err = store.NPMClient.DoDeadline(_req, _resp, time.Now().Add(time.Minute))
			statusCode = resp.StatusCode()
		}
	}
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

			manifest, err = NewJavascriptPackageManifestPartial(&body, config.BLACKLIST_PACKAGES, false)

			if err != nil {
				manifest = NewJavascriptPackageManifestWithError(name, version, PackageResolutionStatusInternal)
				store.Manifests.Put(name, version, &manifest)
				return &manifest, err
			}

			store.Manifests.Put(name, version, &manifest)

			_logger.Debug("Success")
		}
	case 404:
		{
			err = errors.New(fmt.Sprintf("package \"%s\" : \"%s\" not found", name, version))
			_logger.Debug("Fail")
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
			_logger.Debug("Fail")
			manifest = NewJavascriptPackageManifestWithError(name, version, PackageResolutionStatusInternal)
			store.Manifests.Put(name, version, &manifest)
			return &manifest, err
		}

	case 429:
		{
			err = errors.New("too many requests")
			manifest = NewJavascriptPackageManifestWithError(name, version, PackageResolutionStatusRateLimit)
			_logger.Debug("Fail")
			store.Manifests.Put(name, version, &manifest)
			return &manifest, err
		}

	default:
		{
			err = errors.New(fmt.Sprintf("error: status code %d", statusCode))
			manifest = NewJavascriptPackageManifestWithError(name, version, PackageResolutionStatusInternal)
			store.Manifests.Put(name, version, &manifest)
			_logger.Debug("Fail")
			return &manifest, err
		}
	}

	return &manifest, err
}
