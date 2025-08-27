import Database from "better-sqlite3";
import { app } from "electron";
import path from "path";

import { createTables } from "./utils/create-db";
// import { deleteTables } from "./utils/del-db";

let db: Database.Database;

export function initDB() {
  const dbPath = path.join(app.getPath("userData"), "job-tracker.db");
  db = new Database(dbPath);

  // Uncomment the following line to reset the database
  // deleteTables(db)
  createTables(db);

  console.log("DB ---> DB loaded at", dbPath);
}

export function getDB(): Database.Database {
  if (!db) throw new Error("Database not initialized yet");
  return db;
}

export function closeDB() {
  if (db) {
    db.close();
    console.log("DB ---> Closed DB connection");
  }
}
