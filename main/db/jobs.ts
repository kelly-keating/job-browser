import { JobData, JobDB } from '@models'

import { getDB } from './index'

export function insertJobs(jobs: JobData[]) {
  const db = getDB()
  const stmt = db.prepare(
    'INSERT OR IGNORE INTO jobs (id, title) VALUES (?, ?)'
  )
  db.transaction(() => {
    for (const job of jobs) {
      stmt.run(job.id, job.title)
    }
  })()
}

export function getAllJobs(): JobDB[] {
  const db = getDB()
  const stmt = db.prepare('SELECT * FROM jobs ORDER BY date_added DESC')
  return stmt.all() as JobDB[]
}
