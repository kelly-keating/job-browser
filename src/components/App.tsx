import { Route, Routes } from 'react-router-dom'
import { useEffect, useRef } from 'react'
import { Satellite } from 'lucide-react'
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
      <TopBar>
        <div className='flex items-center'>
          <Satellite className='mr-2 h-4 w-4' />
          <p>JobSeeker</p>
        </div>
      </TopBar>
      <NavBar />
      <ScrollArea className='h-page'>
        <div className='my-5 max-w-3xl mx-auto'>
          <Routes>
            <Route index element={<JobList />} />
            <Route path='/jobs-saved' element={<p>Saved jobs</p>} />
            <Route path='/jobs-applied' element={<p>Applied jobs</p>} />
            <Route path='/jobs-hidden' element={<p>Hidden jobs</p>} />
            <Route path='/searches' element={<SearchManager />} />
          </Routes>
        </div>
      </ScrollArea>
    </>
  )
}

export default App
