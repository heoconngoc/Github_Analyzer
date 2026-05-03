import { show } from "./domUtils.js";

export function renderUser(user) {
  const card = document.getElementById("user_card");
  show(card);

  card.innerHTML = `
    <div id="avatar_card">
      <img class="avatar" src="${user.avatar_url}" alt="Avatar">
      <h2>${user.login}</h2>
    </div>
    <div id="info_card">
      <p><strong>Name:</strong> ${user.name ?? "N/A"}</p>
      <p><strong>Bio:</strong> ${user.bio ?? "N/A"}</p>
      <p><strong>Location:</strong> ${user.location ?? "N/A"}</p>
      <p><strong>Public repos:</strong> ${user.public_repos}</p>
      <p><strong>Followers:</strong> ${user.followers}</p>
      <p><strong>Following:</strong> ${user.following}</p>
      <p>
        <a href="${user.html_url}" target="_blank">View GitHub Profile</a>
      </p>
    </div>
  `;
};