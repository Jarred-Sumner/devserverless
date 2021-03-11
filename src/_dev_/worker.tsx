import { BundleWorker } from "src/lib/BundleWorker";

const worker = new BundleWorker();
worker.start().then((a) => {
  console.log("[worker] Loaded.");
});

function handleMessage(event: MessageEvent, port: MessagePort) {
  worker.handleMessage(event, port);
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
