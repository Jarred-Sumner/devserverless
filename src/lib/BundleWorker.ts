import * as ESBuild from "esbuild-wasm";
import wasmURL from "esbuild-wasm/esbuild.wasm";
import { Database } from "src/lib/Database";
import { ErrorCode } from "src/lib/ErrorCode";
import { Route } from "src/lib/Route";
import { StoredPackage } from "src/lib/StoredPackage";
import { getPackageID } from "src/_dev_/getPackageID";
import {
  ESBuildPackage,
  PackagerError,
  PackagerPermissionError,
} from "./ESBuildPackage";
import { BundleByIDParams, BundleParams, Method, OutputParams } from "./rpc";

let database: Database;

export enum BuildStatus {
  pending,
  loadingPackage,
  building,
  error,
  success,
}

export class BundleWorker {
  async start() {
    database = new Database();
    await Promise.all([
      ESBuild.initialize({
        worker: false,
        wasmURL,
      }),
      database.load(),
    ]);

    // console.log("ESBuild loaded.");
    // console.log("Database loaded.");
    this.database = database;
  }

  database: Database;
  pkgs = new Map<string, ESBuildPackage>();
  buildResults = new Map<string, OutputParams>();
  buildStatus = new Map<string, BuildStatus>();
  buildErrors = new Map<string, Error>();
  private buildCallbacks = new Map<string, Function[]>();

  async bundle(route: Route, pkg: StoredPackage) {
    const id = pkg.id;
    if (this.buildStatus.get(id) === BuildStatus.building) {
      if (this.buildCallbacks.has(id)) {
        return new Promise((resolve, reject) => {
          this.buildCallbacks.get(id).push(resolve);
        });
      } else {
        return new Promise((resolve, reject) => {
          this.buildCallbacks.set(id, [resolve]);
        });
      }
    }

    this.buildStatus.set(id, BuildStatus.building);
    if (!this.pkgs.has(pkg.id)) {
      this.pkgs.set(pkg.id, new ESBuildPackage(route.root, pkg.pkg));
    }
    const esbuild = this.pkgs.get(pkg.id);

    let res: OutputParams;
    try {
      res = await esbuild.build(route);
    } catch (exception) {
      this.buildStatus.set(id, BuildStatus.error);
      this.buildErrors.set(id, exception);

      if (this.buildCallbacks.has(id)) {
        let callbacks = this.buildCallbacks.get(id);
        let callback = callbacks[0];
        while ((callback = callbacks.shift())) {
          await callback();
        }

        this.buildCallbacks.delete(id);
      }

      throw exception;
    }

    this.buildErrors.delete(id);
    this.buildStatus.set(id, BuildStatus.success);

    if (this.buildCallbacks.has(id)) {
      let callbacks = this.buildCallbacks.get(id);
      let callback = callbacks[0];
      while ((callback = callbacks.shift())) {
        await callback();
      }

      this.buildCallbacks.delete(id);
    }

    return res;
  }

  storedPackage: StoredPackage;
  async loadStoredPackage() {
    if (this.storedPackage) return this.storedPackage;
    const id = getPackageID();
    const record = await this.database.loadPackage(id);
    if (record) {
      this.storedPackage = StoredPackage.fromRecord(record);
      await this.storedPackage.load();
    }

    return this.storedPackage;
  }

  canResolve() {
    if (!this.storedPackage?.router) {
      return false;
    }

    return true;
  }

  async needsPermissionCheck() {
    if (
      (await this.storedPackage.handle.queryPermission({ mode: "read" })) !==
      "granted"
    ) {
      const error = new PackagerPermissionError(ErrorCode.requirePermission);
      error.directoryName = this.storedPackage.handle.name;
      throw error;
    }

    await this.storedPackage.loadPackageJSON();
    this.storedPackage.loadRouter();

    if (!this.storedPackage.router) {
      throw PackagerError.with(
        ErrorCode.needsConfig,
        new Error("Please config.")
      );
    }
  }

  async bundleByURL(url: string) {
    if (!this.storedPackage) await this.loadStoredPackage();

    if (!this.storedPackage.pkg) {
      await this.storedPackage.loadPackageJSON();
    }

    if (!this.storedPackage.router) {
      this.storedPackage.loadRouter();
    }

    const route = await this.storedPackage.router.resolve(url);

    if (!route) {
      throw PackagerError.with(ErrorCode.routeNotFound, null);
    }

    return await this.bundle(route, this.storedPackage);
  }

  handleMessage = (event: MessageEvent, port: MessagePort) => {
    switch (event.data.method as Method) {
      case Method.bundle: {
        console.log("[worker] Bundle", event.data);
        this.bundleByURL(event.data.url).then(
          (resp) => port.postMessage(resp),
          (err) => {
            console.error(err);
            if (err.build) {
              err.build = null;
            }
            port.postMessage({
              method: Method.output,
              errors: [err],
            });
          }
        );
        break;
      }
    }
  };
}
