import * as ESBuild from "esbuild-wasm";
import wasmURL from "esbuild-wasm/esbuild.wasm";
import { BundleByIDParams, BundleParams, Method, OutputParams } from "./rpc";
import { ESBuildPackage } from "./ESBuildPackage";
import { Database } from "src/lib/Database";
import path from "path";
console.time("START");

let service: ESBuild.Service;
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
    const res = await Promise.all([
      ESBuild.startService({
        worker: false,
        wasmURL,
      }),
      database.load(),
    ]);
    service = res[0];
    console.log("ESBuild loaded.");
    console.log("Database loaded.");
  }

  pkgs = new Map<string, ESBuildPackage>();
  buildResults = new Map<string, OutputParams>();
  buildStatus = new Map<string, BuildStatus>();
  buildErrors = new Map<string, Error>();

  async _bundle(params: BundleParams) {
    const id = params.handle.name;
    console.time("Bundle " + params.handle.name);
    let pkg: ESBuildPackage;
    if (!this.pkgs.has(params.handle.name)) {
      this.buildStatus.set(params.handle.name, BuildStatus.loadingPackage);
      try {
        pkg = await ESBuildPackage.load(params.handle, params.origin);
      } catch (exception) {
        this.buildErrors.set(id, exception);
        this.emitStatus(id, BuildStatus.error);
        console.error("Error loading package.", exception);
        console.timeEnd("Bundle " + params.handle.name);
        return null;
      }
    } else {
      pkg = this.pkgs.get(params.handle.name);
    }

    this.pkgs.set(params.handle.name, pkg);
    this.emitStatus(id, BuildStatus.building);
    let out;
    try {
      out = await pkg.build(service);
    } catch (exception) {
      this.buildErrors.set(id, exception);
      this.emitStatus(id, BuildStatus.error);
      console.error(exception);
      console.timeEnd("Bundle " + params.handle.name);
      return null;
    }

    console.timeEnd("Bundle " + params.handle.name);

    await database.savePackage(
      id,
      params.handle,
      pkg.package?.esbuild ?? null,
      new Date(),
      pkg.staticRoot
    );

    const result = {
      params: out,
      method: Method.output,
    } as { params: OutputParams };
    this.buildResults.set(id, out);
    this.emitStatus(id, BuildStatus.success);
    this.buildErrors.delete(id);
    return result.params;
  }

  private async emitStatus(id: string, status: BuildStatus) {
    this.buildStatus.set(id, status);

    if (status === BuildStatus.error || status === BuildStatus.success) {
      if (this.buildStatusCallbacks.has(id)) {
        let cb;
        const callbacks = this.buildStatusCallbacks.get(id);
        while ((cb = callbacks.shift())) {
          cb();
        }
        this.buildStatusCallbacks.delete(id);
      }
    }
  }

  buildStatusCallbacks = new Map<string, [Function, Function][]>();

  async _bundleById(params: BundleByIDParams) {
    if (this.pkgs.get(params.id)) {
      return await this.bundle({
        handle: this.pkgs.get(params.id).directory,
        origin: params.origin,
      });
    }

    if (!database.db) {
    }

    const res = await database.getPackageById(params.id);
    if (!res) {
      return {
        params: {
          pages: new Map([["error", "Package not found for ID " + params.id]]),
        },
        method: Method.output,
      };
    }

    return await this.bundle({ handle: res.handle, origin: params.origin });
  }

  async bundle(params: BundleParams) {
    const name = params.handle.name;
    const status = this.buildStatus.get(name);

    if (
      status === BuildStatus.building ||
      status === BuildStatus.loadingPackage
    ) {
      if (this.buildStatusCallbacks.has(name)) {
        return await new Promise((resolve, reject) => {
          this.buildStatusCallbacks.get(name).push(resolve);
        });
      } else {
        return await new Promise((resolve, reject) => {
          this.buildStatusCallbacks.set(name, resolve);
        });
      }
    }

    return await this._bundle(params);
  }

  handleMessage = (event: MessageEvent, port: MessagePort) => {
    switch (event.data.method as Method) {
      case Method.bundle: {
        console.log("[worker] Bundle", event.data);
        this.bundle(event.data.params).then(
          (resp) => port.postMessage(resp),
          (err) => {
            console.error(err);
            port.postMessage({
              method: Method.output,
              errors: [err],
            });
          }
        );
        break;
      }

      case Method.bundleById: {
        console.log("[worker] Bundle ID", event.data);
        this.bundleById(event.data.params).then(
          (resp) => port.postMessage(resp),
          (err) =>
            port.postMessage({
              method: Method.output,
              errors: [err],
            })
        );
      }
    }
  };
}
