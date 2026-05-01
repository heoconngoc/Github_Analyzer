const BASE_URL = "https://api.github.com";

export async function fetchUser(username) {
  const userResponse = await fetch(`${BASE_URL}/users/${username}`);
  if (!userResponse.ok) throw new Error("User not found");
  return await userResponse.json();
};

export async function fetchRepo(username) {
  const repoResponse = await fetch(`${BASE_URL}/users/${username}/repos?per_page=100`);
  if (!repoResponse.ok) throw new Error("Cannot fetch repos");
  return await repoResponse.json();
};

export async function fetchTrendingRepo(since, page) {
  let query;
  if (since) {
    query = `created:>=${since} stars:>1`;
  } else {
    // ALL-TIME
    query = `stars:>1`;
  }
  
  const trendingRepo = await fetch(
    `${BASE_URL}/search/repositories` +
    `?q=${encodeURIComponent(query)}` +
    `&sort=stars` +
    `&order=desc` +
    `&page=${page}` +
    `&per_page=10`
  );

  if (!trendingRepo.ok) throw new Error("Cannot fetch trending Repo");
  return await trendingRepo.json();
};