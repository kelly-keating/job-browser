import { Job, JobData } from '@models'

import * as db from '../db/jobs'
import * as urlDB from '../db/urls'

import { delay, fetchJobsFromSeek, formatJobsForJS } from '../../utils'

export function getAllJobs(): Job[] {
  return formatJobsForJS(db.getAllJobs())
}

export async function refreshAll() {
  const seekUrl = {
    url: 'https://www.seek.co.nz/React-Developer-jobs/in-All-Wellington?sortmode=ListedDate',
    name: 'Test Url',
    id: 0, // This ID is not used in the current implementation
    lastFetched: null,
  }
  const jobs = await fetchJobsFromSeek(seekUrl)
  console.log(jobs)

  // const urls = urlDB.selectUrls()
  // const newJobs: Record<string, JobData> = {}

  // 2. For each Url, fetch jobs and wait in between
  // for (const url of urls) {
  //   const jobs = await fetchJobsFromSeek(url)

  //   await delay(1994)

  //   jobs.forEach((job) => {
  //     if (!newJobs[job.id]) newJobs[job.id] = job
  //   })
  //   2.5 Take latest job date and set last fetched for url
  // }

  // console.log(newJobs)

  // 3. Insert jobs into the database
  // db.insertJobs(Object.values(newJobs))

  // 4. Return all jobs
  // return getAllJobs()
}
