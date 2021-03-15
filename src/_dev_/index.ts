import "src/lib/injectServiceWorker";
import { LightDatabase } from "src/lib/LightDatabase";

globalThis["serviceWorkerRegistration"] = (
  registration: ServiceWorkerRegistration
) => {
  if (
    registration.active &&
    !navigator.serviceWorker.controller &&
    !registration.installing
  ) {
    // Perform a soft reload to load everything from the SW and get
    // a consistent set of resources.
    window.location.reload();
  }

  check();
};

async function check() {
  const db = new LightDatabase();

  if (await db.hasAnyPackages()) {
    location.reload();
    return;
  }

  if (await db.hasAnyDirs()) {
    location.pathname = "/_dev_/config";
    return;
  }

  location.pathname = "/_dev_/setup";
}
