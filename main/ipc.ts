import { BrowserWindow, ipcMain, Menu, MenuItem } from 'electron'

import { getAllJobs, refreshAll } from './services/jobs'
import { getSettings, saveSettings } from './services/settings'
import {
  addNewUrl,
  getAllUrls,
  deleteUrl,
  updateUrlName,
} from './services/urls'
import { Settings } from '../models'

// -----------------------------------
//  Jobs
// -----------------------------------

/**
 * Refreshes all jobs by fetching new data and updating the database.
 * This function will stream progress updates to the renderer process via IPC sender.
 *
 * @returns {Promise<void>} A promise that resolves when the refresh is complete.
 */
ipcMain.handle('refresh-jobs', async (evt) => {
  return refreshAll(evt)
})

/**
 * Retrieves all jobs from the database.
 *
 * @returns {Promise<Job[]>} An array of Job objects.
 */
ipcMain.handle('get-jobs', async () => {
  return getAllJobs()
})

// -----------------------------------
// URLs
// -----------------------------------

/**
 *  Retrieves all URLs from the database.
 *
 *  @returns {Promise<Url[]>} An array of Url objects.
 */
ipcMain.handle('get-urls', async () => {
  return getAllUrls()
})

/**
 * Adds a new URL to the database.
 *
 * @param event - The IPC event object.
 * @param {string} name - A name for the URL (e.g., "Wellington React").
 * @param {string} url - The full search URL.
 * @returns {Promise<Url>} The newly created URL object.
 */
ipcMain.handle('add-url', async (event, name: string, url: string) => {
  return addNewUrl(name, url)
})

/**
 * Deletes a URL by its ID.
 *
 * @param event - The IPC event object.
 * @param {number} id - The ID of the URL to delete.
 * @returns {Promise<number | null>} The ID of the deleted URL, or null if deletion failed.
 */
ipcMain.handle('delete-url', async (event, id: number) => {
  return deleteUrl(id)
})

/**
 * Updates the name of a URL by its ID.
 *
 * @param event - The IPC event object.
 * @param {number} id - The ID of the URL to update.
 * @param {string} name - The new name for the URL.
 * @returns {Promise<Url | null>} The updated URL object, or null if the update failed.
 */
ipcMain.handle('update-url-name', async (event, id: number, name: string) => {
  return updateUrlName(id, name)
})

// -----------------------------------
// Settings
// -----------------------------------

/**
 * Retrieves the application settings.
 *
 * @returns {Promise<Settings>} The current settings object.
 */
ipcMain.handle('get-settings', async () => {
  return getSettings()
})

/**
 * Saves new settings to the application.
 *
 * @param event - The IPC event object.
 * @param {Partial<Settings>} newSettings - The new settings to save.
 * @returns {Promise<void>} A promise that resolves when the settings are saved.
 */
ipcMain.handle(
  'save-settings',
  async (event, newSettings: Partial<Settings>) => {
    return saveSettings(newSettings)
  }
)

// -----------------------------------
// Utils
// -----------------------------------

/**
 * Shows a context menu at the specified coordinates.
 *
 * @param event - The IPC event object.
 * @param {Object} params - The co-ord parameters for the context menu.
 * @param {number} params.x - The x-coordinate from the click.
 * @param {number} params.y - The y-coordinate from the click.
 * @return {boolean} Returns true to indicate that the context menu was shown.
 */
ipcMain.on('show-context-menu', (event, params: { x: number; y: number }) => {
  const menu = new Menu()
  menu.append(
    new MenuItem({
      label: 'Reload',
      click: () => {
        const win = BrowserWindow.fromWebContents(event.sender)
        win?.reload()
      },
    })
  )
  menu.append(
    new MenuItem({
      label: 'Open DevTools',
      click: () => {
        const win = BrowserWindow.fromWebContents(event.sender)
        win?.webContents.openDevTools()
      },
    })
  )

  menu.popup({
    x: params.x,
    y: params.y,
  })
  return true // Indicate that the context menu was shown
})

/**
 * Minimizes the window.
 */
ipcMain.on('window:minimize', () => {
  const win = BrowserWindow.getFocusedWindow()
  if (win) {
    win.minimize()
  }
})

/**
 * Closes the window.
 */
ipcMain.on('window:close', () => {
  const win = BrowserWindow.getFocusedWindow()
  if (win) {
    win.close()
  }
})
