import { Job, JobDB, JobData, SeekJobListing } from '../../models'

export function formatJobForJS(job: JobDB): Job {
  return {
    ...job,
    bulletPoints: JSON.parse(job.bulletPoints),
  }
}

export function formatAllJobsForJS(jobs: JobDB[]): Job[] {
  return jobs.map(formatJobForJS)
}

export function formatSeekListing(obj: SeekJobListing): JobData {
  return {
    bulletPoints: JSON.stringify(obj.bulletPoints),
    branding: obj.branding.serpLogoUrl,
    companyName: obj.companyName,
    id: obj.id,
    listingDate: obj.listingDate,
    locations: obj.locations.map((loc) => loc.label).join(' & '),
    salaryLabel: obj.salaryLabel,
    teaser: obj.teaser,
    title: obj.title,
    workTypes: obj.workTypes.join(' & '),
    workArrangements: obj.workArrangements.data
      .map((item) => item.label.text)
      .join(' & '),
  }
}
