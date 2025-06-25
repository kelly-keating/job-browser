import { Url } from '../../models'

import { getDB } from './index'

export function insertUrl(name: string, url: string): number {
  const db = getDB()
  const stmt = db.prepare('INSERT INTO urls (name, url) VALUES (?, ?)')
  const { lastInsertRowid } = stmt.run(name, url)
  return lastInsertRowid as number
}

export function selectUrls(): Url[] {
  const db = getDB()
  const stmt = db.prepare('SELECT * FROM urls ORDER BY id DESC')
  return stmt.all() as Url[]
}

export function getUrlById(id: number): Url | null {
  const db = getDB()
  const stmt = db.prepare('SELECT * FROM urls WHERE id = ?')
  return stmt.get(id) as Url | null
}

export function deleteUrlById(id: number): boolean {
  const db = getDB()
  const stmt = db.prepare('DELETE FROM urls WHERE id = ?')
  const result = stmt.run(id)
  return result.changes > 0
}

export function updateUrlNameById(id: number, name: string): boolean {
  const db = getDB()
  const stmt = db.prepare('UPDATE urls SET name = ? WHERE id = ?')
  const result = stmt.run(name, id)
  return result.changes > 0
}

export function setUrlFetchedDate(id: number, date: string): boolean {
  const db = getDB()
  const stmt = db.prepare('UPDATE urls SET lastFetched = ? WHERE id = ?')
  const result = stmt.run(date, id)
  return result.changes > 0
}
