import { db } from "../db/database.js";
import { fetchTrendingFromGithub } from "./githubTrendingService.js";

export async function updateTrendingCache(range = "all") {
  const repos = await fetchTrendingFromGithub(range);
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
        repo.stargazers_count,
        range,
        today
      ]
    );
  });

  console.log(`Trending cache updated for range=${range}`);
}