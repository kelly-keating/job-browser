// -----------------------------------
// Job Listing Models
// -----------------------------------

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

/**
 * @description A job listing with all necessary details for display in the UI.
 */
export interface Job extends JobTemplate {
  bulletPoints: string[]
}

/**
 * @description A job listing as stored in the database, with bullet points stored as a single string.
 */
export interface JobDB extends JobTemplate {
  bulletPoints: string
}

/**
 * @description The core job structure before it is saved to the database.
 */
export type JobData = Omit<JobDB, 'saved' | 'applied' | 'hidden' | 'notes'>

/**
 * @description A job listing from Seek, containing only details relevant to the database.
 */
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

// -----------------------------------
// URL Models
// -----------------------------------

/**
 * @description The URL data structure used to manage job listing URLs.
 */
export interface Url {
  name: string
  url: string
  id: number
  lastFetched: string | null
}

// -----------------------------------
// Job Refresh Models
// -----------------------------------

/**
 * @description The refresh status during the job fetching process.
 */
export type RefreshStatus = 'init' | 'fetching' | 'inserting' | 'completed'

/**
 * @description The progress data used to display the job fetching status in the UI.
 */
export interface ProgressData {
  msg: RefreshStatus
  completedUrls: number
  totalUrls: number
}

// -----------------------------------
// Settings Models
// -----------------------------------

/**
 * @description Full settings for this application, stored in settings.json file.
 */
export type Settings = {
  darkMode: boolean
}
