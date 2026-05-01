async function getUserInfo() {
  // `https://api.github.com/users/{username}`
  const url = `https://api.github.com/users/heoconngoc`

  const response = await fetch(url);

  console.log("==== THIS IS RESPONSE ====");
  console.log(response);
  console.log("==== ===== ====");

  const data = await response.json();
  console.log("==== THIS IS DATA ====");
  console.log(data);
  console.log("==== ===== ====");
};

// getUserInfo();

// avatar: avatar_url
// username: login
// name: name
// bio: bio
// followers: followers
// following: following

async function getRepo() {
  const url = `https://api.github.com/users/heoconngoc/repos`
  const response = await fetch(url);
  const data = await response.json();

  // console.log("=== THIS IS DATA ===")
  // console.log(data);

  const repos = data
    .sort((a, b) => b.size - a.size)
    .slice(0, 5);
  console.log(repos.map((repo => [repo.name, repo.size])))
};

// getRepo();

import { fetchUser, fetchRepo, fetchTrendingRepo } from "./src/api/githubApi.js";

async function test() {
  const data = await fetchTrendingRepo("2026-04-20");
  console.log(data);
}

test();