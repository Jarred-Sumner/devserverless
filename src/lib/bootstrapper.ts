import { IDLE_WORKER_CODE } from "src/htmlGenerator";
import { ErrorCode } from "src/lib/ErrorCode";

export function bootstrap(sourceUrl: string) {
  return `
${IDLE_WORKER_CODE}

async function start() {
  try {
    const process = {
      env: {
        NODE_ENV: "development"
      }
    };

    globalThis.process = new Proxy(process, {
      enumerate: function (oTarget, sKey) {
        return [];
      },
      ownKeys: function (oTarget, sKey) {
        return [];
      },
    });

    const _exports = await import("${sourceUrl}");
    Object.assign(globalThis, _exports);
  } catch(exception) {
    const orig = exception;
    setTimeout(() => {

    }, 1);
    throw exception;
  }
}

await start();
  `;
}
