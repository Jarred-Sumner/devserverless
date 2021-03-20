import { DomUtils, ElementType, parseDocument, Parser } from "htmlparser2";
import { PackagerError } from "src/lib/ESBuildPackage";
import DomHandler, { Node, Element } from "domhandler";
import { NativeFS } from "src/lib/router/fs-native";
import serializer from "dom-serializer";
import { PackageJSONFile } from "src/lib/PackageJSON";
import { getPackageID } from "src/_dev_/getPackageID";
import { RouterType } from "src/lib/Route";
import { StoredPackage } from "src/lib/StoredPackage";
import { Database } from "src/lib/Database";

export enum GeneratorErrorCode {
  missingHTMLFile,
  missingSrcDir,
  missingEntryPoint,
}

const indexFileLocations = [
  "src/index.js",
  "src/index.jsx",
  "src/index.ts",
  "src/index.tsx",
];

export class GeneratorError extends Error {
  constructor(code: GeneratorErrorCode, ...args) {
    super(...args);
    this.code = code;
  }
  static with(code: GeneratorErrorCode, error: Error) {
    const packager = new GeneratorError(code);
    Object.assign(packager, error);
    return packager;
  }

  code: GeneratorErrorCode;
}

const SAVE_PATH = "public/dev.html";

export class CreateReactAppGenerator {
  directory: NativeFS;

  static async isGeneratable(
    dir: FileSystemDirectoryHandle,
    pkgJSON: PackageJSONFile
  ) {
    if (!pkgJSON.inputDependencies.has("react-scripts")) {
      return false;
    }

    let yesPublic = false;
    let yesSrc = false;
    for await (let key of dir.keys()) {
      if (key.includes("public")) {
        yesPublic = true;
      }

      if (key.includes("src")) {
        yesSrc = true;
      }
    }

    if (!yesPublic || !yesSrc) return false;

    return true;
  }

  async generateHTML() {
    if (!this.directory.exists("public/index.html")) {
      throw new GeneratorError(
        GeneratorErrorCode.missingHTMLFile,
        `Missing public/index.html file.`
      );
    }

    let indexLocation = "";
    const srcDir = await this.directory.resolveDirectoryHandle(
      "src",
      this.directory.root
    );

    if (!srcDir) {
      throw new GeneratorError(
        GeneratorErrorCode.missingSrcDir,
        `Missing src directory.`
      );
    }

    for await (let name of srcDir.keys()) {
      if (indexLocation) break;
      switch (name) {
        case "index.js": {
          indexLocation = "src/index.js";
          break;
        }

        case "index.jsx": {
          indexLocation = "src/index.jsx";
          break;
        }

        case "index.ts": {
          indexLocation = "src/index.ts";
          break;
        }

        case "index.tsx": {
          indexLocation = "src/index.tsx";
          break;
        }
      }
    }

    if (indexLocation === "") {
      throw new GeneratorError(
        GeneratorErrorCode.missingSrcDir,
        `Missing index file.`
      );
    }

    let script = new Element("script", {
      src: `../${indexLocation}`,
      "data-generator": "cra-v1",
    });
    const source = await this.directory.readFileText("public/index.html");
    const domHandler = new DomHandler(
      (err, nodes) => {},
      undefined,
      (element) => {
        const attribs = element.attribs;

        if (attribs["rel"] === "manifest") {
          attribs["href"] = "/_dev_/manifest.json";
        } else {
          if (attribs["href"]) {
            attribs["href"] = attribs["href"]
              .replace("%PUBLIC_URL%", "/")
              .replace(/^\/\//, "/")
              .replace(/([^:]\/)\/+/g, "$1");
          }

          if (attribs["src"]) {
            attribs["src"] = attribs["src"]
              .replace("%PUBLIC_URL%", "/")
              .replace(/^\/\//, "/")
              .replace(/([^:]\/)\/+/g, "$1");
          }
        }

        if (element.tagName === "body") {
          DomUtils.appendChild(element, script);
        }
      }
    );

    const parser = new Parser(domHandler);
    parser.write(source);
    parser.end();

    return serializer(domHandler.root);
  }

  async generate() {
    const html = await this.generateHTML();

    await this.directory.writeFileText(SAVE_PATH, html, false);
    return SAVE_PATH;
  }

  async saveToPackageJSON(save: string, pkg: PackageJSONFile) {
    pkg.run = {
      router: save,
      routerGenerator: "create-react-app",
    };
    await pkg.save();
  }

  async createStoredPackage(pkg: PackageJSONFile) {
    return StoredPackage.fromRecord({
      id: getPackageID(),
      lastBuild: null,
      handle: this.directory.root,
      staticHandle: await this.directory.resolveDirectoryHandle(pkg.staticPath),
      routerType: RouterType.spa,
    });
  }

  static async run(
    handle: FileSystemDirectoryHandle,
    pkg: PackageJSONFile,
    database: Database
  ) {
    const generator = new CreateReactAppGenerator();
    generator.directory = new NativeFS(handle);
    await generator.saveToPackageJSON(await generator.generate(), pkg);
    const stored = await generator.createStoredPackage(pkg);
    await database.savePackage(stored);

    return stored;
  }
}
