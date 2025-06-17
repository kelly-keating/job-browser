import { Database } from 'better-sqlite3'

export function createTables(db: Database): void {
  db.exec(`
    CREATE TABLE IF NOT EXISTS jobs (
      id TEXT PRIMARY KEY NOT NULL,
      title TEXT NOT NULL,
      companyName TEXT NOT NULL,
      bulletPoints TEXT,
      branding TEXT,
      listingDate TEXT,
      locations TEXT,
      salaryLabel TEXT,
      teaser TEXT,
      workTypes TEXT,
      workArrangements TEXT,
      saved BOOLEAN DEFAULT 0 NOT NULL,
      applied BOOLEAN DEFAULT 0 NOT NULL,
      hidden BOOLEAN DEFAULT 0 NOT NULL,
      notes TEXT
    );

    CREATE TABLE IF NOT EXISTS urls (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      url TEXT NOT NULL,
      lastFetched TEXT
    );
  `)
  console.log('DB ---> Database and tables created successfully')
}
