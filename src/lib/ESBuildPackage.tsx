import { build } from "esbuild-wasm";
import type {
  Location,
  Plugin,
  BuildResult,
  OnLoadArgs,
  OnLoadResult,
  OnResolveArgs,
  OnResolveResult,
} from "esbuild-wasm";
import Mime from "mime/lite";
import path from "path-browserify";
import { generateHTML } from "src/htmlGenerator";
import { Database } from "src/lib/Database";
import { PackageJSON } from "src/lib/PackageJSON";
import { Route } from "src/lib/Route";
import { NativeFS } from "src/lib/router/fs-native";
import type { OutputParams } from "src/lib/rpc";
import { ErrorCode } from "./ErrorCode";
import { getCache } from "./getCache";
import { DomUtils, Parser } from "htmlparser2";
import { bootstrap } from "src/lib/bootstrapper";
import { Text } from "domhandler/lib/node";

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
      const dest = globalThis.location.origin + file.path;
      const headers = new Headers();
      headers.set("Content-Length", file.contents.byteLength.toString(10));
      headers.set("Content-Type", Mime.getType(file.path).toString());
      await cache.put(
        dest,
        new Response(
          new Blob([file.text], {
            type: Mime.getType(file.path) as string,
          }),
          { headers }
        )
      );
      outResults[i++] = dest;
    }

    return { entryPoints: outResults };
  }

  generateRelativePath() {
    return "/";
  }

  async build(route: Route) {
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
      publicPath: ESBuildPackage.origin + this.relativePath,
      plugins: [this.asPlugin()],
      write: false,
      splitting: true,
      loader: this.pkg.esbuild.loader
        ? this.pkg.esbuild.loader
        : {
            ".js": "jsx",
            ".ts": "tsx",
            ".tsx": "tsx",
          },
      absWorkingDir: this.relativePath,
      nodePaths: ["/node_modules"],
      outdir: this.relativePath,
      bundle: true,
    };

    try {
      result = await build(config);
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

  resolveFile = async (opts: OnResolveArgs): Promise<OnResolveResult> => {
    verbose("[Resolve]", opts);

    const components = opts.path.split("/");
    const pkgName = components[0];

    if (this.pkg.allDependencies.has(pkgName)) {
      let file =
        components.length > 1 ? `/${components.slice(1).join("/")}` : "";
      return {
        path: `https://jspm.dev/${this.pkg.allDependencies.get(
          pkgName
        )}${file}`,
        external: true,
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
    if (!doesExist && path.extname(resolvedPath) === "") {
      let origPath = resolvedPath;
      for (let extension of this.textExtensionsToTry) {
        resolvedPath = origPath + extension;
        if (await this.root.exists(resolvedPath)) {
          return {
            path: resolvedPath,
            external: false,
          };
        }
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
    };
  };

  loadFile = async (opts: OnLoadArgs): Promise<OnLoadResult> => {
    verbose("[Load]", opts);

    // Use static folder for files
    if (
      opts.namespace === "file" ||
      Mime.getType(path.extname(opts.path))?.includes("image")
    ) {
      return {
        contents: new Uint8Array(await this.root.readFileBinary(opts.path)),
        loader: "default",
      };
    }

    return {
      contents: await this.root.readFileText(opts.path),

      // resolveDir: path.dirname(opts.path),
      loader: "default",
    };
  };

  asPlugin() {
    const resolveFile = this.resolveFile;
    const loadFile = this.loadFile;
    return {
      name: ESBuildPackage.pluginName,
      setup(build) {
        build.onResolve({ filter: /.*/ }, resolveFile);
        build.onLoad({ filter: /.*/ }, loadFile);
      },
    } as Plugin;
  }
}
