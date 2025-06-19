import { JobData, JobDB } from '@models'

import { getDB } from './index'

export function insertJobs(jobs: JobData[]): number {
  const db = getDB()
  const stmt = db.prepare(`
    INSERT OR IGNORE INTO jobs (
      id, title, companyName, branding, listingDate,
      locations, salaryLabel, teaser, workTypes,
      workArrangements, bulletPoints
    ) VALUES (
      @id, @title, @companyName, @branding, @listingDate,
      @locations, @salaryLabel, @teaser, @workTypes,
      @workArrangements, @bulletPoints
    )`)

  let inserted = 0
  const insertAll = db.transaction(() => {
    for (const job of jobs) {
      const result = stmt.run(job)
      if (result.changes > 0) inserted++
    }
  })
  insertAll()
  return inserted
}

export function getAllJobs(): JobDB[] {
  const db = getDB()
  const stmt = db.prepare('SELECT * FROM jobs ORDER BY listingDate DESC')
  return stmt.all() as JobDB[]
}
