import sqlite3 from "sqlite3";
import path from "path";

const dbPath = path.resolve("db/database.db");

export const db = new sqlite3.Database(dbPath, (err) => {
  if(err){
    console.log("Fail to connect to DB: ", err); 
  } else {
    console.log("Connected to SQLite3 DB");
  }
});
