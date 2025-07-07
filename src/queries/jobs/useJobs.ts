import { useQuery } from '@tanstack/react-query'
import { JobStatus } from 'models'

export function useJobs(status: JobStatus) {
  return useQuery({
    queryKey: ['jobs', status],
    queryFn: () => window.api.getJobs(status),
  })
}
