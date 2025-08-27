import { EyeOff } from "lucide-react";

import {
  Button,
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui";
import { formatDate } from "@/lib/formatDate";
import { useHideJob } from "@/queries/jobs";

export function JobCard({ job }: { job: Job }) {
  const { hide } = useHideJob();

  return (
    <Card className="w-full max-w-sm" key={job.id}>
      <CardHeader className="flex justify-between">
        <div>
          <CardTitle>{job.title}</CardTitle>
          <CardDescription>{job.companyName}</CardDescription>
        </div>
        <Button
          className="p-3 mr-2"
          aria-label="Hide job"
          onClick={() => hide(job.id)}
        >
          <EyeOff />
        </Button>
      </CardHeader>
      <CardContent>
        {job.bulletPoints && job.bulletPoints.length > 0 && (
          <ul className="list-disc px-4">
            {job.bulletPoints.map((point, index) => (
              <li key={index} className="mb-2 font-normal">
                {point}
              </li>
            ))}
          </ul>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        <CardAction>
          <Button className="mr-2" aria-label="View job details">
            Details
          </Button>
          <Button className="mr-2" aria-label="Save job">
            Save
          </Button>
        </CardAction>
        <p>{formatDate(job.listingDate)}</p>
      </CardFooter>
    </Card>
  );
}
