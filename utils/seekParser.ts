import axios from 'axios'
import * as cheerio from 'cheerio'

// import { SEEK_REDUX_DATA } from './_docs/res'
import { JobData, SeekJobListing, Url } from '@models'
import { formatSeekListing } from './formatJobs'
import { delay } from './delay'

export async function fetchJobsFromSeek({
  url,
  lastFetched,
}: Url): Promise<JobData[]> {
  let page = 1
  let hasMore = true
  const collectedJobs: JobData[] = []
  const lastFetchedDate = lastFetched ? new Date(lastFetched) : null

  while (hasMore) {
    try {
      const data = await fetchSeekPage(url, page)
      const jobs = formatSeekData(data)

      if (jobs.length === 0) {
        hasMore = false
      } else {
        const lastListingDate = new Date(jobs[jobs.length - 1].listingDate)

        // If the last job is older than the last fetched date,
        // we can stop fetching more pages
        if (lastFetchedDate && lastListingDate <= lastFetchedDate) {
          hasMore = false
        } else {
          page++
        }

        collectedJobs.push(...jobs)
      }
    } catch (error) {
      console.error(`Error fetching page ${page} from ${url}:`, error)
      hasMore = false
    }
  }

  return collectedJobs
}

async function fetchSeekPage(url: string, page: number): Promise<string> {
  console.log('Fetching page ', page)
  const res = await axios.get(`${url}&page=${page}`, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
      Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
      'Accept-Language': 'en-US,en;q=0.5',
      Connection: 'keep-alive',
      'Upgrade-Insecure-Requests': '1',
    },
  })

  if (res.status !== 200) {
    throw new Error(`Failed to fetch jobs from ${url}: ${res.statusText}`)
  }

  await delay(1000 + Math.random() * 1000) // Random delay between 1-2 seconds
  return res.data
}

function formatSeekData(data: string): JobData[] {
  const $ = cheerio.load(data)

  // Extract job listings - held in "server-state" script with multiple data objects
  // Looking for: window.SEEK_REDUX_DATA = { ... }
  const scriptTag = $('script[data-automation="server-state"]').html()
  const match = scriptTag?.match(
    /window\.SEEK_REDUX_DATA\s*=\s*(\{[\s\S]*?\})\s*;/
  )

  const SEEK_REDUX_DATA = match ? match[1] : null
  if (!SEEK_REDUX_DATA) {
    throw new Error('Failed to find SEEK_REDUX_DATA in the page source.')
  }

  const seekData = JSON.parse(SEEK_REDUX_DATA)
  const seekJobs = seekData.results.results.jobs as SeekJobListing[]

  return seekJobs.map(formatSeekListing)
}
