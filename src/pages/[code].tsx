import "src/lib/launchIdleWorker";
import * as IDB from "idb";
import { Database } from "src/lib/Database";
import { InitialPackager } from "src/lib/InitialPackager";
import { Packager } from "src/lib/Packager";
import WORKER_URL from "dist/lib/worker.jsurl";

globalThis.WORKER_URL = WORKER_URL;

if (globalThis.navigator.serviceWorker) {
  globalThis.navigator.serviceWorker
    .register("/service-worker.js")
    .then(function (registration) {
      console.log("ServiceWorker registration successful!");
    })
    .catch(function (err) {
      console.log("ServiceWorker registration failed: ", err);
    });
}

let db: IDB.IDBPDatabase;
window.addEventListener("DOMContentLoaded", start);
let packager = new InitialPackager();
let database = new Database();

async function start() {
  try {
    await database.load();
    packager.start();
  } catch (exception) {
    console.error(exception);
  }

  bind();
}

globalThis.addEventListener("unhandledrejection", (er) => console.error(er));
console.log("HI");
async function clicker() {
  const handle = await window.showDirectoryPicker();
  await process(handle);
}

async function process(handle: FileSystemDirectoryHandle) {
  console.log("Verifying folder...");
  await packager.verify(handle);
  console.log("Sending to bundler...");
  packager.onBundleComplete = (params) => {
    console.log(params);
  };
  packager.bundle(handle, location.origin);
}

function bind() {
  document.body.addEventListener("dragover", (e) => {
    // Prevent navigation.
    e.preventDefault();
  });

  document.body.addEventListener("click", clicker);

  document.body.addEventListener("drop", async (e) => {
    // Prevent navigation.
    e.preventDefault();
    // Process all of the items.
    for (const item of e.dataTransfer.items) {
      // Careful: `kind` will be 'file' for both file
      // _and_ directory entries.
      if (item.kind === "file") {
        const entry = await item.getAsFileSystemHandle();
        if (entry.kind === "directory") {
          await process(entry);
        } else {
          // handleFileEntry(entry);
        }
      }
    }
  });
}
