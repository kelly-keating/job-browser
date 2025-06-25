import { Job, JobDB, JobData, SeekJobListing } from '../models'

export function formatJobsForJS(jobs: JobDB[]): Job[] {
  return jobs.map((job) => ({
    ...job,
    bulletPoints: JSON.parse(job.bulletPoints),
  }))
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
