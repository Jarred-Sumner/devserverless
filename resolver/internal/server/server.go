package server

import (
	"bytes"
	"errors"
	"fmt"

	jsoniter "github.com/json-iterator/go"
	"github.com/savsgio/atreugo/v11"
	"github.com/valyala/bytebufferpool"
	"go.uber.org/zap"

	"github.com/jarred-sumner/devserverless/resolver/lockfile"
	"github.com/jarred-sumner/peechy/buffer"
)

var AcceptEncodingBinary = []byte("application/vnd.package-peechy")
var AcceptEncodingJSON = []byte("application/json")

type ServerState struct {
	Store *lockfile.PackageManifestStore
}

var state = ServerState{}

func Index(ctx *atreugo.RequestCtx) {
	ctx.WriteString("Welcome!")
}

func ResolvePartial(partial lockfile.JavascriptPackageManifestPartial, ctx *atreugo.RequestCtx, isBinary bool) error {
	manifest, err := state.Store.ResolveDependencies(&partial, ctx)

	var message *string
	if err != nil {
		temp := err.Error()
		message = &temp
	} else {
		message = nil
	}

	if manifest.Count == 0 {
		return ctx.ErrorResponse(errors.New("package not found"), 404)
	}

	if err != nil {

		return ctx.ErrorResponse(err, 400)
	}

	resp := lockfile.JavascriptPackageResponse{
		Name:    &partial.Name,
		Result:  &manifest,
		Message: message,
	}

	if isBinary {
		_buffer := bytebufferpool.Get()
		defer bytebufferpool.Put(_buffer)
		buffer := buffer.Buffer{
			Bytes:  _buffer,
			Offset: 0,
		}

		err := resp.Encode(&buffer)
		if err != nil {
			return ctx.ErrorResponse(err, 400)
		}
		ctx.Success(string(AcceptEncodingBinary), buffer.Slice())
	} else {
		bytes, err := jsoniter.Marshal(resp)
		if err != nil {
			return ctx.ErrorResponse(err, 400)
		} else {
			ctx.Success(string(AcceptEncodingJSON), bytes)
		}

	}

	return nil
}

func ResolvePackage(name string, version string, ctx *atreugo.RequestCtx, isBinary bool) error {
	return ResolvePartial(lockfile.NewJavascriptPackageManifestPartialFromNameVersion(name, version, true), ctx, isBinary)
}

func NpmPackage(ctx *atreugo.RequestCtx) error {
	contentType := ctx.Request.Header.ContentType()
	isBinary := bytes.Equal(contentType, AcceptEncodingBinary)

	if bytes.Equal(contentType, AcceptEncodingJSON) || isBinary {
		return ResolvePackage(ctx.UserValue("name").(string), ctx.UserValue("packageVersion").(string), ctx, isBinary)
	} else {
		ctx.Error("Invalid Accept header", 400)
	}

	return nil
}

func NpmScopedPackage(ctx *atreugo.RequestCtx) error {
	contentType := ctx.Request.Header.ContentType()
	isBinary := bytes.Equal(contentType, AcceptEncodingBinary)

	if bytes.Equal(contentType, AcceptEncodingJSON) || isBinary {
		return ResolvePackage(fmt.Sprintf("%s@%s", ctx.UserValue("namespace").(string), ctx.UserValue("name").(string)), ctx.UserValue("packageVersion").(string), ctx, isBinary)
	} else {
		ctx.Error("Expected Content-Type to be \"application/json\" or \"application/vnd.package-peechy\"", 400)
	}

	return nil
}

func PackagePartial(ctx *atreugo.RequestCtx) error {
	contentType := ctx.Request.Header.ContentType()
	isBinary := bytes.Equal(contentType, AcceptEncodingBinary)
	var err error
	var req lockfile.JavascriptPackageRequest
	var manifest lockfile.JavascriptPackageManifest
	if bytes.Equal(contentType, AcceptEncodingJSON) || isBinary {
		resp := lockfile.JavascriptPackageResponse{}
		if isBinary {
			decoder := buffer.Buffer{
				Bytes: &bytebufferpool.ByteBuffer{
					B: ctx.Request.Body(),
				},
			}

			req, err = lockfile.DecodeJavascriptPackageRequest(&decoder)

			encoder := buffer.Buffer{
				Bytes: bytebufferpool.Get(),
			}

			defer bytebufferpool.Put(encoder.Bytes)

			if err != nil || req.Manifest == nil {
				resp.Result = nil
				if req.Name != nil {
					resp.Name = req.Name
				}
				code := lockfile.ErrorCodeGeneric
				resp.ErrorCode = &code
				resp.Encode(&encoder)
				ctx.Write(encoder.Slice())
				ctx.SetStatusCode(400)
				return nil
			}

			manifest, err = state.Store.ResolveDependencies(req.Manifest, ctx)

			if err != nil {
				resp.Result = nil
				if req.Name != nil {
					resp.Name = req.Name
				}
				code := lockfile.ErrorCodeGeneric
				resp.ErrorCode = &code
				resp.Encode(&encoder)
				ctx.Write(encoder.Slice())
				ctx.SetStatusCode(400)
				return nil
			}

			resp.Result = &manifest
			resp.Encode(&encoder)
			ctx.Write(encoder.Slice())
			ctx.SetStatusCode(200)
		} else {

		}

	} else {
		ctx.Error("Expected Content-Type to be \"application/json\" or \"application/vnd.package-peechy\"", 400)
	}

	return nil
}

func StartServer(port uint, store *lockfile.PackageManifestStore) error {
	state.Store = store

	config := atreugo.Config{
		Addr:                 fmt.Sprintf("0.0.0.0:%d", port),
		Compress:             true,
		CloseOnShutdown:      true,
		Logger:               zap.NewStdLog(state.Store.Logger),
		NoDefaultContentType: true,
		Debug:                true,
	}

	server := atreugo.New(config)

	server.GET("/npm/{name}@{packageVersion}", NpmPackage)
	server.GET("/npm/{namespace}@{name}/{packageVersion:*}", NpmPackage)
	server.GET("/npm/{namespace}@{name}/{packageVersion:*}", NpmPackage)
	server.POST("/pkg/{hash}", PackagePartial)

	return server.ListenAndServe()
}
