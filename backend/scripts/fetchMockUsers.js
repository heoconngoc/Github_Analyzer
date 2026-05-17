import fs from "fs";
import path from "path";

const USERS = [
  "tj",
  "vercel",
  "antfu"
];

const OUT_DIR = path.resolve("mock/users");
fs.mkdirSync(OUT_DIR, { recursive: true });

const headers = {
  "User-Agent": "github-analyzer",
  "Accept": "application/vnd.github+json",
};

async function fetchJson(url) {
  const res = await fetch(url, { headers });
  if (!res.ok) throw new Error(`${res.status} ${await res.text()}`);
  return res.json();
}

async function run() {
  for (const u of USERS) {
    console.log("Fetching:", u);

    const profile = await fetchJson(`https://api.github.com/users/${u}`);
    const repos = await fetchJson(`https://api.github.com/users/${u}/repos?per_page=100&sort=updated`);
    const events = await fetchJson(`https://api.github.com/users/${u}/events?per_page=100`);

    fs.writeFileSync(path.join(OUT_DIR, `${u}.profile.json`), JSON.stringify(profile, null, 2));
    fs.writeFileSync(path.join(OUT_DIR, `${u}.repos.json`), JSON.stringify(repos, null, 2));
    fs.writeFileSync(path.join(OUT_DIR, `${u}.events.json`), JSON.stringify(events, null, 2));
  }

  console.log("Done. Mock users saved to:", OUT_DIR);
}

run().catch(err => {
  console.error("Failed:", err.message);
  process.exit(1);
});