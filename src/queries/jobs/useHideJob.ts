import { useMutation, useQueryClient } from '@tanstack/react-query'

export function useHideJob() {
  const queryClient = useQueryClient()

  const hideMutation = useMutation({
    mutationFn: (id: string) => window.api.setJobHidden(id),
    onSuccess: (updatedJob) => {
      if (!updatedJob) return
      queryClient.invalidateQueries({
        queryKey: ['jobs', 'hidden'],
      })
      queryClient.invalidateQueries({
        queryKey: ['jobs', 'unmarked'],
      })
    },
  })

  const unhideMutation = useMutation({
    mutationFn: (id: string) => window.api.setJobNotHidden(id),
    onSuccess: (updatedJob) => {
      if (!updatedJob) return
      queryClient.invalidateQueries({
        queryKey: ['jobs', 'hidden'],
      })
      queryClient.invalidateQueries({
        queryKey: ['jobs', 'unmarked'],
      })
    },
  })

  return {
    hide: hideMutation.mutate,
    unhide: unhideMutation.mutate,
    status: hideMutation.status || unhideMutation.status,
    error: hideMutation.error || unhideMutation.error,
  }
}
