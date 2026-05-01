import { fetchUser, fetchRepo } from "../api/githubApi.js";

export async function getUserWithTopRepos(username) {
  const [user, repos] = await Promise.all([
    fetchUser(username),
    fetchRepo(username)
  ]);

  const topRepos = repos
    .sort((a, b) => b.stargazers_count - a.stargazers_count)
    .slice(0, 5);

  return {user, topRepos};
}