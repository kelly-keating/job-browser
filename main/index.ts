import { app, BrowserWindow } from 'electron'
import path from 'path'

import { initDB, closeDB } from './db'
import './ipc' // This line initializes the IPC handlers

function createWindow() {
  const win = new BrowserWindow({
    width: 1000,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
    },
  })

  const isDev = process.env.VITE_DEV_SERVER === 'true'

  if (isDev) {
    win.loadURL('http://localhost:5173')
  } else {
    win.loadFile(path.join(__dirname, '../dist/index.html'))
  }
}

app.whenReady().then(() => {
  initDB()
  createWindow()
})

app.on('before-quit', () => {
  closeDB()
})
