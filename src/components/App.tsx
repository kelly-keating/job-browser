import { useState } from 'react'
import SearchManager from './SearchManager'
import JobList from './JobList'

function App() {
  const [displayAdd, setDisplayAdd] = useState(false)

  return (
    <>
      <h2>App!</h2>
      {displayAdd ? (
        <SearchManager />
      ) : (
        <>
          <button onClick={() => setDisplayAdd(true)}>Manage Searches</button>
          <JobList />
        </>
      )}
    </>
  )
}

export default App
