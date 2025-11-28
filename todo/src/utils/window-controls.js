const { BrowserWindow, ipcMain } = require("electron/main");

let window;

function createWindow(rendererPath, preloadPath) {
  window = new BrowserWindow({
    width: 800,
    height: 600,
    minWidth: 300,
    minHeight: 400,
    frame: false, // <-- REQUIRED for custom title bar
    titleBarStyle: "hidden",
    webPreferences: {
      preload: preloadPath,
    },
  });

  window.loadFile(rendererPath);
}

ipcMain.handle("window:minimize", () => window.minimize());
ipcMain.handle("window:maximize", () => window.maximize());
ipcMain.handle("window:restore", () => window.restore());
ipcMain.handle("window:togglefullscreen", () => {
  const isFull = window.isFullScreen();
  window.setFullScreen(!isFull);
});
ipcMain.handle("window:close", () => window.close());

module.exports = createWindow;
