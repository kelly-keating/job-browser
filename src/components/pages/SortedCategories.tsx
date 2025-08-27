import { capitaliseFirstLetter } from "@/lib/utils";
import { useJobs } from "@/queries/jobs";

interface SortedCategoriesProps {
  category: "saved" | "applied";
}

export function SortedCategories({ category }: SortedCategoriesProps) {
  const { data: jobs } = useJobs(category);

  return (
    <>
      <h2>{capitaliseFirstLetter(category)} jobs</h2>
      <ul>
        {jobs?.map((job) => (
          <li key={job.id}>{job.title}</li>
        ))}
      </ul>
    </>
  );
}
