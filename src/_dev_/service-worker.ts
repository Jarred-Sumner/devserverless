import _SERVICE_WORKER_URL from "dist/_dev_/ServiceWorker.jsurl";
import PRELOAD_MANIFEST from "preload-manifest";

const SERVICE_WORKER_URL = _SERVICE_WORKER_URL.replace("./", "/");

globalThis.PRELOAD_MANIFEST = [
  ...new Set([
    ...PRELOAD_MANIFEST,
    "/_dev_/index.html",
    "/_dev_/setup.html",
    SERVICE_WORKER_URL,
  ]),
];

importScripts(SERVICE_WORKER_URL);
