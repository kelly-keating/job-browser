import { useState } from 'react'
import SearchManager from './SearchManager'
import JobList from './JobList'
import { useJobs } from '../queries/jobs'

function App() {
  const [displayAdd, setDisplayAdd] = useState(false)
  const { isLoading } = useJobs()

  const goToUrlSearch = () => setDisplayAdd(true)
  const goToJobList = () => setDisplayAdd(false)

  return (
    <>
      <h2>App!{isLoading ? ' - Jobs loading...' : ''}</h2>
      {displayAdd ? (
        <SearchManager goBack={goToJobList} />
      ) : (
        <>
          <button onClick={goToUrlSearch}>Manage Searches</button>
          <JobList />
        </>
      )}
    </>
  )
}

export default App
