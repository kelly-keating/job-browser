import { Job, JobStatus, ProgressData, Settings, Url } from '../models'

export {}

declare global {
  interface Window {
    api: {
      // ---- Jobs
      getJobs: (status: JobStatus) => Promise<Job[]>
      setJobSaved: (jobId: string) => Promise<Job | null>
      setJobNotSaved: (jobId: string) => Promise<Job | null>
      setJobApplied: (jobId: string) => Promise<Job | null>
      setJobNotApplied: (jobId: string) => Promise<Job | null>
      setJobHidden: (jobId: string) => Promise<Job | null>
      setJobNotHidden: (jobId: string) => Promise<Job | null>
      // ---- Refresh Jobs
      refreshJobs: () => Promise<Job[]>
      onRefreshProgress: (callback: (data: ProgressData) => void) => void
      removeRefreshListeners: () => void
      // ---- URLs
      getUrls: () => Promise<Url[]>
      addUrl: (name: string, url: string) => Promise<Url>
      deleteUrl: (id: number) => Promise<number | null>
      updateUrlName: (id: number, name: string) => Promise<Url | null>
      // ---- Settings
      getSettings: () => Promise<Settings>
      saveSettings: (newSettings: Partial<Settings>) => Promise<void>
      // ---- Utils
      showContextMenu: (params: { x: number; y: number }) => void
      minimize: () => void
      close: () => void
    }
  }
}
