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
import { formatDate } from '@/lib/formatDate'

import { useFetchNewListings, useJobs } from '../queries/jobs'
import { useRefreshProgress } from './hooks/refreshContext'

function JobList() {
  const { data: jobs } = useJobs()
  const { mutate: fetchNewListing } = useFetchNewListings()
  const jobsIsUpdating = !!useIsMutating({ mutationKey: ['fetchJobs'] })

  const { refreshData } = useRefreshProgress()

  return (
    <>
      <div className='my-5'>
        <div className='flex justify-between items-center'>
          <h2>{jobs?.length || 0} Listings</h2>
          <Button
            onClick={() => fetchNewListing()}
            disabled={!!refreshData || jobsIsUpdating}
          >
            Refresh Jobs
          </Button>
        </div>
        {refreshData && (
          <Progress className='my-5' value={refreshData.percent} />
        )}
      </div>
      {!jobsIsUpdating && jobs?.length === 0 && (
        <div className='flex py-10 w-full justify-center'>
          <p className='text-center text-lg font-semibold text-muted-foreground w-120'>
            No job listings found. Click "Refresh Jobs" to fetch new listings or
            add some new job searches.
          </p>
        </div>
      )}
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
