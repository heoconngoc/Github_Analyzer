export async function getTopTrendingRepo(range = "all", page = 1) {
  const res = await fetch(`http://localhost:3001/api/trending?range=${range}&page=${page}`);

  if (!res.ok) {
    throw new Error("Failed to fetch trending data from backend");
  }

  return res.json();
}