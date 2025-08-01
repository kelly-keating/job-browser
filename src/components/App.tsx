import { Route, Routes } from 'react-router-dom'
import { useEffect, useRef } from 'react'
import { Satellite } from 'lucide-react'
import { ScrollArea, TopBar } from '@/components/ui'

import { useRefreshProgressListener } from './contexts/refreshListener'
import { useDarkMode } from './contexts/darkModeContext'
import { useFetchNewListings } from '@/queries/jobs'
import { cn } from '@/lib/utils'

import NavBar from './NavBar'
import GeneralListings from './pages/GeneralListings'
import SearchManager from './pages/SearchManager'
import Settings from './pages/Settings'

function App() {
  useRefreshProgressListener()
  const hasFetchedRef = useRef(false)
  const { mutate: fetchNewListing } = useFetchNewListings()
  const { isDark } = useDarkMode()

  useEffect(() => {
    // @ts-ignore - inDevMode used to stop refresh on app load and avoid all the API calls while developing
    const inDevMode = import.meta.env.DEV
    if (!inDevMode && !hasFetchedRef.current) {
      hasFetchedRef.current = true
      fetchNewListing()
    }
  }, [])

  const rootClass = cn(
    isDark ? 'dark' : 'light',
    'bg-background text-foreground'
  )

  return (
    <>
      <div className={rootClass}>
        <TopBar>
          <div className='flex items-center'>
            <Satellite className='mr-2 h-4 w-4' />
            <p>JobSeeker</p>
          </div>
        </TopBar>
        <NavBar />
        <ScrollArea className='h-page'>
          <div className='my-5 max-w-sm md:max-w-3xl mx-auto'>
            <Routes>
              <Route index element={<GeneralListings />} />
              <Route path='/jobs-saved' element={<p>Saved jobs</p>} />
              <Route path='/jobs-applied' element={<p>Applied jobs</p>} />
              <Route path='/jobs-hidden' element={<p>Hidden jobs</p>} />
              <Route path='/searches' element={<SearchManager />} />
              <Route path='/settings' element={<Settings />} />
            </Routes>
          </div>
        </ScrollArea>
      </div>
    </>
  )
}

export default App
