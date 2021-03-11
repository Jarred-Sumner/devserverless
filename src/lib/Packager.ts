import * as IDB from "idb";
import { OutputParams, Method } from "src/lib/rpc";
import WORKER_URL from "dist/_dev_/worker.jsurl";

export class Packager {
  port: MessagePort;

  start() {
    const worker = new SharedWorker(WORKER_URL, { type: "module" });
    worker.port.addEventListener("message", this._onMessage);
    worker.port.addEventListener("error", (message) =>
      console.error(message.error)
    );

    this.port = worker.port;
    worker.port.start();
  }

  onBundleComplete: (params: OutputParams) => void;

  _onMessage = (event: MessageEvent) => {
    switch (event.data.method as Method) {
      case Method.output: {
        this.onBundleComplete(event.data.params);
        break;
      }

      default: {
        throw "Unknown message from worker.";
      }
    }
  };

  bundleById(id: string, origin: string) {
    this.port.postMessage({
      method: Method.bundleById,
      params: {
        origin,
        id,
      },
    });
  }

  bundle(handle: FileSystemDirectoryHandle, origin: string) {
    this.port.postMessage({
      method: Method.bundle,
      params: {
        handle: handle,
        origin: origin,
      },
    });
  }
}
