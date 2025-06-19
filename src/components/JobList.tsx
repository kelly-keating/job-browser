import { refreshJobs } from '../api'
import { useJobs } from '../queries/jobs'

function JobList() {
  const { data: jobs, refetch } = useJobs()

  return (
    <>
      <h2>JobList</h2>
      <button onClick={refreshJobs}>Refresh Jobs</button>
      <button onClick={() => refetch()}>Get Jobs</button>
      <ul>
        {jobs?.map((job) => (
          <li key={job.id}>
            {job.title} - {job.companyName} - {job.listingDate}
          </li>
        ))}
      </ul>
    </>
  )
}

export default JobList
