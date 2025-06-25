import { Url } from '../../models'
import {
  deleteUrlById,
  getUrlById,
  insertUrl,
  selectUrls,
  updateUrlNameById,
} from '../db/urls.js'

export function addNewUrl(name: string, url: string): Url {
  const id = insertUrl(name, url)
  return {
    id,
    name,
    url,
    lastFetched: null, // lastFetched is set to null initially
  }
}

export function getAllUrls(): Url[] {
  return selectUrls()
}

export function deleteUrl(id: number): number | null {
  if (typeof id !== 'number' || id <= 0) {
    throw new Error('Invalid URL ID provided for deletion.')
  }

  const result = deleteUrlById(id)
  return result ? id : null
}

export function updateUrlName(id: number, name: string): Url | null {
  if (typeof id !== 'number' || id <= 0) {
    throw new Error('Invalid URL ID provided for update.')
  }
  if (typeof name !== 'string' || name.trim() === '') {
    throw new Error('Invalid URL name provided for update.')
  }

  const updated = updateUrlNameById(id, name)
  if (!updated) {
    throw new Error(`Failed to update URL with ID ${id}. It may not exist.`)
  }

  return updated ? getUrlById(id) : null
}
