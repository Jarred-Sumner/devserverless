import type { Message } from "esbuild";
export enum Method {
  bundle,
  output,
  bundleById,
  setPort,
}

export type BundleParams = {
  origin: string;
  handle: FileSystemDirectoryHandle;
};

export type BundleByIDParams = {
  origin: string;
  id: string;
};

export type OutputParams = {
  warnings: Message[];
  entryPoints: string[];
  html: string;
};

export enum ServiceWorkerMethod {
  isReady,
}

export enum ServiceWorkerMethodResponse {
  isReady,
}
