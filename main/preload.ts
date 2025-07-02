import { contextBridge, ipcRenderer } from 'electron'
import { ProgressData } from '../models'

contextBridge.exposeInMainWorld('api', {
  // Jobs
  // -----------------------------------
  getJobs: () => ipcRenderer.invoke('get-jobs'),
  refreshJobs: () => ipcRenderer.invoke('refresh-jobs'),
  onRefreshProgress: (callback: (data: ProgressData) => void) => {
    ipcRenderer.on('refresh-progress', (_, data) => {
      callback(data)
    })
  },
  removeRefreshListeners: () => {
    ipcRenderer.removeAllListeners('refresh-progress')
  },
  // URLs
  // -----------------------------------
  getUrls: () => ipcRenderer.invoke('get-urls'),
  addUrl: (name: string, url: string) =>
    ipcRenderer.invoke('add-url', name, url),
  deleteUrl: (id: number) => ipcRenderer.invoke('delete-url', id),
  updateUrlName: (id: number, name: string) =>
    ipcRenderer.invoke('update-url-name', id, name),
  // Utils
  // -----------------------------------
  showContextMenu: (params: { x: number; y: number }) => {
    ipcRenderer.send('show-context-menu', params)
  },
  minimize: () => ipcRenderer.send('window:minimize'),
})
