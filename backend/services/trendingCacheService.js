import { db } from "../db/database.js";
import { fetchTrendingFromGithub } from "./githubTrendingService.js";
import fs from "fs";

const OFFLINE_MODE = process.env.OFFLINE_MODE === "true";

export async function updateTrendingCache(range = "all") {
  let repos = [];

  if (OFFLINE_MODE) {
    console.log(`Using offline data for range=${range}`);

    try {
      const rawData = fs.readFileSync(`./mock/trending_${range}.json`);
      repos = JSON.parse(rawData);
    } catch (err) {
      console.error("Failed to load mock data:", err.message);
      return;
    }
  } else {
    repos = await fetchTrendingFromGithub(range);
  }

  const today = new Date().toISOString().split("T")[0];

  repos.forEach(repo => {
    db.run(
      `
      INSERT OR REPLACE INTO trending_repos
      (full_name, html_url, description, language, size, stars, range, snapshot_date)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `,
      [
        repo.full_name,
        repo.html_url,
        repo.description,
        repo.language,
        repo.size,
        repo.stargazers_count || repo.stars,
        range,
        today
      ]
    );
  });

  console.log(`Trending cache updated for range=${range}`);
}