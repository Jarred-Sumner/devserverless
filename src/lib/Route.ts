import { NativeFS } from "src/lib/router/fs-native";
import { HTML2ESBuild } from "@jarred/htmlbuild";
import * as path from "path";
import type { BuildOptions, BuildResult } from "esbuild";

// The rules are as follows
// The folder containing the topmost html file is the root route.
// public/index.html => /
// public/bacon/eggs.html => /bacon/eggs
// public/recipes/[id].html => /recipes/123, /recipes/123.html
// public/recipes/new.html => /recipes/new, /recipes/new/
export class Route {
  entryPoints: string[] = [];
  absWorkingDirectory: string = "";
  root: NativeFS;
  builder: HTML2ESBuild = new HTML2ESBuild();
  outDestination = "/";

  static from(root: NativeFS, pathname: string) {
    const route = new Route();
    route.root = root;
    route.absWorkingDirectory = pathname.endsWith(".html")
      ? path.join(pathname, "../")
      : pathname;
    return route;
  }

  async generateConfig(file: File) {
    const { entryPoints } = this.builder.generate(
      await file.text(),
      this.resolveFrom
    );
    this.entryPoints = entryPoints;
  }

  renderToString(result: BuildResult, config: BuildOptions) {
    return this.builder.renderToString(
      result,
      config,
      this.resolveFrom,
      this.resolveTo
    );
  }

  resolveFrom = (..._path: string[]) => {
    return path.join(this.absWorkingDirectory, ..._path);
  };
  resolveTo = (..._path: string[]) => {
    return path.join(this.outDestination, ..._path);
  };
}

export class FilesystemRouter {
  packageRoot: NativeFS;
  pagesRoot: NativeFS;

  constructor(packageRoot: NativeFS, pagesRoot: NativeFS) {
    this.packageRoot = packageRoot;
    this.pagesRoot = pagesRoot;
  }

  async routeFor(file: File, pathname: string) {
    const route = Route.from(this.packageRoot, pathname);
    await route.generateConfig(file);

    return route;
  }

  async resolve(pathname: string): Promise<Route> {
    const { pagesRoot: fs } = this;

    let target = pathname;
    let file: File;

    if (pathname.indexOf("//") > -1) {
      pathname = pathname.replace(/\/+/g, "/");
    }

    if (pathname.endsWith("/")) {
      // First, try an exact html file.
      // so, /foo.html instead of /foo/index.html
      target = pathname.slice(0, -1) + ".html";
      file = await fs.nativeFile(target);
      if (file) {
        return await this.routeFor(file, target);
      }

      target = pathname + "index.html";
      file = await fs.nativeFile(target);
      if (file) {
        return await this.routeFor(file, target);
      } else {
        return null;
      }
    }

    if (!pathname.endsWith(".html")) {
      target = pathname + ".html";
    }

    file = await fs.nativeFile(target);

    if (file) {
      return await this.routeFor(file, target);
    }

    target = path.normalize(path.join(pathname, "../"));

    if (target.startsWith("..")) {
      return null;
    }

    for (let _result of await fs.readdir(target)) {
      const result = _result as
        | FileSystemFileHandle
        | FileSystemDirectoryHandle;

      if (
        result.kind === "file" &&
        result.name.startsWith("[") &&
        result.name.endsWith("].html")
      ) {
        file = result;
        break;
      }
    }

    if (!file) {
      return null;
    }

    return await this.routeFor(file, target);
  }
}

export class SinglePageAppRouter extends FilesystemRouter {
  destination = "";

  async resolve(pathname: string): Promise<Route> {
    const { pagesRoot: fs } = this;

    return await this.routeFor(await fs.nativeFile(this.destination), "/");
  }
}

export enum RouterType {
  unknown = "",
  spa = "spa",
  filesystem = "filesystem",
}
