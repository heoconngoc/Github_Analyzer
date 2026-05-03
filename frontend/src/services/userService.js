import { fetchUser, fetchRepo } from "../api/githubApi.js";

export async function getUserWithTopRepos(username) {
  const [user, repos] = await Promise.all([
    fetchUser(username),
    fetchRepo(username)
  ]);

  const topRepos = repos
    .sort((a, b) => b.stargazers_count - a.stargazers_count)
    .slice(0, 5);

  try {
    const res = await fetch("http://localhost:3001/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username })
    });

    if (!res.ok) {
      throw new Error("Failed to save user to backend");
    } else {
      const data = await res.json();
      console.log("Saved to DB:", data);
    }
  } catch(err) {
    console.warn("Backend unreachable: ", err.message);
  }

  return { user, topRepos };
}