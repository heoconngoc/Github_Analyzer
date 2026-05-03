import express from "express";
import { db } from "../db/database.js";

const router = express.Router();

router.post("/", (req, res) => {
  const { username } = req.body;

  if(!username){
    return res.status(400).json({error: "Username required"});
  }

  db.run(
    `INSERT OR IGNORE INTO users (username) VALUES (?)`, 
    [username],
    function (err) {
      if(err){
        return res.status(500).json({error: err.message});
      }

      res.status(201).json({
        message: "User saved",
        username,
      });
    }
  );
});

router.get('/', (req, res) => {
  db.all(`SELECT * FROM users ORDER BY search_at DESC`, (err, rows) => {
    if(err){
      return res.status(500).json({error: err.message});
    }
    res.json(rows);
  });
});

export default router