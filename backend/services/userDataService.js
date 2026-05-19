import fs from "fs";
import path from "path"

import dotenv from "dotenv";
dotenv.config();

const OFFLINE_MODE = process.env.OFFLINE_MODE === "true";
console.log("Offline_mode now: ", OFFLINE_MODE);

const MOCK_DIR = path.resolve("mock/users/");

// function testing(){
//   console.log("Mock_dir = " + MOCK_DIR);
// }

// function testing2(username, type){
//   console.log(path.join(MOCK_DIR, `${username}.${type}.json`));
// }

// testing();
// testing2("antfu", "events");

function readJsonFile(pathName) {
  const raw = fs.readFileSync(pathName, "utf-8");
  return JSON.parse(raw);
}

function getMockPath(username, type){
  // type = events || profile || repos
  return path.join(MOCK_DIR, `${username}.${type}.json`);
}

export function getAvailableMockUser(){
  const files = fs.readdirSync(MOCK_DIR);
  return files
    .filter(f => f.endsWith(".profile.json"))
    .map(f => f.replace(".profile.json", ""))
    .sort();
}

export async function getUserBundle(usernameRaw){
  const username = (usernameRaw || "").trim().toLowerCase();

  if(!username){
    const err = new Error("Username is required");
    err.status = 400;
    throw err;
  }

  if(!OFFLINE_MODE){
    // TODO: IMPLEMENT USER BUNDLE FOR ONLINE VERSION
    const err = new Error("Online version for user bundle is not implemented yet")
    err.status = 501;
    throw err;
  }

  try{
    const profile = readJsonFile(getMockPath(username, "profile"));
    const events = readJsonFile(getMockPath(username, "events"));
    const repos = readJsonFile(getMockPath(username, "repos"));

    return {
      profile: profile,
      events: Array.isArray(events) ? events : [],
      repos: Array.isArray(repos) ? repos : []
    }
  } catch (e) {
    const availableUser = getAvailableMockUser();
    const err = new Error(`${username} is not available in offline mock dataset`);
    err.status = 404;
    err.meta = {availableUser: availableUser};
    throw err
  }
}

// console.log(getUserBundle("antfu"));
// console.log(getUserBundle("abc"));