import { parseFromString, resolve } from "@import-maps/resolve";
import fs from "fs";
import Bluebird from "bluebird";
import fetch from "node-fetch";

// create a base URL to resolve imports relatively to
const baseURL = new URL("https://www.example.com/");

const importMap = parseFromString(
  fs.readFileSync(process.argv[process.argv.length - 1], "utf8"),
  baseURL
);

const start = Date.now();
console.log("Loaded import map.");
let successCount = 0;
let errorCount = 0;
function processKey(key) {
  const { resolvedImport, matched } = resolve(key, importMap, baseURL);
  if (matched) {
    return fetch(resolvedImport.href, { redirect: "follow" }).then((resp) => {
      if (resp.ok) {
        successCount++;
        console.log("✅", key.padEnd(30, " "), resolvedImport.href);
      } else {
        errorCount++;
        console.log("❌", key.padEnd(30, " "), resolvedImport.href);
      }
    });
  }
}

Bluebird.map(
  Object.keys(importMap.imports).filter((k) => !k.endsWith("/")),
  processKey,
  { concurrency: 10 }
).then((a) => {
  const total = successCount + errorCount;
  console.log("---------");
  console.log(`✅✅✅ ${successCount}/${total} succeeded`);
  console.log(`❌❌❌ ${errorCount}/${total} failed`);
  console.log("---------");
  console.log(`Fetched ${successCount} in ${Math.round(Date.now() - start)}ms`);
});
