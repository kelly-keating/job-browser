import { useQuery } from '@tanstack/react-query'

import { getUrls } from '../api'

export function useUrls() {
  return useQuery({
    queryKey: ['urls'],
    queryFn: () => getUrls(),
  })
}
