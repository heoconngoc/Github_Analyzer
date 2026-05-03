import { show, hide } from "./domUtils.js";

const card = document.getElementById("trending_card");
const list = document.getElementById("trending_list");
const bt_loadMore = document.getElementById("load_more_trending");

export function clearTrending() {
  list.innerHTML = "";
};

export function renderTrending(repos, { append = false } = {}) {
  show(card);

  const html = repos.map(repo => `
    <li class="trending-item">
      <a href="${repo.html_url}" target="_blank">
        ${repo.full_name}
      </a>

      <p>${repo.description ?? "No description"}</p>

      <small>
        ⭐ ${repo.stargazers_count}
        ${repo.language ? " • " + repo.language : ""}
        ${repo.size ? " • " + repo.size + " KB" : ""}
      </small>
    </li>
  `).join("");

  if (append) {
    list.insertAdjacentHTML("beforeend", html);
  } else {
    list.innerHTML = html;
  }
}

export function toggleLoadMore(showButton) {
  if (showButton) {
    show(bt_loadMore);
  } else {
    hide(bt_loadMore);
  }
};