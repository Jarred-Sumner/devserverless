import "src/lib/launchIdleWorker.ts";
import { requestPermission } from "../lib/requestPermission";
import { getPackageID } from "./getPackageID";

window.addEventListener("DOMContentLoaded", () => {
  document.querySelector("#button").addEventListener("click", async () => {
    await requestPermission(getPackageID());
    location.reload();
  });
});
