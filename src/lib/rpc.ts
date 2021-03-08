import { BuildResult, Message } from "esbuild";
import { BuildOptions } from "esbuild-wasm";
import { ESBuildPackage } from "src/lib/ESBuildPackage";
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
  staticFiles: string[];
  pages: Map<string, string>;
};
