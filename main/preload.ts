import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("api", {
  // Jobs
  // -----------------------------------
  getJobs: (status: JobStatus) => ipcRenderer.invoke("get-jobs", status),
  setJobSaved: (jobId: string) => ipcRenderer.invoke("save-job", jobId),
  setJobNotSaved: (jobId: string) =>
    ipcRenderer.invoke("save-job:false", jobId),
  setJobApplied: (jobId: string) => ipcRenderer.invoke("apply-job", jobId),
  setJobNotApplied: (jobId: string) =>
    ipcRenderer.invoke("apply-job:false", jobId),
  setJobHidden: (jobId: string) => ipcRenderer.invoke("hide-job", jobId),
  setJobNotHidden: (jobId: string) =>
    ipcRenderer.invoke("hide-job:false", jobId),
  // Refresh Jobs
  // -----------------------------------
  refreshJobs: () => ipcRenderer.invoke("refresh-jobs"),
  onRefreshProgress: (callback: (data: ProgressData) => void) => {
    ipcRenderer.on("refresh-progress", (_, data) => {
      callback(data);
    });
  },
  removeRefreshListeners: () => {
    ipcRenderer.removeAllListeners("refresh-progress");
  },
  // URLs
  // -----------------------------------
  getUrls: () => ipcRenderer.invoke("get-urls"),
  addUrl: (name: string, url: string) =>
    ipcRenderer.invoke("add-url", name, url),
  deleteUrl: (id: number) => ipcRenderer.invoke("delete-url", id),
  updateUrlName: (id: number, name: string) =>
    ipcRenderer.invoke("update-url-name", id, name),
  // Settings
  // -----------------------------------
  getSettings: () => ipcRenderer.invoke("get-settings"),
  saveSettings: (settings: Partial<Settings>) =>
    ipcRenderer.invoke("save-settings", settings),
  // Utils
  // -----------------------------------
  showContextMenu: (params: { x: number; y: number }) => {
    ipcRenderer.send("show-context-menu", params);
  },
  minimize: () => ipcRenderer.send("window:minimize"),
  close: () => ipcRenderer.send("window:close"),
});
