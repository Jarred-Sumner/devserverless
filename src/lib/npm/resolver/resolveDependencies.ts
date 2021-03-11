import isEqual from "lodash/isEqual";
import merge from "lodash/merge";
import { Resolver, NpmHttpRegistry } from "./turbo-resolver";

export function resolveDependencies(dependencies) {
  const resolver = new Resolver({
    validatePeers: false,
    registry: new NpmHttpRegistry({
      registryUrl: "https://registry.npmjs.cf/",
    }),
    timeout: 9999999,
  });

  return resolver.resolve(dependencies);
}

export function resolveImports(imports) {
  const dependencies = {};

  imports.forEach((importName) => {
    if (!dependencies[importName]) {
      dependencies[importName] = "*";
    }
  });

  if (isEqual(defaults, dependencies)) {
    return { appDependencies: {}, resDependencies: {} };
  } else {
    return resolveDependencies(dependencies);
  }
}
