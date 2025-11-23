const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("windowControls", {
  minimize: () => ipcRenderer.invoke("window:minimize"),
  maximize: () => ipcRenderer.invoke("window:maximize"),
  restore: () => ipcRenderer.invoke("window:restore"),
  close: () => ipcRenderer.invoke("window:close"),
});
