async function getUserInfo(username) {
  try {
    const [userRes, repoRes] = await Promise.all([
      fetch(`https://api.github.com/users/${username}`),
      fetch(`https://api.github.com/users/${username}/repos?per_page=100`)
    ]);

    if (!userRes.ok) {
      throw new Error("User not found");
    }

    const userData = await userRes.json();
    const repoData = await repoRes.json();

    const topRepos = repoData
      .sort((a, b) => b.stargazers_count - a.stargazers_count)
      .slice(0, 5);

    renderUser(userData);
    renderRepos(topRepos);

  } catch (error) {
    console.error(error);
    alert(error.message || "Something went wrong");
  }
};

function renderUser(user) {
  const card = document.getElementById("user_card");
  show(card);

  card.innerHTML = `
    <img class="avatar" src="${user.avatar_url}" alt="Avatar">
    <h2>${user.login}</h2>
    <p><strong>Name:</strong> ${user.name ?? "N/A"}</p>
    <p><strong>Bio:</strong> ${user.bio ?? "N/A"}</p>
    <p><strong>Location:</strong> ${user.location ?? "N/A"}</p>
    <p><strong>Public repos:</strong> ${user.public_repos}</p>
    <p><strong>Followers:</strong> ${user.followers}</p>
    <p><strong>Following:</strong> ${user.following}</p>
    <p>
      <a href="${user.html_url}" target="_blank">View GitHub Profile</a>
    </p>
  `;
};

function renderRepos(repos) {
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
            ${repo.size ? "Size: " + repo.size : ""}
          </small>
        </li>
      `).join("")}
    </ul>
  `;
};

function setLoading(value) {
  const card = document.getElementById("user_card");
  card.classList.remove("card-hidden");

  if (value) {
    card.innerHTML = `<p class="loading">Loading...</p>`;
  }
};

function show(element) {
  element.classList.remove("card-hidden");
}

function hide(element) {
  element.classList.add("card-hidden");
}

/* =========================
   Main Logic
   ========================= */

const form = document.getElementById("div_search");
const toggle_bt = document.getElementById("toggle_bt")

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const username = document.getElementById("input_search").value.trim();
  if (!username) {
    alert("Please enter a GitHub username");
    return;
  }

  setLoading(true);
  try {
    await getUserInfo(username);
  } finally {
    setLoading(false);
  }
});

toggle_bt.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  toggle_bt.textContent =
    document.body.classList.contains("dark") ? "☀️" : "🌙";
});