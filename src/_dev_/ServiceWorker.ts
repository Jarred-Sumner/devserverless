import * as path from "path";
import { BundleWorker } from "src/lib/BundleWorker";
import { ErrorCode } from "src/lib/ErrorCode";
import { PackagerError } from "src/lib/ESBuildPackage";
import { getCache } from "src/lib/getCache";
import * as ErrorPage from "src/_dev_/ErrorPage";

const PRECACHE = "PRECACHE";
const offlineCacheName = "OFFLINE_ONLY";

let worker: BundleWorker = new BundleWorker();

// function handleMessage(message: MessageEvent) {
//   console.log(message);
// }

let finishPromise = worker.start();
// self.addEventListener("message", handleMessage);

self.addEventListener("activate", function (event) {
  // self.skipWaiting();
});

self.addEventListener("install", (e) => {
  console.log("[Service Worker] Install");
  self.skipWaiting();

  (async () => {
    const cache = await caches.open(PRECACHE);
    console.log("[Service Worker] Caching all: app shell and content");
    await cache.addAll(globalThis.PRELOAD_MANIFEST);
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

const basePath = location.origin;
const originURL = new URL(location.origin);
const pkgName = originURL.host.substring(0, originURL.host.indexOf("."));
let offlineCache: Cache;
let bundleCache: Cache;
async function processURL(event: FetchEvent) {
  const { request } = event;
  const href = request.url;
  const url = new URL(href);
  const pathname = url.pathname;
  const isNavigationRequest = event.resultingClientId?.length;
  const isInternalRequest = url.pathname.startsWith("/_dev_/");
  const extension = path.extname(pathname);

  if (!navigator.onLine || href.includes("wasm") || href.includes("jsurl")) {
    const r = await caches.match(event.request);
    if (r) {
      return r;
    }
  }

  if (url.origin !== location.origin) {
    return fetch(event.request);
  }

  if (isInternalRequest) {
    let response: Response;
    let canCache = true;
    if (
      isNavigationRequest &&
      !event.request.url.includes("setup") &&
      pathname !== "/_dev_/config" &&
      (await worker.loadStoredPackage())
    ) {
      const headers = new Headers();
      headers.set("Location", location.origin + "/_dev_/" + "config");
      return new Response(new Blob([]), {
        headers,
        status: 301,
      });
    } else {
      if (event.request.url.endsWith("config")) {
        response = await fetch("/_dev_/setup");
        canCache = false;
      } else {
        response = await fetch(event.request);
      }
    }

    if (
      response.status === 200 &&
      request.method === "GET" &&
      url.protocol.includes("http") &&
      canCache &&
      !(await caches.match(event.request))
    ) {
      if (!offlineCache) {
        offlineCache = await caches.open(offlineCacheName);
      }

      offlineCache.put(event.request, response.clone());
    }

    return response;
  }

  const headers = new Headers();

  if (finishPromise) {
    await finishPromise;
    finishPromise = null;
  }

  let storedPackage: StoredPackage;
  try {
    storedPackage = await worker.loadStoredPackage();
  } catch (exception) {
    switch (exception.code) {
      case ErrorCode.needsConfig: {
        headers.set("Location", location.origin + "/_dev_/" + "setup");
        return new Response(new Blob([]), {
          headers,
          status: 302,
        });
      }

      default: {
        const page = await ErrorPage.renderPackagerError(exception);
        exception.build = null;

        return new Response(new Blob([page]), {
          status: 200,
          headers,
        });
      }
    }
  }

  if (
    !storedPackage &&
    isNavigationRequest &&
    event.request.method === "GET" &&
    !isInternalRequest
  ) {
    headers.set("Location", location.origin + "/_dev_/" + "setup");
    return new Response(new Blob([]), {
      headers,
      status: 302,
    });
  }

  if (!isInternalRequest && isNavigationRequest) {
    let res;
    try {
      let originalError = worker.buildErrors.get(pkgName);
      res = await worker.bundleByURL(pathname);
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

    let response = res?.html ?? "";
    if (!response) {
      const page = await ErrorPage.renderPackagerError(
        PackagerError.with(ErrorCode.genericError, new Error())
      );
      return new Response(new Blob([page]), {
        status: 500,
        headers,
      });
    }

    return new Response(new Blob([response]), {
      status: 200,
      headers,
    });
  }

  if (!bundleCache) {
    bundleCache = await getCache();
  }

  const resp = await bundleCache.match(request);

  // if (request.url.includes("/_dist_/importErrorCatcher")) {
  //   const blob = `

  //   `;
  // }

  if (resp) {
    return resp;
  }

  try {
    return storedPackage.resolveStaticFile(request.url);
  } catch (exception) {
    console.error("Error while rendering", request.url, exception);
    const page = await ErrorPage.renderPackagerError(
      PackagerError.with(ErrorCode.genericError, exception)
    );

    return new Response(new Blob([page]), {
      status: 500,
      headers,
    });
  }
}

self.addEventListener("fetch", (e: FetchEvent) => {
  e.respondWith(processURL(e));
});
