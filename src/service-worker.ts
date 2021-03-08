import wasmURL from "esbuild-wasm/esbuild.wasm";
import Database from "src/lib/Database";

const PRECACHE_URLS = [
  wasmURL,
  "/pages/[code].js",
  "/pages/index.js",
  "/index.html",
  "/[code].html",
];

const PRECACHE = "PRECACHE";
const cacheName = "OTHER";

self.addEventListener("activate", function (event) {
  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames
          .filter(function (cacheName) {
            return cacheName === PRECACHE || cacheName === "OTHER";
            // Return true if you want to remove this cache,
            // but remember that caches are shared across
            // the whole origin
          })
          .map(function (cacheName) {
            return caches.delete(cacheName);
          })
      ).then(() => {
        self.skipWaiting();
      });
    })
  );
});

self.addEventListener("install", (e) => {
  console.log("[Service Worker] Install");
  e.waitUntil(
    (async () => {
      const cache = await caches.open(PRECACHE);
      console.log("[Service Worker] Caching all: app shell and content");
      await cache.addAll(PRECACHE_URLS);
    })()
  );
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

self.addEventListener("fetch", (e) => {
  e.respondWith(
    (async () => {
      if (
        e.request.url.includes("/local") ||
        !navigator.onLine ||
        e.request.url.includes("wasm")
      ) {
        const r = await caches.match(e.request);
        if (r) {
          return r;
        }
      }

      console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
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
