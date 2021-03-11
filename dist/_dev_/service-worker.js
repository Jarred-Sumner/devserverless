// dist/_dev_/ServiceWorker.jsurl
var ServiceWorker_default = "/_dev_/ServiceWorker.CVIZCDOY.jsurl";

// cache-manifest-plugin:preload-manifest
var preload_manifest_default = [
  "/_dev_/requestPermissionRunner.jsfile",
  "/_dev_/esbuild.TURSLSIJ.wasm",
  "/_dev_/IdleWorker.JFAF2W5Y.jsurl"
];

// src/_dev_/service-worker.ts
var SERVICE_WORKER_URL = ServiceWorker_default.replace("./", "/");
globalThis.PRELOAD_MANIFEST = [
  ...new Set([
    ...preload_manifest_default,
    "/_dev_/index.html",
    "/_dev_/setup.html",
    SERVICE_WORKER_URL
  ])
];
importScripts(SERVICE_WORKER_URL);
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vc3JjL19kZXZfL3NlcnZpY2Utd29ya2VyLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJpbXBvcnQgX1NFUlZJQ0VfV09SS0VSX1VSTCBmcm9tIFwiZGlzdC9fZGV2Xy9TZXJ2aWNlV29ya2VyLmpzdXJsXCI7XG5pbXBvcnQgUFJFTE9BRF9NQU5JRkVTVCBmcm9tIFwicHJlbG9hZC1tYW5pZmVzdFwiO1xuXG5jb25zdCBTRVJWSUNFX1dPUktFUl9VUkwgPSBfU0VSVklDRV9XT1JLRVJfVVJMLnJlcGxhY2UoXCIuL1wiLCBcIi9cIik7XG5cbmdsb2JhbFRoaXMuUFJFTE9BRF9NQU5JRkVTVCA9IFtcbiAgLi4ubmV3IFNldChbXG4gICAgLi4uUFJFTE9BRF9NQU5JRkVTVCxcbiAgICBcIi9fZGV2Xy9pbmRleC5odG1sXCIsXG4gICAgXCIvX2Rldl8vc2V0dXAuaHRtbFwiLFxuICAgIFNFUlZJQ0VfV09SS0VSX1VSTCxcbiAgXSksXG5dO1xuXG5pbXBvcnRTY3JpcHRzKFNFUlZJQ0VfV09SS0VSX1VSTCk7XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7OztBQUdBLElBQU0scUJBQXFCLHNCQUFvQixRQUFRLE1BQU07QUFFN0QsV0FBVyxtQkFBbUI7QUFBQSxFQUM1QixHQUFHLElBQUksSUFBSTtBQUFBLElBQ1QsR0FBRztBQUFBLElBQ0g7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBO0FBQUE7QUFJSixjQUFjOyIsCiAgIm5hbWVzIjogW10KfQo=
