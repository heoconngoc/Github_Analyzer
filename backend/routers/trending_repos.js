import express from "express";
import { db } from "../db/database.js";

const router = express.Router();

/** 
 * GET /api/trending?range=week&page=1 
 */
// limit = 10: take 10 first repos each time
// offset = (page - 1) * 10: ignore x first repos each time
router.get("/", (req, res) => {
  const range = req.query.range || "all";
  const page = Number(req.query.page) || 1;

  const limit = 10;
  const offset = (page - 1) * limit;

  const sql = `
    SELECT *
    FROM trending_repos
    WHERE range = ?
    ORDER BY stars DESC
    LIMIT ? OFFSET ?
  `;

  db.all(sql, [range, limit, offset], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    res.json({
      repos: rows,
      page,
      hasMore: rows.length === limit
    });
  });
});

export default router;