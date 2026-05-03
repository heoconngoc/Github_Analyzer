import express from "express";
import cors from "cors";

import userRouter from "./routers/users.js";
import trendingRouter from "./routers/trending_repos.js";

import { initDatabase } from "./db/init.js";
import { updateTrendingCache } from "./services/trendingCacheService.js";

const app = express();
const PORT = 3001;

/* =========================
   GLOBAL MIDDLEWARE
   ========================= */

app.use(cors({
  origin: "http://127.0.0.1:8080"
}));

app.use(express.json());

/* =========================
   INIT DATABASE
   ========================= */
initDatabase();

/* =========================
   ROUTES
   ========================= */

app.get("/api/testing", (req, res) => {
  res.json({ status: "OK", message: "Backend is running" });
});

app.use("/api/users", userRouter);
app.use("/api/trending", trendingRouter);

/* =========================
   START SERVER
   ========================= */
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

/* =========================
   BACKGROUND JOBS
   ========================= */

// Run once immediately when server starts
(async () => {
  try {
    console.log("Initializing trending cache...");
    await updateTrendingCache("week");
    await updateTrendingCache("month");
    await updateTrendingCache("all");
  } catch (err) {
    console.error("Initial trending cache failed:", err.message);
  }
})();

// Run every 1 hour afterwards
setInterval(async () => {
  try {
    console.log("Updating trending cache...");
    await updateTrendingCache("week");
    await updateTrendingCache("month");
    await updateTrendingCache("all");
  } catch (err) {
    console.error("Scheduled trending cache failed:", err.message);
  }
}, 60 * 60 * 1000);