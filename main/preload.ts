import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('api', {
  refreshJobs: () => ipcRenderer.invoke('refresh-jobs'),
  getJobs: () => ipcRenderer.invoke('get-jobs'),
  getUrls: () => ipcRenderer.invoke('get-urls'),
  addUrl: (name: string, url: string) =>
    ipcRenderer.invoke('add-url', name, url),
  deleteUrl: (id: number) => ipcRenderer.invoke('delete-url', id),
  updateUrlName: (id: number, name: string) =>
    ipcRenderer.invoke('update-url-name', id, name),
})
