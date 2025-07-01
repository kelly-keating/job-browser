import { Route, Routes } from 'react-router-dom'
import { ScrollArea, TopBar } from '@/components/ui'

import SearchManager from './SearchManager'
import JobList from './JobList'
import NavBar from './NavBar'

function App() {
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
