import { getDB } from "./index";

export function insertJobs(jobs: JobData[]): number {
  const db = getDB();
  const stmt = db.prepare(`
    INSERT OR IGNORE INTO jobs (
      id, title, companyName, branding, listingDate,
      locations, salaryLabel, teaser, workTypes,
      workArrangements, bulletPoints
    ) VALUES (
      @id, @title, @companyName, @branding, @listingDate,
      @locations, @salaryLabel, @teaser, @workTypes,
      @workArrangements, @bulletPoints
    )`);

  let inserted = 0;
  const insertAll = db.transaction(() => {
    for (const job of jobs) {
      const result = stmt.run(job);
      if (result.changes > 0) inserted++;
    }
  });
  insertAll();
  return inserted;
}

// TODO: currently unused. Needed at all?
export function getAllJobs(): JobDB[] {
  const db = getDB();
  const stmt = db.prepare("SELECT * FROM jobs ORDER BY listingDate DESC");
  return stmt.all() as JobDB[];
}

export function getJobsByStatus(
  status: "unmarked" | "saved" | "applied" | "hidden",
): JobDB[] {
  let selector = "";
  if (status === "unmarked")
    selector = "WHERE saved = 0 AND applied = 0 AND hidden = 0";
  else if (status === "saved") selector = "WHERE saved = 1";
  else if (status === "applied") selector = "WHERE applied = 1";
  else if (status === "hidden") selector = "WHERE hidden = 1";

  const db = getDB();
  const stmt = db.prepare(`
    SELECT * FROM jobs
    ${selector}
    ORDER BY listingDate DESC
  `);
  return stmt.all() as JobDB[];
}

export function getJobById(id: string): JobDB | undefined {
  const db = getDB();
  const stmt = db.prepare("SELECT * FROM jobs WHERE id = ?");
  return stmt.get(id) as JobDB | undefined;
}

export function updateJobSaved(id: string, saved: boolean): JobDB | undefined {
  const db = getDB();
  const stmt = db.prepare("UPDATE jobs SET saved = ? WHERE id = ?");
  stmt.run(saved ? 1 : 0, id);
  return getJobById(id);
}

export function updateJobApplied(
  id: string,
  applied: boolean,
): JobDB | undefined {
  const db = getDB();
  const stmt = db.prepare("UPDATE jobs SET applied = ? WHERE id = ?");
  stmt.run(applied ? 1 : 0, id);
  return getJobById(id);
}

export function updateJobHidden(
  id: string,
  hidden: boolean,
): JobDB | undefined {
  const db = getDB();
  const stmt = db.prepare("UPDATE jobs SET hidden = ? WHERE id = ?");
  stmt.run(hidden ? 1 : 0, id);
  return getJobById(id);
}

export function removeStaleJobs(): number {
  const db = getDB();
  const stmt = db.prepare(`
    DELETE FROM jobs
    WHERE listingDate < DATE('now', '-35 days')
    AND applied = 0
  `);
  return stmt.run().changes;
}
