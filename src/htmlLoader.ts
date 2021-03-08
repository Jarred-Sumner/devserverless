import { getCache } from "src/lib/getCache";
import { Packager } from "src/lib/Packager";
import { OutputParams } from "src/lib/rpc";
const start = performance.now();

function findHTMLForPage(pages: OutputParams["pages"]) {
  if (pages.size === 1) {
    for (let value of pages.values()) {
      return value;
    }
  }

  const basename = location.pathname.replace(
    "/local/globalThis.PACKAGE_ID/",
    ""
  );

  let key = basename + ".html";
  if (pages.has(key)) {
    return pages.get(key);
  }

  key = basename + "index.html";

  if (pages.has(key)) {
    return pages.get(key);
  }
}

class HTMLLoader {
  constructor() {
    this.packager = new Packager();
  }
  packager: Packager;

  init() {
    this.packager.start();
  }

  onComplete = async (params: OutputParams) => {
    if (!params.pages || params.pages.size === 0) {
      document.documentElement.innerText = JSON.stringify(params, null, 2);
      return;
    }

    const page = findHTMLForPage(params.pages);

    if (page) {
      const baseTag = document.querySelector("base");
      const parser = new DOMParser();
      const newDoc = parser.parseFromString(page, "text/html");
      for (let script of newDoc.querySelectorAll("script").values()) {
        document.body.appendChild(script);
      }

      const hrSyncPoint = performance.now();
      const timeOrigin = Date.now() - hrSyncPoint;

      console.log(
        `[DevServer] Bundled in ${Math.floor(
          Date.now() - performance.timing.navigationStart
        )}ms`
      );
    } else {
    }
  };
  bundle(id: string) {
    this.packager.onBundleComplete = this.onComplete;
    this.packager.bundleById(id, location.origin);
  }
}

globalThis["ESRUN_HTMLLoader"] = new HTMLLoader();

async function go() {
  await globalThis["ESRUN_HTMLLoader"].init();
  await globalThis["ESRUN_HTMLLoader"].bundle("globalThis.PACKAGE_ID");
}

go();
