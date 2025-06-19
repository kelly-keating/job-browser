import { ipcMain } from 'electron'

import { getAllJobs, refreshAll } from './services/jobs'
import {
  addNewUrl,
  getAllUrls,
  deleteUrl,
  updateUrlName,
} from './services/urls'

// -----------------------------------
//  Jobs
// -----------------------------------

/**
 * Refreshes all jobs by fetching new data and updating the database.
 *
 * @returns {Promise<void>} A promise that resolves when the refresh is complete.
 */
ipcMain.handle('refresh-jobs', async () => {
  return refreshAll()
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
