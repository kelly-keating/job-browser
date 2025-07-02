interface JobTemplate {
  id: string
  title: string
  companyName: string
  branding: string
  listingDate: string
  locations: string
  salaryLabel: string
  teaser: string
  workTypes: string
  workArrangements: string
  saved: boolean
  applied: boolean
  hidden: boolean
  notes: string
}

export interface JobDB extends JobTemplate {
  bulletPoints: string
}
export type JobData = Omit<JobDB, 'saved' | 'applied' | 'hidden' | 'notes'>

export interface Job extends JobTemplate {
  bulletPoints: string[]
}

export interface Url {
  name: string
  url: string
  id: number
  lastFetched: string | null
}

export interface SeekJobListing {
  bulletPoints: string[]
  branding: {
    serpLogoUrl: string
  }
  classifications: {
    classification: {
      id: string
      description: string
    }
    subclassification: {
      id: string
      description: string
    }
  }[]
  companyName: string
  id: string
  listingDate: string
  locations: {
    label: string
    countryCode: string
    seoHierarchy: { contextualName: string }[]
  }[]
  salaryLabel: string
  teaser: string
  title: string
  workTypes: string[]
  workArrangements: {
    data: { id: string; label: { text: string } }[]
  }
}

export type RefreshStatus = 'init' | 'fetching' | 'inserting' | 'completed'
export interface ProgressData {
  msg: RefreshStatus
  completedUrls: number
  totalUrls: number
}
