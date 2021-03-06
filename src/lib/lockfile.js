const PackageProvider = {
  "1": 1,
  "2": 2,
  "3": 3,
  "4": 4,
  "5": 5,
  "6": 6,
  "7": 7,
  "npm": 1,
  "git": 2,
  "https": 3,
  "tgz": 4,
  "disk": 5,
  "other": 6,
  "github": 7
};
const PackageProviderKeys = {
  "1": "npm",
  "2": "git",
  "3": "https",
  "4": "tgz",
  "5": "disk",
  "6": "other",
  "7": "github",
  "npm": "npm",
  "git": "git",
  "https": "https",
  "tgz": "tgz",
  "disk": "disk",
  "other": "other",
  "github": "github"
};
const PackageVersionProtocol = {
  "1": 1,
  "2": 2,
  "3": 3,
  "4": 4,
  "5": 5,
  "6": 6,
  "7": 7,
  "8": 8,
  "9": 9,
  "10": 10,
  "11": 11,
  "12": 12,
  "github_bare": 1,
  "github_dot_com": 2,
  "github_tarball": 3,
  "github_owner_repo": 4,
  "http": 5,
  "https": 6,
  "https_tarball": 7,
  "http_tarball": 8,
  "git": 9,
  "git_ssh": 10,
  "pathlike": 11,
  "default": 12
};
const PackageVersionProtocolKeys = {
  "1": "github_bare",
  "2": "github_dot_com",
  "3": "github_tarball",
  "4": "github_owner_repo",
  "5": "http",
  "6": "https",
  "7": "https_tarball",
  "8": "http_tarball",
  "9": "git",
  "10": "git_ssh",
  "11": "pathlike",
  "12": "default",
  "github_bare": "github_bare",
  "github_dot_com": "github_dot_com",
  "github_tarball": "github_tarball",
  "github_owner_repo": "github_owner_repo",
  "http": "http",
  "https": "https",
  "https_tarball": "https_tarball",
  "http_tarball": "http_tarball",
  "git": "git",
  "git_ssh": "git_ssh",
  "pathlike": "pathlike",
  "default": "default"
};
const VersionRange = {
  "1": 1,
  "2": 2,
  "3": 3,
  "4": 4,
  "5": 5,
  "6": 6,
  "exact": 1,
  "tilda": 2,
  "caret": 3,
  "range": 4,
  "unknown": 5,
  "wildcard": 6
};
const VersionRangeKeys = {
  "1": "exact",
  "2": "tilda",
  "3": "caret",
  "4": "range",
  "5": "unknown",
  "6": "wildcard",
  "exact": "exact",
  "tilda": "tilda",
  "caret": "caret",
  "range": "range",
  "unknown": "unknown",
  "wildcard": "wildcard"
};
const PackageResolutionStatus = {
  "1": 1,
  "2": 2,
  "3": 3,
  "4": 4,
  "5": 5,
  "6": 6,
  "7": 7,
  "8": 8,
  "success": 1,
  "missingName": 2,
  "missingVersion": 3,
  "notFound": 4,
  "corruptPackage": 5,
  "rateLimit": 6,
  "invalidVersion": 7,
  "internal": 8
};
const PackageResolutionStatusKeys = {
  "1": "success",
  "2": "missingName",
  "3": "missingVersion",
  "4": "notFound",
  "5": "corruptPackage",
  "6": "rateLimit",
  "7": "invalidVersion",
  "8": "internal",
  "success": "success",
  "missingName": "missingName",
  "missingVersion": "missingVersion",
  "notFound": "notFound",
  "corruptPackage": "corruptPackage",
  "rateLimit": "rateLimit",
  "invalidVersion": "invalidVersion",
  "internal": "internal"
};
const BareField = {
  "1": 1,
  "2": 2,
  "3": 3,
  "4": 4,
  "5": 5,
  "6": 6,
  "7": 7,
  "otherField": 1,
  "moduleField": 2,
  "browserField": 3,
  "jsdelivrField": 4,
  "mainField": 5,
  "exportsField": 6,
  "guessedField": 7
};
const BareFieldKeys = {
  "1": "otherField",
  "2": "moduleField",
  "3": "browserField",
  "4": "jsdelivrField",
  "5": "mainField",
  "6": "exportsField",
  "7": "guessedField",
  "otherField": "otherField",
  "moduleField": "moduleField",
  "browserField": "browserField",
  "jsdelivrField": "jsdelivrField",
  "mainField": "mainField",
  "exportsField": "exportsField",
  "guessedField": "guessedField"
};

function decodeExportsManifest(bb) {
  var result = {};

  var length = bb.readVarUint();
  var values = result["bare"] = Array(length);
  for (var i = 0; i < length; i++) values[i] = bb.readAlphanumeric();
  var length = bb.readVarUint();
  var values = result["source"] = Array(length);
  for (var i = 0; i < length; i++) values[i] = bb.readAlphanumeric();
  var length = bb.readVarUint();
  var values = result["destination"] = Array(length);
  for (var i = 0; i < length; i++) values[i] = bb.readAlphanumeric();
  var length = bb.readVarUint();
  var values = result["bareField"] = Array(length);
  for (var i = 0; i < length; i++) values[i] = BareField[bb.readByte()];
  return result;
}

function encodeExportsManifest(message, bb) {

  var value = message["bare"];
  if (value != null) {
    var values = value, n = values.length;
    bb.writeVarUint(n);
    for (var i = 0; i < n; i++) {
      value = values[i];
      bb.writeAlphanumeric(value);
    }
  } else {
    throw new Error("Missing required field \"bare\"");
  }

  var value = message["source"];
  if (value != null) {
    var values = value, n = values.length;
    bb.writeVarUint(n);
    for (var i = 0; i < n; i++) {
      value = values[i];
      bb.writeAlphanumeric(value);
    }
  } else {
    throw new Error("Missing required field \"source\"");
  }

  var value = message["destination"];
  if (value != null) {
    var values = value, n = values.length;
    bb.writeVarUint(n);
    for (var i = 0; i < n; i++) {
      value = values[i];
      bb.writeAlphanumeric(value);
    }
  } else {
    throw new Error("Missing required field \"destination\"");
  }

  var value = message["bareField"];
  if (value != null) {
    var values = value, n = values.length;
    bb.writeVarUint(n);
    for (var i = 0; i < n; i++) {
      value = values[i];
      var encoded = BareField[value];
if (encoded === void 0) throw new Error("Invalid value " + JSON.stringify(value) + " for enum \"BareField\"");
bb.writeByte(encoded);
    }
  } else {
    throw new Error("Missing required field \"bareField\"");
  }

}

function decodeExportsManifestSingleton(bb) {
  var result = {};

  result["bare"] = bb.readAlphanumeric();
  var length = bb.readVarUint();
  var values = result["source"] = Array(length);
  for (var i = 0; i < length; i++) values[i] = bb.readAlphanumeric();
  var length = bb.readVarUint();
  var values = result["destination"] = Array(length);
  for (var i = 0; i < length; i++) values[i] = bb.readAlphanumeric();
  result["bareField"] = BareField[bb.readByte()];
  return result;
}

function encodeExportsManifestSingleton(message, bb) {

  var value = message["bare"];
  if (value != null) {
    bb.writeAlphanumeric(value);
  } else {
    throw new Error("Missing required field \"bare\"");
  }

  var value = message["source"];
  if (value != null) {
    var values = value, n = values.length;
    bb.writeVarUint(n);
    for (var i = 0; i < n; i++) {
      value = values[i];
      bb.writeAlphanumeric(value);
    }
  } else {
    throw new Error("Missing required field \"source\"");
  }

  var value = message["destination"];
  if (value != null) {
    var values = value, n = values.length;
    bb.writeVarUint(n);
    for (var i = 0; i < n; i++) {
      value = values[i];
      bb.writeAlphanumeric(value);
    }
  } else {
    throw new Error("Missing required field \"destination\"");
  }

  var value = message["bareField"];
  if (value != null) {
    var encoded = BareField[value];
if (encoded === void 0) throw new Error("Invalid value " + JSON.stringify(value) + " for enum \"BareField\"");
bb.writeByte(encoded);
  } else {
    throw new Error("Missing required field \"bareField\"");
  }

}

function decodeVersion(bb) {
  var result = {};

  result["protocol"] = PackageVersionProtocol[bb.readByte()];
  result["versionRange"] = VersionRange[bb.readByte()];
  result["originalTag"] = bb.readAlphanumeric();
  result["tag"] = bb.readAlphanumeric();
  return result;
}

function encodeVersion(message, bb) {

  var value = message["protocol"];
  if (value != null) {
    var encoded = PackageVersionProtocol[value];
if (encoded === void 0) throw new Error("Invalid value " + JSON.stringify(value) + " for enum \"PackageVersionProtocol\"");
bb.writeByte(encoded);
  } else {
    throw new Error("Missing required field \"protocol\"");
  }

  var value = message["versionRange"];
  if (value != null) {
    var encoded = VersionRange[value];
if (encoded === void 0) throw new Error("Invalid value " + JSON.stringify(value) + " for enum \"VersionRange\"");
bb.writeByte(encoded);
  } else {
    throw new Error("Missing required field \"versionRange\"");
  }

  var value = message["originalTag"];
  if (value != null) {
    bb.writeAlphanumeric(value);
  } else {
    throw new Error("Missing required field \"originalTag\"");
  }

  var value = message["tag"];
  if (value != null) {
    bb.writeAlphanumeric(value);
  } else {
    throw new Error("Missing required field \"tag\"");
  }

}

function decodeRawDependencyList(bb) {
  var result = {};

  result["count"] = bb.readVarUint();
  var length = bb.readVarUint();
  var values = result["names"] = Array(length);
  for (var i = 0; i < length; i++) values[i] = bb.readAlphanumeric();
  var length = bb.readVarUint();
  var values = result["versions"] = Array(length);
  for (var i = 0; i < length; i++) values[i] = bb.readString();
  return result;
}

function encodeRawDependencyList(message, bb) {

  var value = message["count"];
  if (value != null) {
    bb.writeVarUint(value);
  } else {
    throw new Error("Missing required field \"count\"");
  }

  var value = message["names"];
  if (value != null) {
    var values = value, n = values.length;
    bb.writeVarUint(n);
    for (var i = 0; i < n; i++) {
      value = values[i];
      bb.writeAlphanumeric(value);
    }
  } else {
    throw new Error("Missing required field \"names\"");
  }

  var value = message["versions"];
  if (value != null) {
    var values = value, n = values.length;
    bb.writeVarUint(n);
    for (var i = 0; i < n; i++) {
      value = values[i];
      bb.writeString(value);
    }
  } else {
    throw new Error("Missing required field \"versions\"");
  }

}

function decodeJavascriptPackageManifest(bb) {
  var result = {};

  result["hash"] = bb.readString();
  result["count"] = bb.readVarUint();
  var length = bb.readVarUint();
  var values = result["name"] = Array(length);
  for (var i = 0; i < length; i++) values[i] = bb.readAlphanumeric();
  var length = bb.readVarUint();
  var values = result["version"] = Array(length);
  for (var i = 0; i < length; i++) values[i] = bb.readString();
  var length = bb.readVarUint();
  var values = result["dependencyIndex"] = Array(length);
  for (var i = 0; i < length; i++) values[i] = bb.readVarUint();
  result["provider"] = PackageProvider[bb.readByte()];
  result["exportsManifest"] = decodeExportsManifest(bb);
  var length = bb.readVarUint();
  var values = result["exportsManifestIndex"] = Array(length);
  for (var i = 0; i < length; i++) values[i] = bb.readVarUint();
  var length = bb.readVarUint();
  var values = result["dependencies"] = Array(length);
  for (var i = 0; i < length; i++) values[i] = bb.readVarUint();
  return result;
}

function encodeJavascriptPackageManifest(message, bb) {

  var value = message["hash"];
  if (value != null) {
    bb.writeString(value);
  } else {
    throw new Error("Missing required field \"hash\"");
  }

  var value = message["count"];
  if (value != null) {
    bb.writeVarUint(value);
  } else {
    throw new Error("Missing required field \"count\"");
  }

  var value = message["name"];
  if (value != null) {
    var values = value, n = values.length;
    bb.writeVarUint(n);
    for (var i = 0; i < n; i++) {
      value = values[i];
      bb.writeAlphanumeric(value);
    }
  } else {
    throw new Error("Missing required field \"name\"");
  }

  var value = message["version"];
  if (value != null) {
    var values = value, n = values.length;
    bb.writeVarUint(n);
    for (var i = 0; i < n; i++) {
      value = values[i];
      bb.writeString(value);
    }
  } else {
    throw new Error("Missing required field \"version\"");
  }

  var value = message["dependencyIndex"];
  if (value != null) {
    var values = value, n = values.length;
    bb.writeVarUint(n);
    for (var i = 0; i < n; i++) {
      value = values[i];
      bb.writeVarUint(value);
    }
  } else {
    throw new Error("Missing required field \"dependencyIndex\"");
  }

  var value = message["provider"];
  if (value != null) {
    var encoded = PackageProvider[value];
if (encoded === void 0) throw new Error("Invalid value " + JSON.stringify(value) + " for enum \"PackageProvider\"");
bb.writeByte(encoded);
  } else {
    throw new Error("Missing required field \"provider\"");
  }

  var value = message["exportsManifest"];
  if (value != null) {
    encodeExportsManifest(value, bb);
  } else {
    throw new Error("Missing required field \"exportsManifest\"");
  }

  var value = message["exportsManifestIndex"];
  if (value != null) {
    var values = value, n = values.length;
    bb.writeVarUint(n);
    for (var i = 0; i < n; i++) {
      value = values[i];
      bb.writeVarUint(value);
    }
  } else {
    throw new Error("Missing required field \"exportsManifestIndex\"");
  }

  var value = message["dependencies"];
  if (value != null) {
    var values = value, n = values.length;
    bb.writeVarUint(n);
    for (var i = 0; i < n; i++) {
      value = values[i];
      bb.writeVarUint(value);
    }
  } else {
    throw new Error("Missing required field \"dependencies\"");
  }

}

function decodeResolvedJavascriptPackageTag(bb) {
  var result = {};

  result["name"] = bb.readAlphanumeric();
  result["fromVersion"] = bb.readAlphanumeric();
  result["version"] = decodeVersion(bb);
  return result;
}

function encodeResolvedJavascriptPackageTag(message, bb) {

  var value = message["name"];
  if (value != null) {
    bb.writeAlphanumeric(value);
  } else {
    throw new Error("Missing required field \"name\"");
  }

  var value = message["fromVersion"];
  if (value != null) {
    bb.writeAlphanumeric(value);
  } else {
    throw new Error("Missing required field \"fromVersion\"");
  }

  var value = message["version"];
  if (value != null) {
    encodeVersion(value, bb);
  } else {
    throw new Error("Missing required field \"version\"");
  }

}

function decodeJavascriptPackageManifestPartial(bb) {
  var result = {};

  result["name"] = bb.readAlphanumeric();
  result["version"] = decodeVersion(bb);
  result["provider"] = PackageProvider[bb.readByte()];
  result["status"] = PackageResolutionStatus[bb.readByte()];
  result["exportsManifest"] = decodeExportsManifestSingleton(bb);
  var length = bb.readVarUint();
  var values = result["dependencyNames"] = Array(length);
  for (var i = 0; i < length; i++) values[i] = bb.readAlphanumeric();
  var length = bb.readVarUint();
  var values = result["dependencyVersions"] = Array(length);
  for (var i = 0; i < length; i++) values[i] = bb.readAlphanumeric();
  var length = bb.readVarUint();
  var values = result["peerDependencyNames"] = Array(length);
  for (var i = 0; i < length; i++) values[i] = bb.readAlphanumeric();
  var length = bb.readVarUint();
  var values = result["peerDependencyVersions"] = Array(length);
  for (var i = 0; i < length; i++) values[i] = bb.readAlphanumeric();
  var length = bb.readVarUint();
  var values = result["devDependencyNames"] = Array(length);
  for (var i = 0; i < length; i++) values[i] = bb.readAlphanumeric();
  var length = bb.readVarUint();
  var values = result["devDependencyVersions"] = Array(length);
  for (var i = 0; i < length; i++) values[i] = bb.readAlphanumeric();
  var length = bb.readVarUint();
  var values = result["scriptKeys"] = Array(length);
  for (var i = 0; i < length; i++) values[i] = bb.readString();
  var length = bb.readVarUint();
  var values = result["scriptValues"] = Array(length);
  for (var i = 0; i < length; i++) values[i] = bb.readString();
  var length = bb.readVarUint();
  var values = result["binKeys"] = Array(length);
  for (var i = 0; i < length; i++) values[i] = bb.readString();
  var length = bb.readVarUint();
  var values = result["binValues"] = Array(length);
  for (var i = 0; i < length; i++) values[i] = bb.readString();
  result["hasPostInstall"] = !!bb.readByte();
  return result;
}

function encodeJavascriptPackageManifestPartial(message, bb) {

  var value = message["name"];
  if (value != null) {
    bb.writeAlphanumeric(value);
  } else {
    throw new Error("Missing required field \"name\"");
  }

  var value = message["version"];
  if (value != null) {
    encodeVersion(value, bb);
  } else {
    throw new Error("Missing required field \"version\"");
  }

  var value = message["provider"];
  if (value != null) {
    var encoded = PackageProvider[value];
if (encoded === void 0) throw new Error("Invalid value " + JSON.stringify(value) + " for enum \"PackageProvider\"");
bb.writeByte(encoded);
  } else {
    throw new Error("Missing required field \"provider\"");
  }

  var value = message["status"];
  if (value != null) {
    var encoded = PackageResolutionStatus[value];
if (encoded === void 0) throw new Error("Invalid value " + JSON.stringify(value) + " for enum \"PackageResolutionStatus\"");
bb.writeByte(encoded);
  } else {
    throw new Error("Missing required field \"status\"");
  }

  var value = message["exportsManifest"];
  if (value != null) {
    encodeExportsManifestSingleton(value, bb);
  } else {
    throw new Error("Missing required field \"exportsManifest\"");
  }

  var value = message["dependencyNames"];
  if (value != null) {
    var values = value, n = values.length;
    bb.writeVarUint(n);
    for (var i = 0; i < n; i++) {
      value = values[i];
      bb.writeAlphanumeric(value);
    }
  } else {
    throw new Error("Missing required field \"dependencyNames\"");
  }

  var value = message["dependencyVersions"];
  if (value != null) {
    var values = value, n = values.length;
    bb.writeVarUint(n);
    for (var i = 0; i < n; i++) {
      value = values[i];
      bb.writeAlphanumeric(value);
    }
  } else {
    throw new Error("Missing required field \"dependencyVersions\"");
  }

  var value = message["peerDependencyNames"];
  if (value != null) {
    var values = value, n = values.length;
    bb.writeVarUint(n);
    for (var i = 0; i < n; i++) {
      value = values[i];
      bb.writeAlphanumeric(value);
    }
  } else {
    throw new Error("Missing required field \"peerDependencyNames\"");
  }

  var value = message["peerDependencyVersions"];
  if (value != null) {
    var values = value, n = values.length;
    bb.writeVarUint(n);
    for (var i = 0; i < n; i++) {
      value = values[i];
      bb.writeAlphanumeric(value);
    }
  } else {
    throw new Error("Missing required field \"peerDependencyVersions\"");
  }

  var value = message["devDependencyNames"];
  if (value != null) {
    var values = value, n = values.length;
    bb.writeVarUint(n);
    for (var i = 0; i < n; i++) {
      value = values[i];
      bb.writeAlphanumeric(value);
    }
  } else {
    throw new Error("Missing required field \"devDependencyNames\"");
  }

  var value = message["devDependencyVersions"];
  if (value != null) {
    var values = value, n = values.length;
    bb.writeVarUint(n);
    for (var i = 0; i < n; i++) {
      value = values[i];
      bb.writeAlphanumeric(value);
    }
  } else {
    throw new Error("Missing required field \"devDependencyVersions\"");
  }

  var value = message["scriptKeys"];
  if (value != null) {
    var values = value, n = values.length;
    bb.writeVarUint(n);
    for (var i = 0; i < n; i++) {
      value = values[i];
      bb.writeString(value);
    }
  } else {
    throw new Error("Missing required field \"scriptKeys\"");
  }

  var value = message["scriptValues"];
  if (value != null) {
    var values = value, n = values.length;
    bb.writeVarUint(n);
    for (var i = 0; i < n; i++) {
      value = values[i];
      bb.writeString(value);
    }
  } else {
    throw new Error("Missing required field \"scriptValues\"");
  }

  var value = message["binKeys"];
  if (value != null) {
    var values = value, n = values.length;
    bb.writeVarUint(n);
    for (var i = 0; i < n; i++) {
      value = values[i];
      bb.writeString(value);
    }
  } else {
    throw new Error("Missing required field \"binKeys\"");
  }

  var value = message["binValues"];
  if (value != null) {
    var values = value, n = values.length;
    bb.writeVarUint(n);
    for (var i = 0; i < n; i++) {
      value = values[i];
      bb.writeString(value);
    }
  } else {
    throw new Error("Missing required field \"binValues\"");
  }

  var value = message["hasPostInstall"];
  if (value != null) {
    bb.writeByte(value);
  } else {
    throw new Error("Missing required field \"hasPostInstall\"");
  }

}

function decodeJavascriptPackageRequest(bb) {
  var result = {};

  while (true) {
    switch (bb.readVarUint()) {
    case 0:
      return result;

    case 1:
      result["clientVersion"] = bb.readString();
      break;

    case 2:
      result["name"] = bb.readAlphanumeric();
      break;

    case 3:
      result["enableDenylist"] = !!bb.readByte();
      break;

    case 4:
      result["manifest"] = decodeJavascriptPackageManifestPartial(bb);
      break;

    default:
      throw new Error("Attempted to parse invalid message");
    }
  }
}

function encodeJavascriptPackageRequest(message, bb) {

  var value = message["clientVersion"];
  if (value != null) {
    bb.writeVarUint(1);
    bb.writeString(value);
  }

  var value = message["name"];
  if (value != null) {
    bb.writeVarUint(2);
    bb.writeAlphanumeric(value);
  }

  var value = message["enableDenylist"];
  if (value != null) {
    bb.writeVarUint(3);
    bb.writeByte(value);
  }

  var value = message["manifest"];
  if (value != null) {
    bb.writeVarUint(4);
    encodeJavascriptPackageManifestPartial(value, bb);
  }
  bb.writeVarUint(0);

}
const ErrorCode = {
  "1": 1,
  "2": 2,
  "3": 3,
  "4": 4,
  "generic": 1,
  "missingPackageName": 2,
  "serverDown": 3,
  "versionDoesntExit": 4
};
const ErrorCodeKeys = {
  "1": "generic",
  "2": "missingPackageName",
  "3": "serverDown",
  "4": "versionDoesntExit",
  "generic": "generic",
  "missingPackageName": "missingPackageName",
  "serverDown": "serverDown",
  "versionDoesntExit": "versionDoesntExit"
};

function decodeJavascriptPackageResponse(bb) {
  var result = {};

  while (true) {
    switch (bb.readVarUint()) {
    case 0:
      return result;

    case 1:
      result["name"] = bb.readAlphanumeric();
      break;

    case 2:
      result["result"] = decodeJavascriptPackageManifest(bb);
      break;

    case 3:
      result["errorCode"] = ErrorCode[bb.readVarUint()];
      break;

    case 4:
      result["message"] = bb.readString();
      break;

    case 5:
      result["checksum"] = bb.readString();
      break;

    default:
      throw new Error("Attempted to parse invalid message");
    }
  }
}

function encodeJavascriptPackageResponse(message, bb) {

  var value = message["name"];
  if (value != null) {
    bb.writeVarUint(1);
    bb.writeAlphanumeric(value);
  }

  var value = message["result"];
  if (value != null) {
    bb.writeVarUint(2);
    encodeJavascriptPackageManifest(value, bb);
  }

  var value = message["errorCode"];
  if (value != null) {
    bb.writeVarUint(3);
    var encoded = ErrorCode[value];
if (encoded === void 0) throw new Error("Invalid value " + JSON.stringify(value) + " for enum \"ErrorCode\"");
bb.writeVarUint(encoded);
  }

  var value = message["message"];
  if (value != null) {
    bb.writeVarUint(4);
    bb.writeString(value);
  }

  var value = message["checksum"];
  if (value != null) {
    bb.writeVarUint(5);
    bb.writeString(value);
  }
  bb.writeVarUint(0);

}

export { PackageProvider }
export { PackageProviderKeys }
export { PackageVersionProtocol }
export { PackageVersionProtocolKeys }
export { VersionRange }
export { VersionRangeKeys }
export { PackageResolutionStatus }
export { PackageResolutionStatusKeys }
export { BareField }
export { BareFieldKeys }
export { decodeExportsManifest }
export { encodeExportsManifest }
export { decodeExportsManifestSingleton }
export { encodeExportsManifestSingleton }
export { decodeVersion }
export { encodeVersion }
export { decodeRawDependencyList }
export { encodeRawDependencyList }
export { decodeJavascriptPackageManifest }
export { encodeJavascriptPackageManifest }
export { decodeResolvedJavascriptPackageTag }
export { encodeResolvedJavascriptPackageTag }
export { decodeJavascriptPackageManifestPartial }
export { encodeJavascriptPackageManifestPartial }
export { decodeJavascriptPackageRequest }
export { encodeJavascriptPackageRequest }
export { ErrorCode }
export { ErrorCodeKeys }
export { decodeJavascriptPackageResponse }
export { encodeJavascriptPackageResponse }