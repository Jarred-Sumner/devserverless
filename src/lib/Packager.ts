import * as IDB from "idb";
import { OutputParams, Method } from "src/lib/rpc";

export class Packager {
  worker: SharedWorker;

  start() {
    const worker = new SharedWorker(globalThis.WORKER_URL, { type: "module" });
    worker.port.addEventListener("message", this._onMessage);
    worker.port.addEventListener("error", (message) =>
      console.error(message.error)
    );
    worker.port.start();

    this.worker = worker;
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
    this.worker.port.postMessage({
      method: Method.bundleById,
      params: {
        origin,
        id,
      },
    });
  }

  bundle(handle: FileSystemDirectoryHandle, origin: string) {
    this.worker.port.postMessage({
      method: Method.bundle,
      params: {
        handle: handle,
        origin: origin,
      },
    });
  }
}
