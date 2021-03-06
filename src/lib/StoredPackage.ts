import Mime from "mime/lite";
import * as path from "path";
import { ErrorCode } from "src/lib/ErrorCode";
import { PackagerError, PackagerPermissionError } from "src/lib/ESBuildPackage";
import { PackageJSONFile } from "src/lib/PackageJSON";
import {
  FilesystemRouter,
  RouterType,
  SinglePageAppRouter,
} from "src/lib/Route";
import { NativeFS } from "src/lib/router/fs-native";

const permissionMode = { mode: "read" };
export interface StoredPackageRecord {
  id: string;
  lastBuild: Date;
  handle: FileSystemDirectoryHandle;
  staticHandle: FileSystemDirectoryHandle;
  routerType: RouterType;
  storedDependenciesHash?: string;
}

export class StoredPackage {
  id: string;
  lastBuild: Date;
  handle: FileSystemDirectoryHandle;
  staticHandle: FileSystemDirectoryHandle;
  static: NativeFS;
  root: NativeFS;
  routerType: RouterType = RouterType.unknown;
  dependenciesHash: string;
  storedDependenciesHash: string;
  pkg: PackageJSONFile;
  router: SinglePageAppRouter | FilesystemRouter;

  toRecord() {
    return {
      id: this.id,
      lastBuild: this.lastBuild || null,
      handle: this.handle,
      staticHandle: this.staticHandle,
      storedDependenciesHash:
        this.dependenciesHash || this.storedDependenciesHash,
      routerType: this.routerType,
    } as StoredPackageRecord;
  }

  static fromRecord(record: StoredPackageRecord) {
    const stored = new StoredPackage();
    Object.assign(stored, record);
    stored.root = record.handle ? new NativeFS(record.handle) : null;
    stored.static = record.staticHandle
      ? new NativeFS(record.staticHandle)
      : null;
    return stored;
  }

  static async fromJSON(opts: Partial<StoredPackage>) {
    const pkg = new StoredPackage();
    Object.assign(pkg, opts);
    pkg.root = opts.handle ? new NativeFS(opts.handle) : null;
    pkg.static = opts.staticHandle ? new NativeFS(opts.staticHandle) : null;
    return pkg;
  }

  async resolveStaticHandle() {
    if (!this.pkg.run?.router) return;

    const staticPath = path.extname(this.pkg.run.router)
      ? path.join(this.pkg.run.router, "../")
      : this.pkg.run.router;
    this.staticHandle = await this.root.resolveDirectoryHandle(
      staticPath,
      this.root.root
    );
    this.static = new NativeFS(this.staticHandle);
  }

  async load() {
    await this.loadPackageJSON();

    if (!this.staticHandle || !this.static) {
      await this.resolveStaticHandle();
    }

    this.loadRouter();
  }

  loadRouter() {
    if (path.extname(this.pkg.run?.router) === ".html") {
      this.routerType = RouterType.spa;
      this.router = new SinglePageAppRouter(this.root, this.static);
      this.router.destination = path.basename(this.pkg.run.router);
    } else {
      this.routerType = RouterType.filesystem;
      this.router = new FilesystemRouter(this.root, this.static);
    }
  }

  async loadPackageJSON() {
    const dir = this.root;

    if ((await dir.root.queryPermission(permissionMode)) !== "granted") {
      const error = new PackagerPermissionError(ErrorCode.requirePermission);
      error.directoryName = dir.root.name;
      throw error;
    }

    let packageJSONFileHandle: FileSystemFileHandle;
    try {
      packageJSONFileHandle = await dir.fileHandleFor("package.json");
    } catch (exception) {
      throw PackagerError.with(ErrorCode.errorFetchingPackageJSON, exception);
    }

    this.pkg = await PackageJSONFile.fromHandle(packageJSONFileHandle);

    this.dependenciesHash = await this.pkg.generateHash();
  }

  loadConfig() {}

  normalizeURL(url: string) {
    if (!url.startsWith("/") || !path.isAbsolute(url)) {
      return path.normalize(path.join("/" + url));
    }

    return path.normalize(url);
  }

  async resolveStaticFile(url: string) {
    let file: File;
    file = await this.static.nativeFile(url);

    if (!file) {
      const headers = new Headers();

      headers.set("Cache-Control", "private");
      headers.set("Content-Type", "text/plain");

      return new Response(new Blob([`404 Not Found ??? ${url}\n`]), {
        status: 404,
        headers,
      });
    }

    const headers = new Headers();

    const mime = Mime.getType(file.name);

    if (mime) {
      headers.set("Content-Type", mime);
    }
    if (typeof file.size === "number")
      headers.set("Content-Length", file.size.toString());

    return new Response(file, { headers: headers, status: 200 });
  }
}
