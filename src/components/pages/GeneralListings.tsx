import { useIsMutating } from "@tanstack/react-query";

import { Button, PageHeader, Progress } from "@/components/ui";

import { useFetchNewListings, useJobs } from "../../queries/jobs";
import { useRefreshProgress } from "../contexts/refreshContext";
import { JobCard } from "../JobCard";

export function GeneralListings() {
  const { data: jobs } = useJobs("unmarked");
  const { mutate: fetchNewListing } = useFetchNewListings();
  const jobsIsUpdating = !!useIsMutating({ mutationKey: ["fetchJobs"] });

  const { refreshData } = useRefreshProgress();

  return (
    <>
      <PageHeader>
        <div className="flex justify-between items-center">
          <h2>{jobs?.length || 0} Listings</h2>
          <Button
            onClick={() => fetchNewListing()}
            disabled={!!refreshData || jobsIsUpdating}
          >
            Refresh Jobs
          </Button>
        </div>
        {refreshData && (
          <Progress className="my-5" value={refreshData.percent} />
        )}
      </PageHeader>
      {!jobsIsUpdating && jobs?.length === 0 && (
        <div className="flex py-10 w-full justify-center">
          <p className="text-center text-lg font-semibold text-muted-foreground w-120">
            No job listings found. Click "Refresh Jobs" to fetch new listings or
            add some new job searches.
          </p>
        </div>
      )}
      <div className="grid gap-5 justify-center grid-cols-1 md:grid-cols-2 mx-auto">
        {jobs?.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
    </>
  );
}
