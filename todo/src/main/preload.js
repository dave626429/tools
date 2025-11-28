const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("windowControls", {
  minimize: () => ipcRenderer.invoke("window:minimize"),
  maximize: () => ipcRenderer.invoke("window:maximize"),
  restore: () => ipcRenderer.invoke("window:restore"),
  togglefullscreen: () => ipcRenderer.invoke("window:togglefullscreen"),
  close: () => ipcRenderer.invoke("window:close"),
});
