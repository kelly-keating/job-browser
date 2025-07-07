import { ReactNode, createContext, useContext, useState } from 'react'
import { ProgressData, RefreshStatus } from 'models'

type ProgressDisplay = {
  display: RefreshStatus
  percent: number
}

const RefreshContext = createContext<{
  refreshData: ProgressDisplay | null
  displayProgress: (data: ProgressData | null) => void
}>({ refreshData: null, displayProgress: () => {} })

interface ProviderProps {
  children: ReactNode
}

export function RefreshProvider({ children }: ProviderProps) {
  const [refreshData, setRefreshData] = useState<ProgressDisplay | null>(null)

  const displayProgress = (data: ProgressData | null): void => {
    if (!data) {
      setRefreshData(null)
    } else if (data.msg === 'init') {
      setRefreshData({ display: 'init', percent: 5 })
    } else if (data.msg === 'fetching') {
      setRefreshData({
        display: 'fetching',
        percent: 10 + Math.floor(70 * (data.completedUrls / data.totalUrls)),
      })
    } else if (data.msg === 'inserting') {
      setRefreshData({ display: 'inserting', percent: 80 })
    } else if (data.msg === 'completed') {
      setRefreshData({ display: 'completed', percent: 97 })
      // Reset after a short delay
      setTimeout(() => setRefreshData(null), 1000)
    } else {
      setRefreshData(null)
    }
  }

  return (
    <RefreshContext.Provider value={{ refreshData, displayProgress }}>
      {children}
    </RefreshContext.Provider>
  )
}

export function useRefreshProgress() {
  return useContext(RefreshContext)
}
