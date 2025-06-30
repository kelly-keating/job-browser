import { useState } from 'react'
import { Button } from '@/components/ui'

import SearchManager from './SearchManager'
import JobList from './JobList'

function App() {
  const [displayAdd, setDisplayAdd] = useState(false)

  const goToUrlSearch = () => setDisplayAdd(true)
  const goToJobList = () => setDisplayAdd(false)

  return (
    <>
      <h2>App!</h2>
      {displayAdd ? (
        <SearchManager goBack={goToJobList} />
      ) : (
        <>
          <Button onClick={goToUrlSearch}>Manage Searches</Button>
          <JobList />
        </>
      )}
    </>
  )
}

export default App
