import htmlLoader from "dist/htmlLoader.jsfile";
import cheerio from "cheerio";
import {
  parseDocument,
  DomUtils,
  Parser,
  DomHandler,
  ElementType,
} from "htmlparser2";
import * as serializer from "dom-serializer";

// function removeElement(node: Node) {
//   DomUtils.removeElement(node);
// }

export function generateHTML(packageName: string, source: string) {
  const dom = parseDocument(source);
  for (let node of DomUtils.getElementsByTagName("script", dom, true)) {
    node.tagName = "script-template";
  }
  const handler = new DomHandler((err, elems) => {
    DomUtils.appendChild(
      DomUtils.getElementsByTagName("body", dom, true)[0] ||
        DomUtils.getElementsByTagName("html", dom, true)[0],
      elems[0]
    );
  });
  var parser = new Parser(handler);
  parser.write(
    `<script module>${htmlLoader
      .replace(/globalThis.PACKAGE_ID/gm, packageName)
      .replace(/globalThis.WORKER_URL/gm, `"` + location.href + `"`)}</script>`
  );
  parser.end();

  const handler2 = new DomHandler((err, elems) => {
    DomUtils.prependChild(
      DomUtils.getElementsByTagName("head", dom, true)[0] ||
        DomUtils.getElementsByTagName("html", dom, true)[0],
      elems[0]
    );
  });

  var parser2 = new Parser(handler2);
  parser2.write(`<base href="/local/${packageName}/"></base>`);
  parser2.end();

  return serializer.default(dom, {});
}
