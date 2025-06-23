import { useMutation, useQueryClient } from '@tanstack/react-query'

import { refreshJobs } from '../../api'

export function useFetchNewListings() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: () => refreshJobs(),
    mutationKey: ['fetchJobs'],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['jobs'] })
    },
    onError: (error: Error) => {
      console.error('Error fetching new listings:', error)
    },
  })
}
