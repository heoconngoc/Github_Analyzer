import { show } from "./domUtils.js";

export function renderRepos(repos) {
  const repoCard = document.getElementById("repo_card");
  show(repoCard);

  if (repos.length === 0) {
    repoCard.innerHTML = "<p>No repositories found.</p>";
    return;
  }

  repoCard.innerHTML = `
    <h3>Top Repositories</h3>
    <ul>
      ${repos.map(repo => `
        <li>
          <a href="${repo.html_url}" target="_blank">
            <strong>${repo.name}</strong>
          </a>
          <p>${repo.description ?? "No description"}</p>
          <small>
            ⭐ ${repo.stargazers_count} || 
            ${repo.language ? "Language: " + repo.language : ""} || 
            ${repo.size ? "Size: " + repo.size + " KB": ""}
          </small>
        </li>
      `).join("")}
    </ul>
  `;
}