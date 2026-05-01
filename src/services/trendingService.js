import { fetchTrendingRepo } from "../api/githubApi.js";

export async function getTopTrendingRepo(date, page) {
  if (page < 1 || !Number.isInteger(page)) {
    throw new Error("Invalid page for trending repos");
  }

  const trendingRepos = await fetchTrendingRepo(date, page);
  return {
    repos: trendingRepos.items,
    hasMore: page * 10 < trendingRepos.total_count,
    total: trendingRepos.total_count
  };
};