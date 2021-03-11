import IDLE_WORKER_URL from "src/_dev_/IdleWorker.jsurl";

if (typeof SharedWorker !== "undefined" && !globalThis["IDLE_WORKER"]) {
  // globalThis["IDLE_WORKER"] = new SharedWorker(IDLE_WORKER_URL, {
  //   type: "module",
  //   name: "IdleWorker",
  // });
  // console.log("Launch idle worker");
}
