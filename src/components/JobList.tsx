import { useFetchNewListings, useJobs } from '../queries/jobs'
import { useIsMutating } from '@tanstack/react-query'
import { EyeOff } from 'lucide-react'

import {
  Button,
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Progress,
} from '@/components/ui'
import { useRefreshProgress } from './hooks/refreshContext'
import { formatDate } from '../../utils'

function JobList() {
  const { data: jobs } = useJobs()
  const { mutate: fetchNewListing } = useFetchNewListings()
  const jobsIsUpdating = !!useIsMutating({ mutationKey: ['fetchJobs'] })

  const { refreshData } = useRefreshProgress()

  return (
    <>
      <h2>JobList</h2>
      <Button
        onClick={() => fetchNewListing()}
        disabled={!!refreshData || jobsIsUpdating}
      >
        Refresh Jobs
      </Button>
      {refreshData && <Progress value={refreshData.percent} />}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-5 justify-center max-w-3xl mx-auto'>
        {jobs?.map((job) => (
          <Card className='w-full max-w-sm' key={job.id}>
            <CardHeader className='flex justify-between'>
              <div>
                <CardTitle>{job.title}</CardTitle>
                <CardDescription>{job.companyName}</CardDescription>
              </div>
              <Button className='p-3 mr-2' aria-label='Hide job'>
                <EyeOff />
              </Button>
            </CardHeader>
            <CardContent>
              {job.bulletPoints && job.bulletPoints.length > 0 && (
                <ul className='list-disc px-4'>
                  {job.bulletPoints.map((point, index) => (
                    <li key={index} className='mb-2 font-normal'>
                      {point}
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
            <CardFooter className='flex justify-between'>
              <CardAction>
                <Button className='mr-2' aria-label='View job details'>
                  Details
                </Button>
                <Button className='mr-2' aria-label='Save job'>
                  Save
                </Button>
              </CardAction>
              <p>{formatDate(job.listingDate)}</p>
            </CardFooter>
          </Card>
        ))}
      </div>
    </>
  )
}

export default JobList
