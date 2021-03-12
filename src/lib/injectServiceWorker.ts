if (globalThis.navigator.serviceWorker) {
  const realServiceWorker = globalThis.navigator.serviceWorker;
  console.log("GO");
  realServiceWorker
    .register("/service-worker.js", { scope: "/" })
    .then(function (registration) {
      realServiceWorker.onmessage = (messageEvent) => {
        globalThis["serviceWorkerHandler"] &&
          globalThis["serviceWorkerHandler"](messageEvent);
      };
      realServiceWorker.startMessages();
      globalThis["serviceWorkerRegistration"] &&
        globalThis["serviceWorkerRegistration"](registration);
      globalThis.navigator.serviceWorker.register = () => Promise.resolve({});
      console.log("ServiceWorker registration successful!");
      // globalThis.navigator.serviceWorker.startMessages();
      // const controller = globalThis.navigator.serviceWorker.controller;
      // controller.addEventListener("message", () => {});

      // setInterval(() => {
      //   controller.postMessage(1);
      // }, 32);
    })
    .catch(function (err) {
      console.log("ServiceWorker registration failed: ", err);
    });
}
