import { useMutation, useQueryClient } from '@tanstack/react-query'

export function useAddUrl() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: { name: string; url: string }) =>
      window.api.addUrl(data.name, data.url),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['urls'] })
    },
    onError: (error: Error) => {
      console.error('Error adding URL:', error)
    },
  })
}
