import { StoredPackage } from "src/lib/StoredPackage";
import * as lockfile from "src/lib/lockfile";
import { ByteBuffer } from "peechy";
import { PackagerError } from "src/lib/ESBuildPackage";
import { ErrorCode } from "src/lib/ErrorCode";
import { normalize } from "src/lib/router/glob-slash";

const API_SERVER_HOST = "pkgs.example.d";
let importMapCache: Cache;
export async function getImportMapCache() {
  if (!importMapCache) {
    importMapCache = await caches.open("package.importmap");
  }

  return importMapCache;
}

const zeroManifest = {
  bare: "",
  source: [],
  destination: [],
  bareField: lockfile.BareField.guessedField,
};

export function manifestPartialFromPackage(
  pkg: StoredPackage
): lockfile.JavascriptPackageManifestPartial {
  const json = pkg.pkg;

  return {
    name: pkg.pkg.name,
    provider: lockfile.PackageProvider.other,
    dependencyNames: Object.keys(json.dependencies),
    dependencyVersions: Object.values(json.dependencies),
    peerDependencyNames: Object.keys(json.peerDependencies),
    peerDependencyVersions: Object.values(json.peerDependencies),
    devDependencyNames: Object.keys(json.devDependencies),
    devDependencyVersions: Object.values(json.devDependencies),
    status: lockfile.PackageResolutionStatus.success,
    exportsManifest: zeroManifest,
    version: {
      major: 0,
      minor: 0,
      patch: 0,
      build: "",
      pre: "",
      range: lockfile.VersionRange.none,
    },
  };
}

let bb: ByteBuffer;
export async function generateImportMapRequestBlob(pkg: StoredPackage) {
  if (bb) {
    bb._index = 0;
  } else {
    bb = new ByteBuffer(new Uint8Array(2048));
  }

  lockfile.encodeJavascriptPackageRequest(manifestPartialFromPackage(pkg), bb);

  return bb.toUint8Array();
}

export type ImportMap = {
  imports: Record<string, string>;
  scopes?: Record<string, Record<string, string>>;
};

function importMapPathForHash(hash: string) {
  return `/_generated_/import-maps/${hash}`;
}
export const IMPORT_MAP_CONTENT_TYPE = "application/importmap+json";

export async function getLocalImportMap(hash: string) {
  return (await getImportMapCache()).match(importMapPathForHash(hash));
}

export async function fetchPackageManifest(hash: string, buffer: Uint8Array) {
  console.log("Running the web version of `npm install`");
  const resp = await fetch(`${API_SERVER_HOST}/pkgs/${hash}`, {
    mode: "cors",
    redirect: "follow",
    method: "POST",
    body: buffer.buffer,
    referrer: location.origin,
    headers: {
      "Content-Type": "application/vnd.package-peechy",
      "X-Origin": location.origin,
    },
  });

  if (resp.ok) {
    const buffer = await resp.arrayBuffer();

    const bb = new ByteBuffer(new Uint8Array(buffer));

    const pkg = lockfile.decodeJavascriptPackageResponse(bb);

    return pkg;
  } else {
  }
}

export async function saveImportMap(importMap: ImportMap, hash: string) {
  const cache = await getImportMapCache();
  const blob = new Blob([JSON.stringify(importMap)], {
    type: IMPORT_MAP_CONTENT_TYPE,
  });
  const headers = new Headers({
    "Cache-Control": "public,immutable,max-age=31536000",
    "Content-Type": IMPORT_MAP_CONTENT_TYPE,
    "Content-Length": blob.size.toString(10),
    "X-Hash": hash,
  });

  await cache.put(
    importMapPathForHash(hash),
    new Response(blob, {
      headers,
      status: 200,
    })
  );
}

export function generateImportMap(
  response: lockfile.JavascriptPackageResponse,
  base: URL
): ImportMap {
  if (!response.result) {
    throw PackagerError.with(
      ErrorCode.failedToResolveNPMPackage,
      new Error(response.message || "Failed to resolve dependencies.")
    );
  }

  const _url = new URL(base.toString());
  const result = response.result;

  const importsList = {};
  const basePath = base.pathname;
  const {
    name,
    version,
    dependencyIndex,
    count,
    provider,
    exportsManifest,
    exportsManifestIndex,
    dependencies,
  } = result;
  let _name = "",
    i = 0,
    _version = "";

  for (i = 0; i < count; i++) {
    _url.pathname = base.pathname = `${basePath}${name[i]}@${
      version[i]
    }${normalize(exportsManifest.bare[i])}`;
    importsList[name[i]] = base.href;
    importsList[name[i] + "/"] = _url.href;
  }
  base.pathname = basePath;

  return {
    imports: importsList,
  };
}
