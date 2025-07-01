import { useQuery } from '@tanstack/react-query'

export function useJobs() {
  return useQuery({
    queryKey: ['jobs'],
    queryFn: () => window.api.getJobs(),
  })
}
