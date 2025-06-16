import axios from 'axios'
import * as cheerio from 'cheerio'

type JobListing = {
  title: string
  url: string
  id: string
}

export async function fetchJobsFromSeek(url: string) {
  const res = await axios.get(url)
  const $ = cheerio.load(res.data)
  const jobs: JobListing[] = []

  $('.job-title-selector').each((_, el) => {
    jobs.push({
      title: $(el).text(),
      url: $(el).attr('href') || '',
      id: $(el).attr('data-job-id') || $(el).attr('href') || '',
    })
  })

  return jobs
}
