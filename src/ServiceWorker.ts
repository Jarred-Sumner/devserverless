import wasmURL from "esbuild-wasm/esbuild.wasm";
import { BundleWorker } from "src/lib/BundleWorker";
import { Database } from "src/lib/Database";
import { ErrorCode } from "src/lib/ErrorCode";
import { PackagerError } from "src/lib/ESBuildPackage";
import * as ErrorPage from "src/pages/ErrorPage";

const PRECACHE_URLS = [
  wasmURL,
  "/pages/[code].js",
  "/pages/index.js",
  "/index.html",
  "/[code].html",
];

const PRECACHE = "PRECACHE";
const cacheName = "OTHER";

let worker: BundleWorker = new BundleWorker();

function handleMessage(message: MessageEvent) {
  console.log(message);
}

worker.start();
self.addEventListener("message", handleMessage);

self.addEventListener("activate", function (event) {
  // self.skipWaiting();
});

self.addEventListener("install", (e) => {
  console.log("[Service Worker] Install");
  self.skipWaiting();

  (async () => {
    const cache = await caches.open(PRECACHE);
    console.log("[Service Worker] Caching all: app shell and content");
    await cache.addAll(PRECACHE_URLS);
  })();
});

// self.addEventListener("activate", (e) => {
//   e.waitUntil(
//     (async () => {
//       const keyList = await caches.keys();
//       await Promise.all(
//         keyList.map((key) => {
//           if (key === cacheName) {
//             return;
//           }
//           await caches.delete(key);
//         })
//       );
//     })()
//   );
// });

self.addEventListener("error", (event) => {
  console.error("[ServiceWorker] Error", event.error);
});

const basePath = location.origin + "/local/";

self.addEventListener("fetch", (e: FetchEvent) => {
  e.respondWith(
    (async () => {
      if (!navigator.onLine || e.request.url.includes("wasm")) {
        const r = await caches.match(e.request);
        if (r) {
          return r;
        }
      }

      const headers = new Headers();
      headers.set("Content-Type", "text/html");

      let localIndex = e.request.url.indexOf(basePath);

      if (
        e.resultingClientId?.length &&
        localIndex > -1 &&
        e.request.method === "GET"
      ) {
        let pkgName = e.request.url.substring(localIndex + basePath.length);
        const endSlash = pkgName.indexOf("/");
        if (endSlash > -1) {
          pkgName = pkgName.substring(0, endSlash);
        }

        let res;
        try {
          let originalError = worker.buildErrors.get(pkgName);
          res = await worker._bundleById({
            origin: location.origin,
            id: pkgName,
          });
          if (
            originalError !== worker.buildErrors.get(pkgName) &&
            worker.buildErrors.get(pkgName)
          ) {
            throw worker.buildErrors.get(pkgName);
          }
        } catch (exception) {
          console.error(exception);
          headers.set("Cache-Control", "private");
          try {
            const page = await ErrorPage.renderPackagerError(exception);
            exception.build = null;

            return new Response(new Blob([page]), {
              status: 200,
              headers,
            });
          } catch (exception) {
            console.error(exception);
            const page = await ErrorPage.renderPackagerError(
              PackagerError.with(ErrorCode.genericError, new Error())
            );
            return new Response(new Blob([page]), {
              status: 200,
              headers,
            });
          }
        }

        if (!res) {
          res = worker.buildResults.get(pkgName);
        }

        let response = "";
        if (res?.pages) {
          response = res.pages.values().next().value;
        } else {
          response = "An error occurred.";
        }

        return new Response(new Blob([response]), {
          status: 200,
          headers,
        });
      }

      const response = await fetch(e.request);
      if (
        response.status === 200 &&
        e.request.url.includes(self.location.origin)
      ) {
        const cache = await caches.open(cacheName);
        console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
        cache.put(e.request, response.clone());
      }

      return response;
    })()
  );
});
