import { ErrorCode } from "src/lib/ErrorCode";
import "src/lib/injectServiceWorker";
import { ServiceWorkerMethod, ServiceWorkerMethodResponse } from "src/lib/rpc";

let lastRequestStatus = -1;

function sendStatusUpdate() {
  lastRequestStatus = Date.now();
  this.postMessage({
    type: ServiceWorkerMethod.isReady,
  });
}

function onIsReady(status: ErrorCode | -1) {
  if (location.pathname.includes("/_dev_/")) return;

  switch (status) {
    case -1: {
      location.pathname = "/";
      break;
    }
    case undefined:
    case ErrorCode.needsSetup: {
      location.pathname = "/_dev_/setup";
      break;
    }
    default: {
      location.pathname = "/_dev_/config";
      break;
    }
  }
}

globalThis["serviceWorkerHandler"] = (event: MessageEvent) => {
  switch (event.data?.type) {
    case ServiceWorkerMethodResponse.isReady: {
      onIsReady(event.data.value);
    }
  }
};

globalThis.navigator.serviceWorker.ready.then(() => {
  globalThis.navigator.serviceWorker.controller &&
    sendStatusUpdate.apply(globalThis.navigator.serviceWorker.controller);
});

globalThis.navigator.serviceWorker.oncontrollerchange = function (
  event: Event
) {
  if (!this.controller) {
    this.getRegistration("/").then((a) => {});
  } else {
    sendStatusUpdate.apply(this.controller);
  }
};

globalThis["serviceWorkerRegistration"] = (
  registration: ServiceWorkerRegistration
) => {
  if (registration.active) {
    registration.active.onmessage = globalThis["serviceWorkerHandler"];
    registration.active.onstatechange = sendStatusUpdate.apply(
      registration.active
    );
    sendStatusUpdate.apply(registration.active);
    registration.active.postMessage({
      type: ServiceWorkerMethod.isReady,
    });
  }

  if (
    registration.active &&
    !navigator.serviceWorker.controller &&
    !registration.installing
  ) {
    // Perform a soft reload to load everything from the SW and get
    // a consistent set of resources.
    window.location.reload();
  }

  if (registration.installing) {
    registration.installing.onmessage = globalThis["serviceWorkerHandler"];
    registration.installing.onstatechange = function () {
      switch (this.state) {
        case "installed":
          this.postMessage({
            type: ServiceWorkerMethod.isReady,
          });
          break;

        case "redundant":
          break;
      }
    };
  }

  registration.onupdatefound = function () {
    // toaster('Saving assets for offline caching!');

    const installingWorker = registration.installing;
    if (installingWorker) {
      installingWorker.onmessage = globalThis["serviceWorkerHandler"];
      installingWorker.onstatechange = function () {
        switch (installingWorker.state) {
          case "installed":
            this.postMessage({
              type: ServiceWorkerMethod.isReady,
            });
            break;

          case "redundant":
            break;
        }
      };
    }
  };
};
