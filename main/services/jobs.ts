import { Job } from '@models'

import * as db from '../db/jobs'

export function getAllJobs(): Job[] {
  return db.getAllJobs()
}

export function refreshAll() {
  // This function can be used to refresh jobs from the source
  // For now, it just returns all jobs from the database
  return getAllJobs()
}
