import { useEffect } from 'react'
import { ProgressData } from 'models'

import { useRefreshProgress } from './refreshContext'

export function useRefreshProgressListener() {
  const { displayProgress } = useRefreshProgress()

  useEffect(() => {
    const handleRefreshProgress = (data: ProgressData) => {
      displayProgress(data)
    }

    window.api.onRefreshProgress(handleRefreshProgress)

    return () => {
      window.api.removeRefreshListeners()
    }
  }, [displayProgress])
}
