import { Job, JobData, RefreshStatus } from '../../models'

import * as db from '../db/jobs'
import * as urlDB from '../db/urls'

import { formatJobsForJS } from '../utils/formatJobs'
import { fetchJobsFromSeek } from '../utils/webParser'

export function getAllJobs(): Job[] {
  return formatJobsForJS(db.getAllJobs())
}

export async function refreshAll(ipcEvt: Electron.IpcMainInvokeEvent) {
  const sendProgress = (
    msg: RefreshStatus,
    completedUrls: number = 0,
    totalUrls: number = 0
  ) => {
    ipcEvt.sender.send('refresh-progress', {
      msg,
      completedUrls,
      totalUrls,
    })
  }

  sendProgress('init')
  const urls = urlDB.selectUrls()
  const newJobs: Record<string, JobData> = {}

  let completedUrls = 0

  for (const url of urls) {
    sendProgress('fetching', completedUrls, urls.length)
    const jobs = await fetchJobsFromSeek(url)
    let latestListingDate = url.lastFetched

    jobs.forEach((job) => {
      newJobs[job.id] = job

      if (
        !latestListingDate ||
        new Date(job.listingDate) > new Date(latestListingDate)
      ) {
        latestListingDate = job.listingDate
      }
    })

    if (latestListingDate) urlDB.setUrlFetchedDate(url.id, latestListingDate)

    completedUrls++
  }

  sendProgress('inserting')
  const newInserts = db.insertJobs(Object.values(newJobs))
  console.log(`Inserted ${newInserts} new job${newInserts === 1 ? '' : 's'}`)
  sendProgress('completed')
}
