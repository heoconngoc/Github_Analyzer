// Frontend call github API directly to get user + repoUser. 
// No to update go through backend first

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