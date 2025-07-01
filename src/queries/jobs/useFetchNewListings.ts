import { useMutation, useQueryClient } from '@tanstack/react-query'

export function useFetchNewListings() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: () => window.api.refreshJobs(),
    mutationKey: ['fetchJobs'],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['jobs'] })
    },
    onError: (error: Error) => {
      console.error('Error fetching new listings:', error)
    },
  })
}
