import {
  BuildOptions,
  BuildResult,
  OnLoadArgs,
  OnLoadResult,
  OnResolveArgs,
  OnResolveResult,
  Service,
} from "esbuild";
import { Location, Plugin } from "esbuild-wasm";
import Mime from "mime/lite";
import path from "path-browserify";
import semver from "semver";
import { generateHTML } from "src/htmlGenerator";
import { Database } from "src/lib/Database";
import type { OutputParams } from "src/lib/rpc";
import { ErrorCode } from "./ErrorCode";
import { getCache } from "./getCache";

const TRY_TO_USE_NODE_MODULES = false;

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

export interface PackageJSON {
  name: string;
  version: string;

  esbuild: Partial<BuildOptions>;
  dependencies: Object;
  devDependencies: Object;
  peerDependencies: Object;
  optionalDependencies: Object;
}

async function resolveFileHandle(
  name: string,
  handle: FileSystemDirectoryHandle
) {
  return await handle.getFileHandle(name);
}

export class ESBuildPackage {
  directory: FileSystemDirectoryHandle;
  package: PackageJSON;
  name: string;
  id: string;
  openedAt: Date;
  packageHandle: FileSystemFileHandle;
  constructor(directory: FileSystemDirectoryHandle) {
    this.directory = directory;
  }

  async resolveMain(moduleId: string, relative: string) {
    const moduleBase = path.join(relative, "node_modules", moduleId);
    const pkg = this.dirMap.get(path.join(moduleBase, "package.json"));

    const json = JSON.parse(await (await pkg.getFile()).text());
    if (json.browser) {
      return path.join(moduleBase, json.browser);
    } else if (json.module) {
      return path.join(moduleBase, json.module);
    } else if (json.main) {
      return path.join(moduleBase, json.main);
    } else {
      return path.join(moduleBase, "index.js");
    }
  }

  dirMap = new Map<string, FileSystemHandle>();
  private async resolveDir(
    handle: FileSystemDirectoryHandle,
    parentName: string,
    isFirst = false
  ) {
    for await (const entry of handle.values()) {
      switch (entry.kind) {
        case "directory": {
          await this.resolveDir(
            entry,
            isFirst ? parentName : path.join(parentName, handle.name)
          );

          if (!TRY_TO_USE_NODE_MODULES) {
            if (entry.name === "node_modules") {
              continue;
            }
          }
          break;
        }

        case "file": {
          const abs = path.join(
            parentName,
            isFirst ? "" : handle.name,
            entry.name
          );

          const rel = path.relative(this.staticRoot, abs);
          if (rel && !rel.startsWith("..") && !path.isAbsolute(rel)) {
            if (Mime.getType(abs)?.includes("html")) {
              this.staticContent.set(rel, entry);
            }
          } else {
            this.dirMap.set(abs, entry);
          }

          if (TRY_TO_USE_NODE_MODULES) {
            if (abs.includes("node_modules")) {
              this.dirMap.set(abs.replace("/node_modules", ""), entry);
            }
          }

          break;
        }
      }
    }

    this.dirMap.set(path.join(parentName, isFirst ? "" : handle.name), handle);
  }
  dependencyKeys = [
    "dependencies",
    "optionalDependencies",
    "peerDependencies",
    "devDependencies",
  ];

  dependencyPaths = new Map<string, string>();
  dependencyNames = new Map<string, string>();

  async buildFileTree() {
    await this.resolveDir(this.directory, "/", true);

    if (TRY_TO_USE_NODE_MODULES) {
      for (let key of this.dependencyKeys) {
        if (this.package[key]) {
          for (let moduleId in this.package[key]) {
            const main = await this.resolveMain(moduleId, "/");
            if (this.dirMap.has(main)) {
              this.dependencyPaths.set(moduleId, main);
            }
          }
        }
      }
    } else {
      for (let key of this.dependencyKeys) {
        if (this.package[key]) {
          for (let moduleId in this.package[key]) {
            let version = this.package[key][moduleId].replace(/\^/gm, "");
            if (version === null) {
              this.dependencyNames.set(moduleId, `${moduleId}`);
            } else {
              this.dependencyNames.set(
                moduleId,
                `${moduleId}@${semver.clean(version, false)}`
              );
            }
          }
        }
      }
    }
  }
  allDependencies = new Map<string, string>();

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
    if (this.dirMap.has(_path)) {
      return _path;
    }

    if (importer && !_path.startsWith("/")) {
      _path = path.normalize(path.join(path.dirname(importer), "../", _path));
      if (this.dirMap.has(_path)) {
        return _path;
      }
    }

    let newPath = "";
    for (let ext of this.extensionsToTry) {
      newPath = _path + ext;
      if (this.dirMap.has(newPath)) {
        return newPath;
      }
    }

    if (this.dependencyPaths.has(_path)) {
      return this.dependencyPaths.get(_path);
    }

    if (importer && importer.startsWith("/") && canRetry) {
      return this.resolve(
        path.join(path.dirname(importer), _path),
        importer,
        resolveDir,
        false
      );
    }
  }

  toJSON() {
    return {
      directory: this.directory,
      package: this.package,
      name: this.name,
      id: this.id,
      openedAt: this.openedAt,
      packageHandle: this.packageHandle,
    };
  }

  fromJSON(json: ReturnType<ESBuildPackage["toJSON"]>) {
    Object.assign(this, json);
    return this;
  }

  loadEntryPoints() {
    if (!this.package?.esbuild?.entryPoints?.length) {
      throw new PackagerError(
        ErrorCode.noEntryPoints,
        'No entry points found in package.json file. Expected {esbuild: { entryPoints: ["file-in-here.js"]}}'
      );
    }

    return (this.usedEntryPoints = this.package.esbuild.entryPoints.filter(
      isValidEntryPoint
    ));
  }

  usedEntryPoints = [];

  entryPoints: BuildOptions["entryPoints"];
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
  static permissionMode = { mode: "read" };
  private fileHandleCache = new Map<string, FileSystemFileHandle>();
  relativePath: string;
  static origin: string;
  async saveResultToCache(result: BuildResult) {
    let outResults: string[] = new Array(result.outputFiles.length);
    let i = 0;
    const cache = await getCache();
    for (let file of result.outputFiles) {
      const dest = ESBuildPackage.origin + file.path;
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

    const staticFiles = new Array(this.staticContent.size) as string[];
    i = 0;
    const pages = new Map<string, string>();
    for (let [fileName, handle] of this.staticContent.entries()) {
      const dest =
        ESBuildPackage.origin +
        path.join(
          this.relativePath,
          fileName.replace("/" + this.staticRoot, "")
        );
      const file = await handle.getFile();
      const type = Mime.getType(fileName) as string;
      let blob: Blob;

      let data: string | ArrayBuffer;
      let byteLength = 0;
      if (type.includes("text") || type.includes("application")) {
        data = await file.text();
      } else {
        data = await file.arrayBuffer();
        byteLength = data.byteLength;
      }

      const headers = new Headers();
      if (byteLength > 0) {
        headers.set("Content-Length", byteLength.toString(10));
      }

      headers.set("Content-Type", type);

      blob = new Blob([data], {
        type,
      });

      const response = new Response(blob, { headers });
      await cache.put(dest, response);
      if (type === "text/html" || type === "application/html") {
        let newDest = dest.replace(".html", "");

        const html = generateHTML(this.id, data);
        pages.set(fileName, html as string);

        const blob1 = new Blob([html], {
          type,
        });

        const _response = new Response(blob1, { headers });

        await cache.put(newDest, _response);
      }
      staticFiles[i++] = dest;
    }

    return { entryPoints: outResults, staticFiles: staticFiles, pages };
  }

  generateRelativePath() {
    return "/local/" + this.id;
  }

  async build(service: Service) {
    await this.buildFileTree();

    if (!this.relativePath) {
      this.relativePath = this.generateRelativePath();
    }
    // debugger;

    let tsconfig = undefined;
    if (this.dirMap.has("/tsconfig.json")) {
      let file = await (this.dirMap.get(
        "/tsconfig.json"
      ) as FileSystemFileHandle).getFile();
      tsconfig = await file.text();
    } else if (this.package.esbuild["tsconfig"]) {
      tsconfig = JSON.stringify(this.package.esbuild["tsconfig"]);
    }

    const entryPoints = this.loadEntryPoints();
    let result: BuildResult;
    try {
      result = await service.build({
        ...this.package.esbuild,
        stdin: {
          resolveDir: "/",
        },
        format: "esm",
        tsconfig,
        metafile: "metafile.json",
        entryPoints,
        publicPath: ESBuildPackage.origin + this.relativePath,
        plugins: [this.asPlugin(), ...(this.package.esbuild.plugins || [])],
        write: false,
        absWorkingDir: "/",
        nodePaths: ["/node_modules"],
        outdir: this.relativePath,
      });
    } catch (e) {
      const err = PackagerError.with(ErrorCode.buildFailed, e);
      err.build = this;
      throw err;
    }

    return {
      warnings: result.warnings,
      ...(await this.saveResultToCache(result)),
    } as OutputParams;
  }

  staticContent = new Map<string, FileSystemFileHandle>();
  staticRoot = "/public";

  async getFileForLocation(location: Location) {
    let filename = location.file;
    if (!path.isAbsolute(filename)) {
      filename = "/" + filename;
    }
    const handle = this.dirMap.get(filename) as FileSystemFileHandle;
    if (handle) {
      return await handle.getFile();
    } else {
      return null;
    }
  }

  static async load(
    handle: FileSystemDirectoryHandle,
    origin: string,
    relativePath?: string,
    staticRoot?: string,
    allowRequestPermission = false
  ) {
    const pkg = new ESBuildPackage(handle);
    ESBuildPackage.origin = origin;
    if (staticRoot) {
      pkg.staticRoot = staticRoot;
    }
    await pkg.reload(allowRequestPermission);
    if (relativePath) {
      pkg.relativePath = relativePath;
    }

    return pkg;
  }

  resolveFile = async (opts: OnResolveArgs): Promise<OnResolveResult> => {
    //#ifdef VERBOSE
    console.log("[Resolve]", opts.path, opts.importer, opts.resolveDir);
    //#endif
    const {
      path: _path,
      importer,
      namespace,
      resolveDir,
      kind,
      pluginData,
    } = opts;

    let resolvedPath: string;

    if (importer) {
      try {
        resolvedPath = await this.resolve(_path, importer, resolveDir);
      } catch (exception) {
        return this.emitResolveError({
          ...opts,
          code: ErrorCode.resolveFile,
        });
      }
    } else {
      resolvedPath = "/" + _path;
    }

    if (!resolvedPath) {
      const components = opts.path.split("/");
      const pkgName = components[0];
      if (this.dependencyNames.has(pkgName)) {
        let file = components.length > 1 ? `/${components.join("/")}` : "";
        return {
          path: `https://jspm.dev/${this.dependencyNames.get(pkgName)}${file}`,
          external: true,
          // namespace: "esbuild-pkg",
        };
      }
    }

    // if (this.alwaysRequestPermissions) {
    //   switch (await handle.queryPermission(ESBuildPackage.permissionMode)) {
    //     case "denied": {
    //       return this.emitResolveError({
    //         ...opts,
    //         code: ErrorCode.fileAccessDenied,
    //         message: `Your browser isn't allowing access to file at "${path}"`,
    //       });
    //       break;
    //     }
    //     case "prompt": {
    //       if (
    //         (await handle.requestPermission(ESBuildPackage.permissionMode)) !==
    //         "granted"
    //       ) {
    //         return this.emitResolveError({
    //           ...opts,
    //           code: ErrorCode.fileAccessDenied,
    //           message: `Your browser isn't allowing access to file at "${path}"`,
    //         });
    //       }
    //       break;
    //     }

    //     case "granted": {
    //       break;
    //     }
    //   }
    // }

    return {
      path: resolvedPath,
      external: false,

      // namespace: "esbuild-pkg",
    };
  };

  loadFile = async (opts: OnLoadArgs): Promise<OnLoadResult> => {
    //#ifdef VERBOSE
    console.log("[Load]", opts);
    //#endif

    const handle: FileSystemFileHandle = this.dirMap.get(opts.path);
    const file = await handle.getFile();

    if (Mime.getType(file.name)?.includes("image")) {
      return {
        contents: new Uint8Array(await file.arrayBuffer()),
        resolveDir: path.dirname(opts.path),
        loader: "default",
      };
    } else {
      return {
        contents: await file.text(),
        resolveDir: path.dirname(opts.path),
        loader: "default",
      };
    }
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

  async reload(allowRequestPermission = false) {
    if (
      (await this.directory.queryPermission({ mode: "read" })) !== "granted"
    ) {
      if (
        (await this.directory.queryPermission({ mode: "read" })) !== "granted"
      ) {
        const error = new PackagerPermissionError(ErrorCode.requirePermission);
        error.directoryName = this.directory.name;
        throw error;
      }
    }

    let packageJSONHandle: FileSystemFileHandle;
    try {
      packageJSONHandle = await this.directory.getFileHandle("package.json", {
        create: false,
      });
    } catch (exception) {
      throw PackagerError.with(ErrorCode.errorFetchingPackageJSON, exception);
    }

    let packageJSONFile: File;
    try {
      packageJSONFile = await packageJSONHandle.getFile();
    } catch (exception) {
      throw PackagerError.with(
        ErrorCode.errorGettingPackageJSONFile,
        exception
      );
    }

    let packageJSON;

    try {
      const packageJSONText = await packageJSONFile.text();
      packageJSON = JSON.parse(packageJSONText);
    } catch (exception) {
      throw PackagerError.with(ErrorCode.parsingPackageJSON, exception);
    }
    const root = this.directory;

    this.package = packageJSON;
    this.name = packageJSON.name;
    this.directory = root;
    this.id = root.name;
    this.openedAt = new Date();
    this.packageHandle = packageJSONHandle;
  }

  database: Database;

  static async fromDirectory(root: FileSystemDirectoryHandle) {
    const pkg = new ESBuildPackage(root);
    await pkg.reload();
    return pkg;
  }
}
