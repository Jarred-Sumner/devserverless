///<reference types="node" />
import { OnResolveArgs, OnResolveResult, Plugin } from "esbuild";
import { CdnStrategy } from "@velcro/strategy-cdn";
import { CompoundStrategy } from "@velcro/strategy-compound";
import { FsStrategy } from "@velcro/strategy-fs";
import { PackageMainField, Uri } from "@velcro/common";
import { Resolver } from "@velcro/resolver";
// import escape from 'escape-string-regexp';
import * as Path from "path";
import Module from "module";

export interface VelcroPluginOptions {
  /**
   * An array of fallback extensions that will be attempted when trying to resolve URIs
   * if the provided URI doesn't already resolve.
   */
  extensions?: string[];

  /**
   * An ordered list of `package.json` fields to consult when trying to find an npm
   * module's main entrypoint.
   */
  packageMain?: PackageMainField[];

  /**
   * Select a target environments. This will affect which 'bare modules' will be considered
   * 'built-in' vs those that must be shimmed / bundled.
   */
  target?: "node";
}

export function createPlugin(options: VelcroPluginOptions = {}): Plugin {
  // If this plugin gets used in the context of a long-lived esbuild service,
  // this cache will prevent subsequent builds from needing ot make network
  // requests.
  const cache = new Map();

  async function onResolve({ importer, path }: OnResolveArgs): Promise<string> {
    // A `data:` URI typically already contains whatever is needed so we
    // treat it as an 'external' to leave it as-is.
  }
}
