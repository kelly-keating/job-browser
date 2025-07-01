import { Job, Url } from '../models'

export {}

declare global {
  interface Window {
    api: {
      // ---- Jobs
      refreshJobs: () => Promise<Job[]>
      getJobs: () => Promise<Job[]>
      // ---- URLs
      getUrls: () => Promise<Url[]>
      addUrl: (name: string, url: string) => Promise<Url>
      deleteUrl: (id: number) => Promise<number | null>
      updateUrlName: (id: number, name: string) => Promise<Url | null>
      // ---- Utils
      showContextMenu: (params: { x: number; y: number }) => void
      minimize: () => void
    }
  }
}
