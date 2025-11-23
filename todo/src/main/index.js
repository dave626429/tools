const { app } = require("electron/main");
const enableHotReloading = require("../utils/hot-reloader.js");
const createWindow = require("../utils/window-controls.js");
const path = require("node:path");

enableHotReloading();

(async () => {
  await app.whenReady();
  createWindow(
    "./src/renderer/index.html",
    path.join(__dirname, "./preload.js")
  );
})();
