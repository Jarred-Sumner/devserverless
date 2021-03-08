import * as IDB from "idb";
import path from "path-browserify";
import Mime from "mime/lite";

class StoredPackage {
  id: string;
  config: Object;
  lastBuild: Date;
  handle: FileSystemDirectoryHandle;
  publicDirectory: string;
  outputFiles: string[];

  static fromJSON(opts: Partial<StoredPackage>) {
    const pkg = new StoredPackage();
    Object.assign(pkg, opts);
    return pkg;
  }

  private async _resolveStaticFile(
    filePath: string,
    handle: FileSystemDirectoryHandle
  ) {
    const components = path.normalize(filePath).split("/");
    let _handle = handle;
    for (let i = 0; i < components.length - 1; i++) {
      _handle = await _handle.getDirectoryHandle(components[i]);
    }

    return _handle.getFileHandle(components[components.length - 1]);
  }

  normalizeURL(url: string) {
    const _url = new URL(url);
    return path.normalize(_url.pathname.replace(`/local/${this.id}`, ""));
  }

  handleCache = new Map();
  async _resolveStaticFileCached(
    filePath: string,
    handle: FileSystemDirectoryHandle
  ) {
    if (this.handleCache.has(filePath)) {
      return this.handleCache.get(filePath);
    }

    const _handle = await this._resolveStaticFile(filePath, handle);
    this.handleCache.set(filePath, handle);

    return _handle;
  }

  isEntryPoint(filePath: string) {
    for (let entry of this.outputFiles) {
      if (entry === filePath) {
        return true;
      }
    }

    return false;
  }

  async resolveStaticFile(url: string) {
    let handle: FileSystemFileHandle;
    const _url = url.includes(this.publicDirectory)
      ? url
      : path.join(this.publicDirectory, url);

    try {
      handle = await this._resolveStaticFileCached(_url, this.handle);
    } catch (exception) {
      console.error(exception);
      const headers = new Headers();

      headers.set("Cache-Control", "private");
      headers.set("Content-Type", "text/plain");

      return new Response(
        new Blob([`404 Not Found – ${_url}\n\n${exception.toString()}`]),
        {
          status: 404,
          headers,
        }
      );
    }

    const file = await handle.getFile();
    const headers = new Headers();
    headers.set("Content-Type", Mime.getType(file.name).toString());
    if (typeof file.size === "number")
      headers.set("Content-Length", file.size.toString());
    return new Response(file.stream(), { headers: headers, status: 200 });
  }
}
export async function resolveStaticFileForPackage(
  filePath: string,
  handle: FileSystemDirectoryHandle
) {
  const components = path.normalize(filePath).split("/");
  let _handle = handle;
  for (let i = 0; i < components.length - 1; i++) {
    _handle = await _handle.getDirectoryHandle(components[i]);
  }

  return _handle.getFileHandle(components[components.length - 1]);
}

export class Database {
  db: IDB.IDBPDatabase;

  async load() {
    if (this.db) return;
    this.db = await IDB.openDB("handles", 5, {
      upgrade(database, oldVersion, newVersion, transaction) {
        if (!database.objectStoreNames.contains("packages"))
          database.createObjectStore("packages");
      },
    });
  }

  async savePackage(
    id: string,
    handle: FileSystemDirectoryHandle,
    config: Object,
    lastBuild: Date,
    publicDirectory: string
  ) {
    console.log("Save", id);
    let pkg = await this.getPackageById(id);

    if (pkg) {
      pkg.config = config;
      pkg.lastBuild = lastBuild;
      pkg.handle = handle;
      pkg.publicDirectory = publicDirectory;

      await this.db.put("packages", pkg, id);
    } else {
      await this.db.add(
        "packages",
        { config, handle, id, lastBuild, publicDirectory },
        id
      );
    }
  }
  // This will be made smarter later
  async getPackageById(id: string) {
    const packages = this.db.getAll("packages");

    for (let pkg of (await packages) as StoredPackage[]) {
      if (pkg.id === id) {
        return pkg;
      }
    }

    return null;
  }
}
