import { Route, Routes } from 'react-router-dom'
import { useEffect, useRef } from 'react'
import { ScrollArea, TopBar } from '@/components/ui'

import { useRefreshProgressListener } from './hooks/refreshListener'
import { useFetchNewListings } from '@/queries/jobs'

import SearchManager from './SearchManager'
import JobList from './JobList'
import NavBar from './NavBar'

function App() {
  useRefreshProgressListener()
  const hasFetchedRef = useRef(false)
  const { mutate: fetchNewListing } = useFetchNewListings()

  useEffect(() => {
    // @ts-ignore - inDevMode used to stop refresh on app load and avoid all the API calls while developing
    const inDevMode = import.meta.env.DEV
    if (!inDevMode && !hasFetchedRef.current) {
      hasFetchedRef.current = true
      fetchNewListing()
    }
  }, [])

  return (
    <>
      <TopBar />
      <NavBar />
      <ScrollArea className='h-[calc(100vh-var(--topbar-height))]'>
        <Routes>
          <Route index element={<JobList />} />
          <Route path='/jobs-saved' element={<p>Saved jobs</p>} />
          <Route path='/jobs-applied' element={<p>Applied jobs</p>} />
          <Route path='/jobs-hidden' element={<p>Hidden jobs</p>} />
          <Route path='/searches' element={<SearchManager />} />
        </Routes>
      </ScrollArea>
    </>
  )
}

export default App
