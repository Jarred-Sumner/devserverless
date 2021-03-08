import * as ESBuild from "esbuild-wasm";
import wasmURL from "esbuild-wasm/esbuild.wasm";
import { BundleByIDParams, BundleParams, Method } from "./rpc";
import { ESBuildPackage } from "./ESBuildPackage";
import { Database } from "src/lib/Database";

let service: ESBuild.Service;
let database: Database;
async function start() {
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
  console.timeEnd("START");
}

start();

async function bundle(params: BundleParams) {
  console.time("Bundle " + params.handle.name);
  const pkg = await ESBuildPackage.load(params.handle, params.origin);

  const out = await pkg.build(service);
  console.timeEnd("Bundle " + params.handle.name);

  await database.savePackage(
    pkg.id,
    params.handle,
    pkg.package?.esbuild ?? null,
    new Date()
  );

  return {
    params: out,
    method: Method.output,
  };
}

async function bundleById(params: BundleByIDParams) {
  const res = await database.getPackageById(params.id);
  if (!res) {
    return {
      params: {
        pages: new Map([["error", "Package not found for ID " + params.id]]),
      },
      method: Method.output,
    };
  }

  const { handle, id } = res;
  console.time("Bundle By ID " + id);
  const pkg = await ESBuildPackage.load(handle, params.origin);

  const out = await pkg.build(service);
  console.timeEnd("Bundle By ID " + handle.name);

  await database.savePackage(
    pkg.id,
    handle,
    pkg.package?.esbuild ?? null,
    new Date()
  );

  return {
    params: out,
    method: Method.output,
  };
}

function handleMessage(event: MessageEvent, port: MessagePort) {
  switch (event.data.method as Method) {
    case Method.bundle: {
      console.log("[worker] Bundle", event.data);
      bundle(event.data.params).then(
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
      bundleById(event.data.params).then(
        (resp) => port.postMessage(resp),
        (err) =>
          port.postMessage({
            method: Method.output,
            errors: [err],
          })
      );
    }
  }
}

globalThis.onconnect = function (e) {
  for (let port of e.ports) {
    port.addEventListener("message", (event) => {
      handleMessage(event, port);
    });

    port.start(); // Required when using addEventListener. Otherwise called implicitly by onmessage setter.
  }

  console.log("[worker] connected.");
};
