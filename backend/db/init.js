import { db } from "./database.js";

export function initDatabase() {
  db.serialize(() => {
    db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT, 
      username TEXT UNIQUE,
      search_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

    db.run(`
  CREATE TABLE IF NOT EXISTS trending_repos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,

    -- identity
    full_name TEXT,
    html_url TEXT UNIQUE,

    -- display
    description TEXT,
    language TEXT,
    size INTEGER,
    stars INTEGER,

    -- business logic
    range TEXT,          -- 'week' | 'month' | 'all'
    snapshot_date DATE   -- Date cache
  )
`);
  });
}