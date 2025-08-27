import * as cheerio from "cheerio";
import puppeteer, { Browser } from "puppeteer";

// import { SEEK_REDUX_DATA } from './_docs/res'
import { formatSeekListing } from "./formatJobs";

export async function fetchJobsFromSeek({
  url,
  lastFetched,
}: Url): Promise<JobData[]> {
  let page = 1;
  let hasMore = true;
  const collectedJobs: JobData[] = [];
  const lastFetchedDate = lastFetched ? new Date(lastFetched) : null;
  const browser = await puppeteer.launch();

  while (hasMore) {
    try {
      const data = await fetchSeekPage(browser, url, page);
      const jobs = formatSeekData(data);

      if (!jobs || jobs.length === 0) {
        hasMore = false;
      } else {
        const lastListingDate = new Date(jobs[jobs.length - 1].listingDate);

        // If the last job is older than the last fetched date,
        // we can stop fetching more pages
        if (lastFetchedDate && lastListingDate <= lastFetchedDate) {
          hasMore = false;
        } else {
          page++;
        }

        collectedJobs.push(...jobs);
      }
    } catch (error) {
      console.error(`Error fetching page ${page} from ${url}`);
      console.error(error);
      hasMore = false;
    }
  }

  return collectedJobs;
}

async function fetchSeekPage(
  browser: Browser,
  url: string,
  pageNum: number,
): Promise<string> {
  console.log("Fetching page", pageNum, "--->", url);
  const fullUrl = `${url}&page=${pageNum}`;

  const page = await browser.newPage();

  await page.setUserAgent(
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 " +
      "(KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36",
  );
  await page.goto(fullUrl, { waitUntil: "networkidle2" });

  const html = await page.content();
  await browser.close();

  return html;
}

function formatSeekData(data: string): JobData[] | null {
  const $ = cheerio.load(data);

  // Extract job listings - held in "server-state" script with multiple data objects
  // Looking for: window.SEEK_REDUX_DATA = { ... }
  const scriptTag = $('script[data-automation="server-state"]').html();

  // match = [ 'window.SEEK_REDUX_DATA = { ...objData... }', '{ ...objData... }' ]
  const match = scriptTag?.match(
    /window\.SEEK_REDUX_DATA\s*=\s*(\{[\s\S]*?\})\s*;/,
  );

  const SEEK_REDUX_DATA = match ? match[1] : null;
  if (!SEEK_REDUX_DATA) {
    throw new Error("Failed to find SEEK_REDUX_DATA in the page source.");
  }

  const seekData = JSON.parse(SEEK_REDUX_DATA);
  const seekJobs = seekData?.results?.results?.jobs as SeekJobListing[];

  // if no job results
  if (!seekJobs || !Array.isArray(seekJobs)) {
    return null;
  }
  return seekJobs.map(formatSeekListing);
}
