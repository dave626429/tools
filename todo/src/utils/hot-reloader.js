const reloader = require("electron-reloader");

function enableHotReloading() {
  try {
    reloader(module, {
      debug: false,
      watchRenderer: true,
    });
  } catch (e) {
    console.info("[Ignore]: electron-reloader in production.");
    throw new Error(e);
  }
}

module.exports = enableHotReloading;
