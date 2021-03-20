import type { ByteBuffer } from "peechy";

type byte = number;
type float = number;
type int = number;
type alphanumeric = string;
type uint = number;
type int8 = number;
type lowp = number;
type int16 = number;
type int32 = number;
type float32 = number;
type uint16 = number;
type uint32 = number;
export enum PackageProvider {
  npm = 1,
  git = 2,
  https = 3,
  tgz = 4,
  disk = 5,
  other = 6,
}
export const PackageProviderKeys = {
  1: "npm",
  npm: "npm",
  2: "git",
  git: "git",
  3: "https",
  https: "https",
  4: "tgz",
  tgz: "tgz",
  5: "disk",
  disk: "disk",
  6: "other",
  other: "other",
};
export enum VersionRange {
  none = 1,
  tilda = 2,
  caret = 3,
  complex = 4,
}
export const VersionRangeKeys = {
  1: "none",
  none: "none",
  2: "tilda",
  tilda: "tilda",
  3: "caret",
  caret: "caret",
  4: "complex",
  complex: "complex",
};
export enum PackageResolutionStatus {
  success = 1,
  missingName = 2,
  missingVersion = 3,
  notFound = 4,
  corruptPackage = 5,
  rateLimit = 6,
  invalidVersion = 7,
  internal = 8,
}
export const PackageResolutionStatusKeys = {
  1: "success",
  success: "success",
  2: "missingName",
  missingName: "missingName",
  3: "missingVersion",
  missingVersion: "missingVersion",
  4: "notFound",
  notFound: "notFound",
  5: "corruptPackage",
  corruptPackage: "corruptPackage",
  6: "rateLimit",
  rateLimit: "rateLimit",
  7: "invalidVersion",
  invalidVersion: "invalidVersion",
  8: "internal",
  internal: "internal",
};
export enum BareField {
  otherField = 1,
  moduleField = 2,
  browserField = 3,
  jsdelivrField = 4,
  mainField = 5,
  exportsField = 6,
  guessedField = 7,
}
export const BareFieldKeys = {
  1: "otherField",
  otherField: "otherField",
  2: "moduleField",
  moduleField: "moduleField",
  3: "browserField",
  browserField: "browserField",
  4: "jsdelivrField",
  jsdelivrField: "jsdelivrField",
  5: "mainField",
  mainField: "mainField",
  6: "exportsField",
  exportsField: "exportsField",
  7: "guessedField",
  guessedField: "guessedField",
};
export type timestamp = string;
export enum ErrorCode {
  generic = 1,
  missingPackageName = 2,
  serverDown = 3,
  versionDoesntExit = 4,
}
export const ErrorCodeKeys = {
  1: "generic",
  generic: "generic",
  2: "missingPackageName",
  missingPackageName: "missingPackageName",
  3: "serverDown",
  serverDown: "serverDown",
  4: "versionDoesntExit",
  versionDoesntExit: "versionDoesntExit",
};
export interface ExportsManifest {
  bare: alphanumeric[];
  source: alphanumeric[];
  destination: alphanumeric[];
  bareField: BareField[];
}

export interface ExportsManifestSingleton {
  bare: alphanumeric;
  source: alphanumeric[];
  destination: alphanumeric[];
  bareField: BareField;
}

export interface Version {
  major: int;
  minor: int;
  patch: int;
  range: VersionRange;
  pre: string;
  build: string;
}

export interface RawDependencyList {
  count: uint;
  names: alphanumeric[];
  versions: string[];
}

export interface JavascriptPackageManifest {
  count: uint;
  name: alphanumeric[];
  version: string[];
  dependencyIndex: uint[];
  provider: PackageProvider;
  exportsManifest: ExportsManifest;
  exportsManifestIndex: uint[];
  dependencies: uint[];
}

export interface ResolvedJavascriptPackageTag {
  name: alphanumeric;
  fromVersion: alphanumeric;
  version: Version;
}

export interface JavascriptPackageManifestPartial {
  name: alphanumeric;
  version: Version;
  provider: PackageProvider;
  status: PackageResolutionStatus;
  exportsManifest: ExportsManifestSingleton;
  dependencyNames: alphanumeric[];
  dependencyVersions: alphanumeric[];
  peerDependencyNames: alphanumeric[];
  peerDependencyVersions: alphanumeric[];
  devDependencyNames: alphanumeric[];
  devDependencyVersions: alphanumeric[];
}

export interface JavascriptPackageRequest {
  clientVersion?: string;
  name?: alphanumeric;
  enableDenylist?: boolean;
  manifest?: JavascriptPackageManifestPartial;
}

export interface JavascriptPackageResponse {
  name?: alphanumeric;
  result?: JavascriptPackageManifest;
  errorCode?: ErrorCode;
  message?: string;
  checksum?: string;
}

export declare function encodeExportsManifest(
  message: ExportsManifest,
  bb: ByteBuffer
): void;
export declare function decodeExportsManifest(
  buffer: ByteBuffer
): ExportsManifest;
export declare function encodeExportsManifestSingleton(
  message: ExportsManifestSingleton,
  bb: ByteBuffer
): void;
export declare function decodeExportsManifestSingleton(
  buffer: ByteBuffer
): ExportsManifestSingleton;
export declare function encodeVersion(message: Version, bb: ByteBuffer): void;
export declare function decodeVersion(buffer: ByteBuffer): Version;
export declare function encodeRawDependencyList(
  message: RawDependencyList,
  bb: ByteBuffer
): void;
export declare function decodeRawDependencyList(
  buffer: ByteBuffer
): RawDependencyList;
export declare function encodeJavascriptPackageManifest(
  message: JavascriptPackageManifest,
  bb: ByteBuffer
): void;
export declare function decodeJavascriptPackageManifest(
  buffer: ByteBuffer
): JavascriptPackageManifest;
export declare function encodeResolvedJavascriptPackageTag(
  message: ResolvedJavascriptPackageTag,
  bb: ByteBuffer
): void;
export declare function decodeResolvedJavascriptPackageTag(
  buffer: ByteBuffer
): ResolvedJavascriptPackageTag;
export declare function encodeJavascriptPackageManifestPartial(
  message: JavascriptPackageManifestPartial,
  bb: ByteBuffer
): void;
export declare function decodeJavascriptPackageManifestPartial(
  buffer: ByteBuffer
): JavascriptPackageManifestPartial;
export declare function encodeJavascriptPackageRequest(
  message: JavascriptPackageRequest,
  bb: ByteBuffer
): void;
export declare function decodeJavascriptPackageRequest(
  buffer: ByteBuffer
): JavascriptPackageRequest;
export declare function encodeJavascriptPackageResponse(
  message: JavascriptPackageResponse,
  bb: ByteBuffer
): void;
export declare function decodeJavascriptPackageResponse(
  buffer: ByteBuffer
): JavascriptPackageResponse;
