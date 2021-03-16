package server

import (
	"fmt"
	"strconv"

	"github.com/fasthttp/router"
	"github.com/valyala/fasthttp"
)

func Index(ctx *fasthttp.RequestCtx) {
	ctx.WriteString("Welcome!")
}

func Hello(ctx *fasthttp.RequestCtx) {
	fmt.Fprintf(ctx, "Hello, %s!\n", ctx.UserValue("name"))
}

func StartServer(port uint) error {
	r := router.New()
	r.GET("/", Index)
	r.GET("/hello/{name}", Hello)

	return fasthttp.ListenAndServe(":"+strconv.FormatUint(uint64(port), 10), r.Handler)
}
