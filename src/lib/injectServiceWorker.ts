if (globalThis.navigator.serviceWorker) {
  globalThis.navigator.serviceWorker
    .register("/_dev_/service-worker.js", { scope: "/" })
    .then(function (registration) {
      console.log("ServiceWorker registration successful!");
      globalThis.navigator.serviceWorker.startMessages();
      const controller = globalThis.navigator.serviceWorker.controller;
      controller.addEventListener("message", () => {});

      // setInterval(() => {
      //   controller.postMessage(1);
      // }, 32);
    })
    .catch(function (err) {
      console.log("ServiceWorker registration failed: ", err);
    });
}
