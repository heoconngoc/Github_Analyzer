import { db } from "./database.js";

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
      full_name TEXT,
      stars INTEGER,
      language TEXT,
      date DATE
    )
  `);
});

