import { app, BrowserWindow } from 'electron'
import path from 'path'

import { initDB, closeDB } from './db'
import './ipc' // This line initializes the IPC handlers

function createWindow() {
  const win = new BrowserWindow({
    width: 1000,
    height: 800,
    frame: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  })

  const isDev = process.env.NODE_ENV === 'development'

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
  console.log('Closing application and database connection...')
  closeDB()
})
