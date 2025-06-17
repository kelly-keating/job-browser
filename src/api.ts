import type { Job, Url } from '../models'

interface Window {
  api: {
    refreshJobs: () => Promise<Job[]>
    getJobs: () => Promise<Job[]>

    getUrls: () => Promise<Url[]>
    addUrl: (name: string, url: string) => Promise<Url>
    deleteUrl: (id: number) => Promise<number | null>
    updateUrlName: (id: number, name: string) => Promise<Url | null>
  }
}

const window: Window = globalThis as unknown as Window

export function refreshJobs() {
  return window.api.refreshJobs()
}

export function getJobs() {
  return window.api.getJobs()
}

export function getUrls() {
  return window.api.getUrls()
}

export function addUrl(name: string, url: string) {
  return window.api.addUrl(name, url)
}

export function deleteUrl(id: number) {
  return window.api.deleteUrl(id)
}

export function updateUrlName(id: number, name: string) {
  return window.api.updateUrlName(id, name)
}
