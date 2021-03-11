const fs = require("fs");
const util = require("util");
const read = util.promisify(fs.readFile);

async function readManifest({ outputs }) {
  const list = Object.keys(outputs)
    .filter((a) => !a.endsWith(".map"))
    .map((a) => a.replace("dist/", "/"))
    .map((a) => (a.includes("_dev_") ? a : "/_dev_" + a));

  if (list.includes("/_dev_/ServiceWorker.jsurl")) {
    list.splice(list.indexOf("/_dev_/ServiceWorker.jsurl"), 1);
  }

  if (list.includes("/_dev_/worker.jsurl")) {
    list.splice(list.indexOf("/_dev_/worker.jsurl"), 1);
  }

  return list;
}

module.exports = (builds) => ({
  name: "cacheManifestPlugin",
  setup(builder) {
    builder.onResolve({ filter: /preload-manifest/ }, (args) => {
      return {
        path: "preload-manifest",
        namespace: "cache-manifest-plugin",
      };
    });

    builder.onLoad({ filter: /preload-manifest/ }, async (args) => {
      const content = [];
      for (let build of builds) {
        content.push(...(await readManifest(build.metafile)));
      }
      return {
        contents: JSON.stringify([...new Set(content)], null, 2),
        loader: "json",
      };
    });
  },
});
