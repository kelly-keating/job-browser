import { Job } from '@models'

import { getDB } from './index'

export function insertJobs(jobs: Job[]) {
  const db = getDB()
  const stmt = db.prepare(
    'INSERT OR IGNORE INTO jobs (id, title, link) VALUES (?, ?, ?)'
  )
  db.transaction(() => {
    for (const job of jobs) {
      stmt.run(job.id, job.title, job.url)
    }
  })()
}

export function getAllJobs(): Job[] {
  const db = getDB()
  const stmt = db.prepare('SELECT * FROM jobs ORDER BY date_added DESC')
  return stmt.all() as Job[]
}
