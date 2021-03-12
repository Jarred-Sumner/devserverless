import fs from "fs";
import * as path from "path";

export class NativeFS {
  constructor(root: FileSystemDirectoryHandle) {
    if (!root || !(root instanceof FileSystemDirectoryHandle))
      throw new TypeError("root must be a FileSystemDirectoryHandle");
    this.root = root;
  }

  root: FileSystemDirectoryHandle;
  relativePath = "/";
  handleCache = new Map<
    string,
    FileSystemFileHandle | FileSystemDirectoryHandle
  >();

  async nativeFile(_path: string): File {
    if (this.handleCache.has(_path)) {
      const handle = this.handleCache.get(_path) as FileSystemFileHandle;
      return (await handle.getFile()) as File;
    }

    const handle = await this.resolveFileHandle(_path);
    if (handle) {
      this.handleCache.set(_path, handle);
      return await handle.getFile();
    } else {
      return null;
    }
  }

  async fileHandleFor(_path: string): Promise<FileSystemFileHandle> {
    if (this.handleCache.has(_path)) {
      return this.handleCache.get(_path) as FileSystemFileHandle;
    }

    const handle = await this.resolveFileHandle(_path);
    if (handle) {
      this.handleCache.set(_path, handle);
      return handle as FileSystemFileHandle;
    } else {
      return null;
    }
  }

  async exists(_path: string) {
    if (this.handleCache.has(_path)) {
      return true;
    }

    const handle = await this.resolveFileHandle(_path);
    if (handle) {
      this.handleCache.set(_path, handle);
      return true;
    } else {
      return false;
    }
  }

  private async resolveFileHandle(
    __path: string,
    from: FileSystemDirectoryHandle = this.root
  ) {
    let _path = __path;
    if (!path.isAbsolute(_path) || !_path.startsWith("/")) {
      _path = path.join("/", _path);
    }

    _path = path.normalize(_path);

    let component = _path;
    while (_path.includes("/") && _path.length > 1 && from) {
      try {
        _path = _path.startsWith("/") ? _path.substring(1) : _path;
        component = _path.substring(0, _path.indexOf("/"));
        if (_path.length - component.length > 0) {
          _path = _path.substring(component.length);
          if (!_path.includes("/")) {
            let hasMatch = false;
            for await (let filename of from.keys()) {
              if (filename === _path) {
                hasMatch = true;
                break;
              }
            }

            if (!hasMatch) {
              return null;
            }
            return await from.getFileHandle(_path);
          }
          from = await from.getDirectoryHandle(component);
        } else {
          let hasMatch = false;
          for await (let filename of from.keys()) {
            if (filename === component) {
              hasMatch = true;
              break;
            }
          }

          if (!hasMatch) {
            return null;
          }

          return await from.getFileHandle(component);
        }
      } catch (exception) {
        //#ifdef VERBOSE
        console.error(__path, exception);
        //#endif
        return null;
      }
    }

    return null;
  }

  async resolveDirectoryHandle(
    _path: string,
    from: FileSystemDirectoryHandle = this.root
  ) {
    if (!path.isAbsolute(_path) || !_path.startsWith("/")) {
      _path = path.join("/", _path);
    }
    let parts = _path.split("/");
    for (let i = 0; i < parts.length; i++) {
      if (!parts[i]) continue;
      from = await from.getDirectoryHandle(parts[i]);
    }
    return from;

    // let i = 0,
    //   nextI = 0;
    // while (i > -1 && i < _path.length) {
    //   nextI = _path.indexOf("/", i);

    //   from = await from.getDirectoryHandle(
    //     _path.substring(i + 1, nextI > -1 ? nextI : undefined)
    //   );
    //   i = nextI + 1;
    // }
    // return from;
    // for (let i = 0; i < _path.length; i++) {}
    // let parts = _path.split("/");
    // for (let i = 0; i < parts.length; i++) {
    //   if (!parts[i]) break;
    //   from = await from.getDirectoryHandle(parts[i]);
    // }

    return from;

    return null;
  }

  async *readdir(
    _path: string
  ): AsyncIterableIterator<FileSystemFileHandle | FileSystemDirectoryHandle> {
    const dir = await this.resolveDirectoryHandle(_path);
    if (!dir) return;

    yield* dir.values();
  }

  async readFile(_path: string, encoding: "utf8" | "binary" = "binary") {
    switch (encoding) {
      case "utf8": {
        return this.readFileText(_path);
      }

      case "binary": {
        return this.readFileBinary(_path);
      }
    }
  }
  async readFileBinary(_path: string) {
    const file = await this.nativeFile(_path);
    return await file.arrayBuffer();
  }
  async readFileText(_path: string) {
    const file = await this.nativeFile(_path);
    return await file.text();
  }
  async createReadStream(_path: string) {
    const file = await this.nativeFile(_path);
    return file.stream();
  }
  realpath(_path: string) {
    return path.normalize(_path);
  }
}

export function createFS(root: FileSystemDirectoryHandle) {
  return new NativeFS(root);
}
