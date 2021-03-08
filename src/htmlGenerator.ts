import * as serializer from "dom-serializer";
import { DomHandler, DomUtils, parseDocument, Parser } from "htmlparser2";
import IDLE_WORKER_URL from "src/lib/IdleWorker.jsurl";

// function removeElement(node: Node) {
//   DomUtils.removeElement(node);
// }
export const IDLE_WORKER_CODE = `
  if (typeof SharedWorker !== "undefined" && !globalThis["IDLE_WORKER"]) {
    globalThis["IDLE_WORKER"] = new SharedWorker("${IDLE_WORKER_URL}", {
      type: "module",
      name: "IdleWorker",
    });
  }
`;

export function generateHTML(packageName: string, source: string) {
  const dom = parseDocument(source);
  // for (let node of DomUtils.getElementsByTagName("script", dom, true)) {
  //   node.tagName = "script-template";
  // }
  // const handler = new DomHandler((err, elems) => {
  //   DomUtils.appendChild(
  //     DomUtils.getElementsByTagName("body", dom, true)[0] ||
  //       DomUtils.getElementsByTagName("html", dom, true)[0],
  //     elems[0]
  //   );
  // });

  const handler2 = new DomHandler((err, elems) => {
    DomUtils.prependChild(
      DomUtils.getElementsByTagName("head", dom, true)[0] ||
        DomUtils.getElementsByTagName("html", dom, true)[0],
      elems[0]
    );
    DomUtils.prependChild(
      DomUtils.getElementsByTagName("head", dom, true)[0] ||
        DomUtils.getElementsByTagName("html", dom, true)[0],
      elems[1]
    );
  });

  var parser2 = new Parser(handler2);
  parser2.write(
    `<base href="/local/${packageName}"></base><script>${IDLE_WORKER_CODE}</script>`
  );
  parser2.end();

  return serializer.default(dom, {});
}
