import { Job, JobData } from '@models'

import * as db from '../db/jobs'
import * as urlDB from '../db/urls'

import { formatJobsForJS } from '../../utils'
import { fetchJobsFromSeek } from '../webParser'

export function getAllJobs(): Job[] {
  return formatJobsForJS(db.getAllJobs())
}

export async function refreshAll() {
  const urls = urlDB.selectUrls()
  const newJobs: Record<string, JobData> = {}

  for (const url of urls) {
    const jobs = await fetchJobsFromSeek(url)

    jobs.forEach((job) => {
      if (!newJobs[job.id]) newJobs[job.id] = job
    })
    // TODO: Take latest job date and set last fetched for url
  }

  const newInserts = db.insertJobs(Object.values(newJobs))
  console.log(`Inserted ${newInserts} new job${newInserts === 1 ? '' : 's'}`)
}
