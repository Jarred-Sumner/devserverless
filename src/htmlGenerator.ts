import * as serializer from "dom-serializer";
import { DomHandler, DomUtils, parseDocument, Parser } from "htmlparser2";

// function removeElement(node: Node) {
//   DomUtils.removeElement(node);
// }
export const IDLE_WORKER_CODE = `


  if (globalThis.navigator.serviceWorker && !globalThis["REGISTERED_SERVICE_WORKER"]) {
    globalThis
      .navigator
      .serviceWorker
      .register("/service-worker.js", {scope: '/'})
      .then(function (registration) {})
      .catch(function (err) {});
    globalThis["REGISTERED_SERVICE_WORKER"] = true;
  }
`;

export function generateHTML(packageName: string, source: string) {
  // service workers are not allowed
  for (let linkTag of DomUtils.getElementsByTagName("link", dom)) {
    if (linkTag.attribs["rel"] === "manifest") {
      DomUtils.removeElement(linkTag);
    }
  }

  var parser2 = new Parser(handler2);
  parser2.write(`<script module>${IDLE_WORKER_CODE}</script>`);
  parser2.end();

  return serializer.default(dom, {});
}
