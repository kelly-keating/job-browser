import { useFetchNewListings, useJobs } from '../queries/jobs'
import { useIsMutating } from '@tanstack/react-query'

function JobList() {
  const { data: jobs } = useJobs()
  const { mutate: fetchNewListing } = useFetchNewListings()
  const jobsIsUpdating = !!useIsMutating({ mutationKey: ['fetchJobs'] })

  return (
    <>
      <h2>JobList</h2>
      <button onClick={() => fetchNewListing()}>Refresh Jobs</button>
      <ul>
        {jobsIsUpdating && <li>Loading...</li>}
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
