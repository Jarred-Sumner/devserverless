const { build, serve } = require("esbuild");
const path = require("path");
const handler = require("serve-handler");
const http = require("http");
const fs = require("fs");
const util = require("util");

const rm = util.promisify(fs.rm);

if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = "development";
}

const port = parseInt(String(process.env.PORT || 8029), 10);

const baseBuildConfig = {
  bundle: true,
  platform: "browser",
  format: "esm",
  minifySyntax: true,
  publicPath: process.env.PUBLIC_PATH || `http://localhost:${port}`,
  loader: {
    ".jsfile": "text",
    ".jsurl": "file",
    ".html": "file",
    ".wasm": "file",
    ".json": "text",
  },
  sourcemap: "both",
  define: {
    "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
  },
};

if (process.env.NODE_ENV === "development") {
  baseBuildConfig.incremental = true;
  baseBuildConfig.watch = true;
}

async function buildInlineJS() {
  await build({
    ...baseBuildConfig,
    entryPoints: ["./src/lib/requestPermissionRunner.inlinejs"],
    loader: {
      ...baseBuildConfig.loader,
      ".inlinejs": "ts",
    },
    outdir: path.join(__dirname, "dist"),
    outExtension: { ".js": ".jsfile" },
    // watch: false,
  });
  console.log("Built worker");
}

async function buildSharedWorker() {
  await buildInlineJS();
  await build({
    ...baseBuildConfig,
    entryPoints: ["./src/lib/worker.tsx", "./src/ServiceWorker.ts"],
    loader: {
      ...baseBuildConfig.loader,
      ".css": "text",
    },
    outdir: path.join(__dirname, "dist"),
    outExtension: { ".js": ".jsurl" },
    // watch: false,
  });
  console.log("Built worker");
}

async function buildHtmlLoader() {
  await build({
    ...baseBuildConfig,
    entryPoints: ["./src/htmlLoader.ts"],
    outfile: "dist/htmlLoader.jsfile",
    // watch: false,
  });
  console.log("Built html loader");
}

async function start() {
  await rm(path.join(__dirname, "dist"), { force: true, recursive: true });
  await fs.promises.mkdir(path.join(__dirname, "dist"));
  await fs.promises.copyFile(
    path.join(__dirname, "src", "index.html"),
    path.join(__dirname, "dist", "index.html")
  );
  await fs.promises.copyFile(
    path.join(__dirname, "src", "[code].html"),
    path.join(__dirname, "dist", "[code].html")
  );
  await fs.promises.copyFile(
    path.join(__dirname, "src", "manifest.json"),
    path.join(__dirname, "dist", "manifest.json")
  );
  await buildHtmlLoader();
  await buildSharedWorker();

  if (process.env.NODE_ENV === "development") {
    const service = await build({
      ...baseBuildConfig,
      entryPoints: [
        path.join(__dirname, "src", "service-worker.ts"),
        path.join(__dirname, "src", "pages/[code].tsx"),
        path.join(__dirname, "src", "pages/index.tsx"),
      ],
      outdir: path.join(__dirname, "dist"),
      metafile: "./meta.json",
    });

    const server = http.createServer((request, response) => {
      // You pass two more arguments for config and middleware
      // More details here: https://github.com/vercel/serve-handler#options
      return handler(request, response, {
        public: "./dist",
        directoryListing: true,
        headers: [
          {
            source: "**/*.jsurl",
            headers: [
              {
                key: "Content-Type",
                value: "application/javascript",
              },
            ],
          },
        ],
      });
    });

    process.on("beforeExit", () => server.close());

    server.listen(port, () => {
      console.log(`Running at http://localhost:${port}`);
    });
  } else {
    const builder = await build({
      ...baseBuildConfig,
      entryPoints: [
        "./src/lib/worker.tsx",
        "./src/service-worker.ts",
        "./src/pages/[code].tsx",
        "./src/pages/index.tsx",
      ],
      outdir: path.join(__dirname, "dist"),
      bundle: true,
      platform: "browser",
      publicPath: process.env.PUBLIC_PATH || "http://localhost:6000",
      sourcemap: "both",
    });
    console.log("Finished.", builder);
  }
}

start();
