import { refreshJobs } from '../api'

function JobList() {
  return (
    <>
      <h2>JobList</h2>
      <button onClick={refreshJobs}>Refresh Jobs</button>
    </>
  )
}

export default JobList
