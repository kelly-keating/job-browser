import { Database } from 'better-sqlite3'

export function deleteTables(db: Database): void {
  db.exec(`
    DROP TABLE IF EXISTS jobs;
    DROP TABLE IF EXISTS urls;
  `)
  console.log('DB ---> Database tables deleted')
}
