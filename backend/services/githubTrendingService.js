const OFFLINE_MODE = process.env.OFFLINE_MODE === "true";

export async function fetchTrendingFromGithub(range = "all") {
  if (OFFLINE_MODE) { throw new Error("fetchTrendingFromGithub called in OFFLINE mode"); }

  let query = "stars:>1";

  if (range !== "all") {
    const days = range === "week" ? 7 : 30;
    const since = new Date();
    since.setDate(since.getDate() - days);
    query = `created:>=${since.toISOString().split("T")[0]} stars:>1`;
  }

  const url = `https://api.github.com/search/repositories`
    + `?q=${encodeURIComponent(query)}`
    + `&sort=stars&order=desc&per_page=50`;

  console.log("Github URL: ", url);

  const res = await fetch(url, {
    headers: {
      "User-Agent": "github-analyzer",
      "Accept": "application/vnd.github+json"
    }
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`GitHub API error: ${res.status} - ${text}`);
  }

  const data = await res.json();
  return data.items;
}