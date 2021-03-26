package server

import (
	"bytes"
	"errors"
	"fmt"
	"log"
	"strconv"

	jsoniter "github.com/json-iterator/go"
	"github.com/savsgio/atreugo/v11"
	"github.com/valyala/bytebufferpool"
	"go.uber.org/zap"

	"github.com/atreugo/cors"
	"github.com/jarred-sumner/devserverless/config"
	"github.com/jarred-sumner/devserverless/resolver/cache"
	"github.com/jarred-sumner/devserverless/resolver/lockfile"
	"github.com/jarred-sumner/peechy/buffer"
)

var AcceptEncodingBinary = []byte("application/vnd.package-peechy")
var AcceptEncodingJSON = []byte("application/json")

type Server struct {
	Store      *lockfile.PackageManifestStore
	LocalStore *cache.LocalPackageManifestStore

	HTTPServer *atreugo.Atreugo
}

func (state *Server) PackagePartial(ctx *atreugo.RequestCtx) error {
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

func Index(ctx *atreugo.RequestCtx) {
	ctx.WriteString("Welcome!")
}

func (state *Server) ResolvePartial(partial lockfile.JavascriptPackageManifestPartial, ctx *atreugo.RequestCtx, isBinary bool) error {
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

func (state *Server) ResolvePackage(name string, version string, ctx *atreugo.RequestCtx, isBinary bool) error {
	return state.ResolvePartial(lockfile.NewJavascriptPackageManifestPartialFromNameVersion(name, version, true), ctx, isBinary)
}

func (state *Server) NpmPackage(ctx *atreugo.RequestCtx) error {
	contentType := ctx.Request.Header.ContentType()
	isBinary := bytes.Equal(contentType, AcceptEncodingBinary)

	if bytes.Equal(contentType, AcceptEncodingJSON) || isBinary {
		return state.ResolvePackage(ctx.UserValue("name").(string), ctx.UserValue("packageVersion").(string), ctx, isBinary)
	} else {
		ctx.Error("Invalid Accept header", 400)
	}

	return nil
}

func (state *Server) NpmScopedPackage(ctx *atreugo.RequestCtx) error {
	contentType := ctx.Request.Header.ContentType()
	isBinary := bytes.Equal(contentType, AcceptEncodingBinary)

	if bytes.Equal(contentType, AcceptEncodingJSON) || isBinary {
		return state.ResolvePackage(fmt.Sprintf("%s@%s", ctx.UserValue("namespace").(string), ctx.UserValue("name").(string)), ctx.UserValue("packageVersion").(string), ctx, isBinary)
	} else {
		ctx.Error("Expected Content-Type to be \"application/json\" or \"application/vnd.package-peechy\"", 400)
	}

	return nil
}

func (state *Server) Launch(port uint) {
	switch config.Global.From {
	case config.CacheTypeLocal:
		{
			var err error
			state.LocalStore, err = cache.NewLocalPackageManifestStore(config.Global.Cache)
			state.Store = state.LocalStore.Store
			state.Store.RegistrarAPI = config.Global.Registrar

			if err != nil {
				state.Store.Logger.Fatal("Error starting", zap.Error(err))
				return
			}
			state.Store.Logger.Info("Started server with local cache "+"http://localhost:"+strconv.FormatUint(uint64(config.Global.Port), 10), zap.Uint("port", port))
			if err := state.StartServer(port); err != nil {
				state.Store.Logger.Fatal("Error in ListenAndServe: %s", zap.Error(err))
			}
		}
	case config.CacheTypeNone:
		{
			state.Store = cache.NewMemoryPackageManifestStore()
			state.Store.RegistrarAPI = config.Global.Registrar
			state.Store.Logger.Info("Started server with memory cache "+"http://localhost:"+strconv.FormatUint(uint64(config.Global.Port), 10), zap.Uint("port", port))
			if err := state.StartServer(port); err != nil {
				state.Store.Logger.Fatal("Error in ListenAndServe: %s", zap.Error(err))
			}
		}
	default:
		{
			log.Fatalf("Unsupported cache " + config.Global.Cache)
		}
	}
}

func (state Server) RunAutoFlusher(ctx *atreugo.RequestCtx) error {
	state.LocalStore.AutoFlush()
	return ctx.Next()
}

func (state *Server) StartServer(port uint) error {

	config := atreugo.Config{
		Addr:                 fmt.Sprintf("0.0.0.0:%d", port),
		Compress:             true,
		CloseOnShutdown:      true,
		Logger:               zap.NewStdLog(state.Store.Logger),
		NoDefaultContentType: true,
		Debug:                true,
	}

	state.HTTPServer = atreugo.New(config)

	state.HTTPServer.GET("/npm/{name}@{packageVersion}", state.NpmPackage)
	state.HTTPServer.GET("/npm/{namespace}@{name}/{packageVersion:*}", state.NpmPackage)
	state.HTTPServer.GET("/npm/{namespace}@{name}/{packageVersion:*}", state.NpmPackage)
	state.HTTPServer.POST("/pkg/{hash}", state.PackagePartial).UseAfter(state.RunAutoFlusher)

	state.HTTPServer.UseBefore(cors.New(cors.Config{
		AllowedOrigins:   []string{"*"},
		AllowedMethods:   []string{"GET", "POST", "OPTIONS", "HEAD"},
		AllowedHeaders:   []string{"X-Origin", "Content-Type"},
		AllowCredentials: false,
		AllowMaxAge:      1728000,
		ExposedHeaders:   []string{"Content-Type", "Content-Length", "X-Origin"},
	}))
	return state.HTTPServer.ListenAndServe()
}
