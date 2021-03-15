import * as path from "path";
import { BundleWorker } from "src/lib/BundleWorker";
import { ErrorCode } from "src/lib/ErrorCode";
import { PackagerError } from "src/lib/ESBuildPackage";
import { getCache } from "src/lib/getCache";
import { ServiceWorkerMethod } from "src/lib/rpc";
import { StoredPackage } from "src/lib/StoredPackage";
import * as ErrorPage from "src/_dev_/ErrorPage";

const PRECACHE = "PRECACHE";
const offlineCacheName = "OFFLINE_ONLY";
const basePath = location.origin;
const originURL = new URL(location.origin);
const pkgName = originURL.host.substring(0, originURL.host.indexOf("."));
let offlineCache: Cache;
let bundleCache: Cache;
let storedPackage: StoredPackage;

let worker: BundleWorker = new BundleWorker();
const REMOTE_NPM_ORIGINS = new Map<string, boolean>([
  ["https://cdn.skypack.dev", true],
  ["https://jspm.dev", true],
  ["https://jspm.io", true],
  ["https://esm.run", true],
  ["https://cdn.jsdelivr.net", true],
  ["https://unpkg.com", true],
]);
async function checkReady(ports: readonly MessagePort[]) {
  if (storedPackage?.router) {
    return -1;
  }

  try {
    storedPackage = await worker.loadStoredPackage();
    if (!storedPackage) {
      return ErrorCode.needsSetup;
    }

    return -1;
  } catch (exception) {
    return exception.code;
  }
}

let finishPromise = worker.start();

function onMessage(message: MessageEvent) {
  switch (message?.data?.type) {
    case ServiceWorkerMethod.isReady: {
      const port = message.source;

      checkReady(message?.data?.pathname).then((status) => {
        port.postMessage({
          type: ServiceWorkerMethod.isReady,
          value: status,
        });
      });
    }
  }
}

self.addEventListener("message", onMessage);

self.addEventListener("activate", function (event) {
  self.skipWaiting();
});

self.addEventListener("install", (e) => {
  // console.log("[Service Worker] Install");
  self.skipWaiting();

  (async () => {
    const cache = await caches.open(PRECACHE);
    // console.log("[Service Worker] Caching all: app shell and content");
    try {
      await cache.addAll(globalThis.PRELOAD_MANIFEST);
    } catch (exception) {
      console.error(exception);
    }
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

async function processURL(event: FetchEvent) {
  const { request } = event;
  const href = request.url;
  const url = new URL(href);
  const pathname = url.pathname;
  const isNavigationRequest = event.resultingClientId?.length;
  const isInternalRequest = url.pathname.startsWith("/_dev_/");
  const extension = path.extname(pathname);
  const signal = event.request.signal;

  if (!navigator.onLine || href.includes("wasm") || href.includes("jsurl")) {
    const r = await caches.match(event.request);
    if (r) {
      return r;
    }

    if (isNavigationRequest && !navigator.onLine) {
      return await caches.match("/_dev_/index.html");
    }
  }

  if (url.origin !== location.origin) {
    if (REMOTE_NPM_ORIGINS.has(url.origin)) {
      if (!offlineCache) {
        offlineCache = await caches.open(offlineCacheName);
      }

      let cached = await offlineCache.match(event.request);
      if (cached) {
        return cached;
      }

      const response = await fetch(event.request);
      if (response.status === 200 && !signal.aborted) {
        await offlineCache.put(event.request, response.clone());
      }

      return response;
    } else if (url.origin.startsWith("http")) {
      const [response, _offlineCache] = await Promise.all([
        fetch(event.request),
        offlineCache ? offlineCache : caches.open(offlineCacheName),
      ]);

      offlineCache = _offlineCache;
      if (
        response.status === 200 &&
        (!response.headers.has("Cache-Control") ||
          !response.headers.get("Cache-Control").includes("private"))
      ) {
        await offlineCache.put(event.request, response.clone());
      }
      return response;
    } else {
      return await fetch(event.request);
    }
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
        response = await fetch("/_dev_/setup", { signal });
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

  try {
    storedPackage = await worker.loadStoredPackage();
  } catch (exception) {
    console.error(exception);
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

  if (signal.aborted) return null;

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
      res = await worker.bundleByURL(pathname, request.signal);
      if (
        originalError !== worker.buildErrors.get(pkgName) &&
        worker.buildErrors.get(pkgName)
      ) {
        throw worker.buildErrors.get(pkgName);
      }
      if (signal.aborted) return null;
    } catch (exception) {
      // DOMException: The request is not allowed by the user agent or the platform in the current context.
      if (typeof exception === "object" && exception instanceof DOMException) {
        const page = await ErrorPage.renderPackagerError(
          PackagerError.with(ErrorCode.requirePermission, exception)
        );
        return new Response(new Blob([page]), {
          status: 200,
          headers,
        });
      }

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

    if (res?.warnings?.length) {
      console.warn(...res.warnings);
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

    if (request.url.endsWith(".out")) {
      headers.set("Content-Type", "application/json");
      return new Response(new Blob([JSON.stringify(res, null, 2)]), {
        status: 200,
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
    return storedPackage.resolveStaticFile(url.pathname);
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
