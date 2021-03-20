import { Text } from "domhandler/lib/node";
import { ImportKind } from "esbuild";
import type {
  BuildResult,
  Location,
  OnLoadArgs,
  OnLoadResult,
  OnResolveArgs,
  OnResolveResult,
  Plugin,
} from "esbuild-wasm";
import * as esbuild from "esbuild-wasm";
import { DomUtils } from "htmlparser2";
import Mime from "mime/lite";
import path from "path-browserify";
import { bootstrap } from "src/lib/bootstrapper";
import { PackageJSON } from "src/lib/PackageJSON";
import { Route } from "src/lib/Route";
import { NativeFS } from "src/lib/router/fs-native";
import type { OutputParams } from "src/lib/rpc";
import { render as renderSVG } from "svgj";
import { ErrorCode } from "./ErrorCode";
import { getCache } from "./getCache";

const REACT_IMPORT_REGEX = /['"]react['"]/;
const TSX_EXTENSIONS = [".tsx", ".js", ".jsx", ".mjs", ".ts"];

function getModuleName(path: string) {
  if (path[0] === "@") {
    const namespacedName = path.indexOf("/") + 1;

    let end = path.indexOf("/", namespacedName);

    if (end === -1) {
      return path;
    }

    return path.substring(0, end);
  } else {
    const end = path.indexOf("/");
    if (end > -1) {
      return path.substring(0, end);
    } else {
      return path;
    }
  }
}

const DEFAULT_LOADERS = {
  ".jsx": "jsx",
  ".js": "jsx",
  ".ts": "tsx",
  ".tsx": "js",
  ".mjs": "js",
  ".cjs": "js",
  ".css": "css",
};

// const CSS_LOADERS = {

// }

const DEFAULT_NAMESPACES = {
  ".svg": "local-binary",
  ".png": "local-url",
  ".jpg": "local-url",
  ".jpeg": "local-url",
  ".tiff": "local-url",
  ".bmp": "local-url",
  ".pdf": "local-url",
};

const jsHost = "cdn.skypack.dev/";
// const jsHost = "jspm.dev/npm:";
const cssHost = "cdn.jsdelivr.net/npm/";
const TRY_TO_USE_NODE_MODULES = false;

const verbose = process.env.VERBOSE ? console.log : (...a) => {};

function isValidEntryPoint(point: string) {
  return (
    point.endsWith(".js") ||
    point.endsWith(".jsx") ||
    point.endsWith(".ts") ||
    point.endsWith(".tsx") ||
    point.endsWith(".mjs") ||
    point.endsWith(".css")
  );
}

export class PackagerError extends Error {
  build?: ESBuildPackage;
  constructor(code: ErrorCode, ...args) {
    super(...args);
    this.code = code;
  }
  static with(code: ErrorCode, error: Error) {
    const packager = new PackagerError(code);
    Object.assign(packager, error);
    return packager;
  }
  code: ErrorCode;
}

export class PackagerPermissionError extends PackagerError {
  directoryName: string;
}

export class ESBuildPackage {
  root: NativeFS;
  pkg: PackageJSON;

  constructor(root: NativeFS, pkg: PackageJSON) {
    this.root = root;
    this.pkg = pkg;
  }

  extensionsToTry = [
    ".js",
    ".ts",
    ".tsx",
    ".jsx",
    ".css",
    ".png",
    ".jpg",
    ".webp",
  ];

  textExtensionsToTry = [".js", ".ts", ".tsx", ".jsx", ".css"];
  binaryExtensionsToTry = [".png", ".jpg", ".webp"];
  async resolve(
    _path: string,
    importer: string,
    resolveDir: string,
    canRetry = true
  ) {
    if (_path.includes("//")) {
      _path = _path.replace(/\/+/gm, "/");
    }

    const fs = this.root;
    if (await fs.exists(_path)) {
      return _path;
    }

    if (importer && !_path.startsWith("/")) {
      _path = path.normalize(path.join(path.dirname(importer), "../", _path));

      if (await fs.exists(_path)) {
        return _path;
      }
    }

    let newPath = "";
    for (let ext of this.extensionsToTry) {
      newPath = _path + ext;

      if (await fs.exists(newPath)) {
        return newPath;
      }
    }

    if (importer && importer.startsWith("/") && canRetry) {
      return this.resolve(
        path.join(resolveDir, _path),
        importer,
        resolveDir,
        false
      );
    }
  }

  static pluginName = "devserverless";

  private emitResolveError({
    message,
    location,
    code,
    path,
    exception,
    namespace,
    external,
  }): OnResolveResult {
    return {
      pluginName: ESBuildPackage.pluginName,

      errors: [
        {
          text: message || exception?.toString() || "",
          detail: message && exception ? exception.toString() : "",
          location: location ? location : undefined,
        },
      ],
      path,
      external,
      namespace,
      pluginData: { code },
    };
  }

  alwaysRequestPermissions = false;
  static readonly permissionMode = { mode: "read" };
  relativePath: string;
  static origin: string;
  async saveResultToCache(result: BuildResult, route: Route) {
    let outResults: string[] = new Array(result.outputFiles.length);
    let i = 0;
    const cache = await getCache();
    for (let file of result.outputFiles) {
      const mime = Mime.getType(file.path);

      const dest = globalThis.location.origin + file.path;
      const headers = new Headers();
      if (mime) headers.set("Content-Type", mime.toString());

      if (mime === "image/svg+xml") {
        const _file = await this.root.nativeFile(file.text);
        await cache.put(
          dest,
          new Response(_file, {
            headers,
            status: 200,
          })
        );
      } else {
        headers.set("Content-Length", file.contents.byteLength.toString(10));

        await cache.put(
          dest,
          new Response(
            new Blob([file.contents], {
              type: mime,
            }),
            { headers }
          )
        );
      }

      outResults[i++] = dest;
    }

    return { entryPoints: outResults };
  }

  generateRelativePath() {
    return "/";
  }

  async build(route: Route, signal: AbortSignal) {
    this.relativePath = route.absWorkingDirectory;

    const tsconfigFile = await this.root.nativeFile("tsconfig.json");
    let tsconfig = undefined;
    if (tsconfigFile) {
      try {
        tsconfig = await tsconfigFile.text();
      } catch (exception) {
        const err = PackagerError.with(ErrorCode.invalidTSConfig, exception);
        err.build = this;
        throw err;
      }
    }

    const entryPoints = route.entryPoints;
    let result: BuildResult;
    const config = {
      ...this.pkg.esbuild,
      format: "esm",
      tsconfig,
      metafile: true,
      entryPoints,
      publicPath: location.origin,
      plugins: [this.asPlugin()],
      write: false,
      splitting: true,
      sourcemap: "external",
      define: {
        ...this.pkg.esbuild.define,
        "process.env.NODE_ENV": '"production"',
      },
      loader: this.pkg.esbuild.loader
        ? this.pkg.esbuild.loader
        : {
            ".js": "jsx",
            ".ts": "tsx",
            ".tsx": "tsx",
            ".svg": "file",
            ".png": "file",
            ".gif": "file",
            ".webp": "file",
            ".jpg": "file",
            ".jpeg": "file",
            ".tiff": "file",
            ".bmp": "file",
            ".pdf": "file",
          },
      absWorkingDir: this.relativePath,
      nodePaths: ["/node_modules"],
      outdir: this.relativePath,
      bundle: true,
      incremental: true,
    };

    try {
      result = await esbuild.build(config);
    } catch (e) {
      const err = PackagerError.with(ErrorCode.buildFailed, e);
      err.build = this;
      throw err;
    }

    const scripts = route.builder.scripts;
    for (let outputFile in result.metafile.outputs) {
      const file = result.metafile.outputs[outputFile];
      if (
        !result.metafile.outputs[outputFile].entryPoint ||
        path.extname(outputFile) !== ".js"
      ) {
        continue;
      }
      const entryPoint = route.resolveFrom(file.entryPoint);

      if (scripts.has(entryPoint)) {
        const script = scripts.get(entryPoint);
        const src = route.resolveEntryPoint(outputFile);
        const text = new Text(bootstrap(src));
        script.attribs["data-src"] = src;
        script.attribs["type"] = "module";
        delete script.attribs["src"];
        for (let i = 0; i < script.attributes.length; i++) {
          if (script.attributes[i].name === "src") {
            script.attributes.splice(i, 1);
            continue;
          }
        }
        DomUtils.appendChild(script, text);
      }
    }

    const html = route.renderToString(result, config);

    return {
      warnings: result.warnings,
      ...(await this.saveResultToCache(result, route)),
      html,
    } as OutputParams;
  }

  async getFileForLocation(location: Location) {
    return await this.root.nativeFile(location.file);
  }

  async _resolveFile(opts: OnResolveArgs): Promise<OnResolveResult> {
    if (opts.path.startsWith("data:")) {
      return {
        path: opts.path,
        external: true,
        // external,
        // namespace: external ? undefined : "remote",

        // namespace: "esbuild-pkg",
      };
    }

    const nodeModulesIndex = opts.path.indexOf("node_modules/");
    if (nodeModulesIndex > -1)
      opts.path = opts.path.substring(
        nodeModulesIndex + "node_modules/".length
      );

    const moduleName = getModuleName(opts.path);

    const isHTTP =
      opts.path.startsWith("https://") || opts.path.startsWith("http://");

    const ext = path.extname(opts.path).substring(1);
    const external =
      !ext || ext === "tsx" || ext === "jsx" || ext === "js" || ext === "ts";

    if ((opts.kind === "import-rule" || opts.kind === "url-token") && isHTTP) {
      return {
        path: opts.path,
        external: true,
        pluginData: { kind: opts.kind },
        // external,
        // namespace: external ? undefined : "remote",

        // namespace: "esbuild-pkg",
      };
    } else if (
      isHTTP &&
      (opts.kind === "import-statement" || opts.kind === "dynamic-import")
    ) {
      return {
        path: opts.path,
        namespace: "file",
        external: true,
        pluginData: { kind: opts.kind },
        // external,
        // namespace: external ? undefined : "remote",

        // namespace: "esbuild-pkg",
      };
    } else if (external && this.pkg.inputDependencies.has(moduleName)) {
      return {
        path: `https://${jsHost}${this.pkg.inputDependencies.get(
          moduleName
        )}${opts.path.substring(moduleName.length)}`,
        // namespace: "remote",
        external,
        namespace: "remote",
        // namespace: "esbuild-pkg",
      };
    } else if (!external && this.pkg.inputDependencies.has(moduleName)) {
      return {
        path: `https://${cssHost}${this.pkg.inputDependencies.get(
          moduleName
        )}${opts.path.substring(moduleName.length)}`,
        // namespace: "remote",
        external,
        namespace: "remote",
        // namespace: "esbuild-pkg",
      };
    } else if (opts.namespace === "remote" && external) {
      return {
        path: `https://${jsHost}/${opts.path}`,
        namespace: "remote",
        external,
        // namespace: external ? undefined : "remote",

        // namespace: "esbuild-pkg",
      };
    } else if (opts.namespace === "remote") {
      return {
        path: `https://${external ? jsHost : cssHost}/${opts.path}`,
        namespace: "remote",
        external,
        // namespace: external ? undefined : "remote",

        // namespace: "esbuild-pkg",
      };
    }

    let resolvedPath = path.join(opts.resolveDir, path.normalize(opts.path));

    if (!path.isAbsolute(resolvedPath) && opts.importer) {
      resolvedPath = path.join(resolvedPath, opts.importer);
    } else if (!path.isAbsolute(resolvedPath) && !opts.importer) {
      resolvedPath = path.join(resolvedPath, opts.importer);
    }

    let doesExist = await this.root.exists(resolvedPath);
    if (!doesExist && ext === "") {
      let origPath = resolvedPath;
      for (let extension of TSX_EXTENSIONS) {
        resolvedPath = origPath + extension;
        if (await this.root.exists(resolvedPath)) {
          return {
            path: resolvedPath,
            external: false,
            // loader:
          };
        }
      }

      if (await this.root.exists(origPath + ".svg")) {
        return {
          path: resolvedPath,
          external: false,
          // namespace: "svgj",
        };
      }
    }

    if (!doesExist) {
      return {
        errors: [
          {
            text: `404 - File not found: ${opts.path}`,
          },
        ],
      };
    }

    return {
      path: resolvedPath,
      external: false,
      // loader:
      // namespace: resolvedPath.endsWith(".svg") ? "svgj" : opts.namespace,
    };
  }

  async _loadRemote(opts: OnLoadArgs): Promise<OnLoadResult> {
    console.log("[Remote]", opts);

    switch (path.extname(opts.path)) {
      case ".png":
      case ".jpg":
      case ".jpeg":
      case ".gif":
      case ".webp":
      case ".mp4":
      case ".mov":
      case ".mkv":
      case ".tiff": {
        return {
          contents: new Uint8Array(
            await (
              (await caches.match(opts.path)) ||
              (await fetch(opts.path, {
                cache: "default",
                credentials: "omit",
                keepalive: true,
              }))
            ).arrayBuffer()
          ),

          // resolveDir: path.dirname(opts.path),
          loader: "file",
        };
      }
      default: {
        return {
          contents: new Uint8Array(
            await (
              (await caches.match(opts.path)) ||
              (await fetch(opts.path, {
                cache: "default",
                credentials: "omit",
                keepalive: true,
              }))
            ).arrayBuffer()
          ),

          // resolveDir: path.dirname(opts.path),
          loader: DEFAULT_LOADERS[path.extname(opts.path)] || "tsx",
        };
      }
    }
  }

  async _loadFile(opts: OnLoadArgs): Promise<OnLoadResult> {
    verbose("[Load]", opts);
    if (opts.path.startsWith("data:")) {
      return {
        contents: opts.path,

        // resolveDir: path.dirname(opts.path),
        loader: "base64",
      };
    }

    const file = await this.root.nativeFile(opts.path);
    const ext = path.extname(file.name);
    const kind: ImportKind = opts.pluginData?.kind;

    switch (ext) {
      case ".svg": {
        if (kind === "dynamic-import" || kind === "import-statement") {
          return {
            contents: renderSVG(
              await file.text(),
              "ReactComponent",
              "* as React",
              `https://${jsHost}${this.pkg.inputDependencies.get("react")}`
            ),
            loader: "jsx",
          };
        } else {
          return {
            contents: opts.path,
            loader: "file",
          };
        }

        break;
      }

      case "":
      case ".":
      case ".mjs":
      case ".js":
      case ".jsx":
      case ".ts":
      case ".tsx": {
        let contents = await file.text();
        if (
          contents.includes("<") &&
          (!REACT_IMPORT_REGEX.test(contents) || !contents.includes("React"))
        ) {
          contents = `import * as React from "react";\n${contents}`;
        }

        return {
          contents,

          // resolveDir: path.dirname(opts.path),
          loader: "default",
        };

        break;
      }

      case ".css":
      case ".json": {
        return {
          contents: new Uint8Array(await file.arrayBuffer()),
          loader: "default",
        };
        break;
      }

      default: {
        return {
          contents: new Uint8Array(await file.arrayBuffer()),
          loader: "file",
        };
        break;
      }
    }
  }

  async _loadSVGFile(opts: OnLoadArgs): Promise<OnLoadResult> {
    return {
      contents: renderSVG(await this.root.readFileText(opts.path)),
      loader: "jsx",
    };
  }
  resolveFile = (opts: OnResolveArgs) => this._resolveFile(opts);
  loadFile = (opts: OnLoadArgs) => this._loadFile(opts);
  loadRemote = (opts: OnLoadArgs) => this._loadRemote(opts);
  loadSVGFile = (opts: OnLoadArgs) => this._loadSVGFile(opts);

  asPlugin() {
    const resolveFile = this.resolveFile;
    const loadFile = this.loadFile;
    const loadRemote = this.loadRemote;
    const loadSVGFile = this.loadSVGFile;
    return {
      name: ESBuildPackage.pluginName,
      setup(build) {
        build.onResolve({ filter: /.*/ }, resolveFile);
        build.onLoad({ filter: /.*/, namespace: "remote" }, loadRemote);
        build.onLoad({ filter: /.*/ }, loadFile);
        build.onLoad({ filter: /\.svg$/, namespace: "svgj" }, loadSVGFile);
      },
    } as Plugin;
  }
}
