const { build, serve } = require("esbuild");
const path = require("path");
const handler = require("serve-handler");
const http = require("http");
const fs = require("fs");
const util = require("util");
const cacheManifestPlugin = require("./src/cacheManifestPlugin");
const rm = util.promisify(fs.rm);

if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = "development";
}

const BUILD_FOLDER = process.env.NODE_ENV === "development" ? "dist" : "prod";
const port = parseInt(String(process.env.PORT || 8029), 10);
const builds = [];

const baseBuildConfig = {
  bundle: true,
  platform: "browser",
  format: "esm",
  minifySyntax: true,
  outdir: path.join(__dirname, BUILD_FOLDER),
  publicPath: (process.env.PUBLIC_PATH ?? "") + "/_dev_/",
  outbase: "src",
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
  const inline = await build({
    ...baseBuildConfig,
    entryPoints: ["./src/_dev_/requestPermissionRunner.inlinejs"],
    loader: {
      ...baseBuildConfig.loader,
      ".inlinejs": "ts",
    },
    metafile: true,
    outExtension: { ".js": ".jsfile" },
    // watch: false,
  });
  builds.push(inline);
  console.log("Built worker");
}

async function buildSharedWorker() {
  await buildInlineJS();
  const workers = await build({
    ...baseBuildConfig,
    entryPoints: ["./src/_dev_/worker.tsx", "./src/_dev_/ServiceWorker.ts"],
    loader: {
      ...baseBuildConfig.loader,
    },
    outExtension: { ".js": ".jsurl" },
    metafile: true,
    // watch: false,
  });
  builds.push(workers);
  console.log("Built worker");
}

async function buildServiceWorker() {
  await build({
    ...baseBuildConfig,
    entryPoints: ["./src/_dev_/service-worker.ts"],
    loader: {
      ...baseBuildConfig.loader,
      ".css": "text",
      ".json": "json",
    },
    outExtension: { ".js": ".js" },
    outdir: undefined,
    outfile: path.join(__dirname, BUILD_FOLDER, "service-worker.js"),
    plugins: [cacheManifestPlugin(builds)],
    // watch: false,
  });
}

async function start() {
  await rm(path.join(__dirname, BUILD_FOLDER), {
    force: true,
    recursive: true,
  });
  await fs.promises.mkdir(path.join(__dirname, BUILD_FOLDER));
  await fs.promises.mkdir(path.join(__dirname, `${BUILD_FOLDER}/_dev_`));
  await fs.promises.copyFile(
    path.join(__dirname, "src", "_dev_", "index.html"),
    path.join(__dirname, BUILD_FOLDER, "_dev_", "index.html")
  );
  await fs.promises.copyFile(
    path.join(__dirname, "src", "_dev_", "favicon.png"),
    path.join(__dirname, BUILD_FOLDER, "_dev_", "favicon.png")
  );
  await fs.promises.copyFile(
    path.join(__dirname, "src", "_dev_", "setup.html"),
    path.join(__dirname, BUILD_FOLDER, "_dev_", "setup.html")
  );
  await fs.promises.copyFile(
    path.join(__dirname, "src", "_dev_", "manifest.json"),
    path.join(__dirname, BUILD_FOLDER, "_dev_", "manifest.json")
  );

  if (process.env.NODE_ENV === "development") {
    fs.watch(
      path.join(__dirname, BUILD_FOLDER),
      { recursive: true, persistent: true, encoding: "utf-8" },
      (event, name) => {
        if (name.includes("_dev_")) return;

        if (name.includes(".wasm") || name.includes(".jsurl")) {
          fs.copyFile(
            path.resolve(__dirname, BUILD_FOLDER, name),
            path.join(__dirname, BUILD_FOLDER, "_dev_", name),
            (a) => console.log(`Copied ${name}`)
          );
        }
      }
    );
  }

  await buildSharedWorker();

  if (process.env.NODE_ENV === "development") {
    const service = await build({
      ...baseBuildConfig,
      entryPoints: [
        path.join(__dirname, "src", "_dev_", "setup.tsx"),
        path.join(__dirname, "src", "_dev_", "index.tsx"),
        path.join(__dirname, "src", "_dev_", "ErrorPage.css"),
      ],
      metafile: true,
    });
    builds.push(service);

    await buildServiceWorker();

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
        path.join(__dirname, "src", "_dev_", "setup.tsx"),
        path.join(__dirname, "src", "_dev_", "index.tsx"),
      ],
      metafile: true,
    });

    for (let name of fs.readdirSync(path.join(__dirname, BUILD_FOLDER))) {
      if (name.includes(".wasm") || name.includes(".jsurl")) {
        fs.copyFileSync(
          path.resolve(__dirname, BUILD_FOLDER, name),
          path.join(__dirname, BUILD_FOLDER, "_dev_", name)
        );
      }
    }

    await buildServiceWorker();

    console.log("Finished.", builder);
  }
}

start();
