import { Database } from 'better-sqlite3'

export function createTables(db: Database): void {
  db.exec(`
    CREATE TABLE IF NOT EXISTS jobs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      url TEXT UNIQUE,
      date_added TEXT DEFAULT (datetime('now', 'localtime')) NOT NULL,
      applied BOOLEAN DEFAULT 0 NOT NULL,
      hide BOOLEAN DEFAULT 0 NOT NULL
    );

    CREATE TABLE IF NOT EXISTS urls (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      url TEXT NOT NULL
    );
  `)
  console.log('DB ---> Database and tables created successfully')
}
