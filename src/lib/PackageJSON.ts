import type { BuildOptions } from "esbuild";
import { cloneDeep } from "lodash-es";
import * as semver from "semver";
import * as path from "path";
import xxhash from "xxhash-wasm";
export interface RunConfiguration {
  // If you pass it a filename ending in .html, all navigation routes will go to that file.
  // If you pass it a folder, it will route based on the filesystem, Next.js-style.
  router: string;
  dependencies: string;

  isRouterUnset: boolean;
  isDependenciesUnset: boolean;
}

const DEFAULT_DEPENDENCIES_HOST = "https://cdn.skypack.dev/";

const AUTO_DEPENDENCIES = [
  "react",
  "react-dom",
  "prop-types",
  "object-assign",
  "react-bootstrap",
  "antd",
  "bootstrap",
  "axios",
];

const dependencyKeys = [
  "dependencies",
  "optionalDependencies",
  "peerDependencies",
  "devDependencies",
];

const eachIteratorValue = ["", ""];

export class PackageJSON {
  name: string;
  version: string;

  esbuild: Partial<BuildOptions>;
  run: RunConfiguration;
  dependencies: Object;
  devDependencies: Object;
  peerDependencies: Object;
  optionalDependencies: Object;

  *eachDependency() {
    for (let depKey of dependencyKeys) {
      const deps = this[depKey];
      if (deps) {
        for (let key in deps) {
          eachIteratorValue[0] = key;
          eachIteratorValue[1] = deps[key];
          yield eachIteratorValue;
        }
      }
    }
  }

  normalizeDependencies() {
    for (let depKey of dependencyKeys) {
      const deps = this[depKey];
      if (deps) {
        for (let moduleId in deps) {
          this.inputDependencies.set(moduleId, moduleId);
        }
      }
    }

    for (let autodep of AUTO_DEPENDENCIES) {
      if (!this.inputDependencies.has(autodep)) {
        this.inputDependencies.set(autodep, autodep);
      }
    }

    // Sort the dependencies so that hashing can be more reliable
    this.inputDependencies = new Map(
      [...this.inputDependencies.entries()].sort()
    );
  }

  static parse(json: string, ClassName = PackageJSON) {
    const pkg = new ClassName();
    pkg.process(json, ClassName);
    return pkg;
  }

  inputDependencies = new Map();

  async generateHash() {
    return (await xxhash()).h64(JSON.stringify(this.inputDependencies));
  }

  process(json: string, ClassName = PackageJSON) {
    const parsed = JSON.parse(json);
    if (typeof parsed.handle !== "undefined") {
      delete parsed.handle;
    }
    parsed.run = ClassName.normalizeRun(parsed.run || {});
    parsed.esbuild = ClassName.normalizeESBuild(parsed.esbuild || {});
    Object.assign(this, parsed);
    this.normalizeDependencies();
    return this;
  }

  static normalizeRun(run: Partial<RunConfiguration>) {
    if (typeof run.router === "string" && run.router) {
      run.router = run.router.toLowerCase().trim();
      run.isRouterUnset = false;
    } else {
      run.isRouterUnset = true;
      run.router = "";
    }

    if (typeof run.dependencies === "string" && run.dependencies) {
      run.dependencies = run.dependencies.toLowerCase().trim();
      run.isDependenciesUnset = false;
    } else {
      run.dependencies = DEFAULT_DEPENDENCIES_HOST;
      run.isDependenciesUnset = true;
    }

    return run;
  }

  toJSON() {
    const json = cloneDeep(this);

    delete json.run.isRouterUnset;
    delete json.run.isDependenciesUnset;
    delete json.inputDependencies;

    return json;
  }

  static normalizeESBuild(esbuild: Partial<BuildOptions>) {
    return {};
  }
}

export class PackageJSONFile extends PackageJSON {
  constructor() {
    super();
  }
  static async fromHandle(handle: FileSystemFileHandle) {
    const pkg = PackageJSONFile.parse(await (await handle.getFile()).text());
    pkg.handle = handle;

    return pkg;
  }
  handle: FileSystemFileHandle;

  get staticPath() {
    return path.extname(this.run.router)
      ? path.join(this.run.router, "../")
      : this.run.router;
  }

  async save() {
    const perm = await this.handle.createWritable({
      keepExistingData: false,
    });
    const json = this.toJSON();
    console.log(json);
    const text = JSON.stringify(json, null, 2);
    const writer = perm.getWriter();
    await writer.write(text);
    await writer.close();
  }

  process(json: string, ClassName = PackageJSON) {
    return super.process(json, PackageJSONFile);
  }

  async reload() {
    this.process(await (await this.handle.getFile()).text(), PackageJSONFile);
  }

  static parse(json): PackageJSONFile {
    return super.parse(json, PackageJSONFile) as PackageJSONFile;
  }

  toJSON() {
    const json = super.toJSON();
    delete json.handle;
    return json;
  }
}
