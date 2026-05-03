import { getUserWithTopRepos } from "./services/userService.js";
import { renderUser } from "./ui/renderUser.js";
import { renderRepos } from "./ui/renderRepos.js";
import { initThemeToggle } from "./theme/theme.js";
import { setLoading } from "./state/appState.js";
import { getTopTrendingRepo } from "./services/trendingService.js";
import { renderTrending, clearTrending, toggleLoadMore } from "./ui/renderTrending.js";

/* =========================
   LOGIC TRENDING
   ========================= */

let currentTrendingPage = 1;
let currentTrendingRange = "all"; // "week" | "month" | "all"

async function loadTrending({ reset = false } = {}) {
  if (reset) {
    currentTrendingPage = 1;
    clearTrending();
  }

  const { repos, hasMore } = await getTopTrendingRepo(
    currentTrendingRange,
    currentTrendingPage
  );

  renderTrending(repos, { append: !reset });
  toggleLoadMore(hasMore);
}

/* =========================
   LOGIC WEEK/ MONTH/ ALL BUTTONS
   ========================= */

const filterButtons = document.querySelectorAll(".trending-filters button");

filterButtons.forEach(btn => {
  btn.addEventListener("click", async () => {
    filterButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    currentTrendingRange = btn.dataset.range;

    await loadTrending({ reset: true });
  });
});

/* =========================
   LOGIC LOADING MORE BUTTON
   ========================= */

const loadMoreBtn = document.getElementById("load_more_trending");

loadMoreBtn.addEventListener("click", async () => {
  currentTrendingPage++;
  await loadTrending();
});

/* =========================
   LOGIC SWITCH TABS
   ========================= */
const tabButtons = document.querySelectorAll(".tab-button");
const tabContents = document.querySelectorAll(".tab-content");

tabButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    const targetTab = btn.dataset.tab;

    tabButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    tabContents.forEach(section => {
      section.classList.toggle(
        "active",
        section.id === `tab-${targetTab}`
      );
    });
  });
});

/* =========================
   LOGIC SEARCH GITHUB USERNAME INFORMATION
   ========================= */

const form = document.getElementById("div_search");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const username = document.getElementById("input_search").value.trim();
  if (!username) {
    alert("Please enter a GitHub username");
    return;
  }

  setLoading(true);

  try {
    const { user, topRepos } = await getUserWithTopRepos(username);
    renderUser(user);
    renderRepos(topRepos);
  } catch (err) {
    alert(err.message);
  } finally {
    setLoading(false);
  }
});

initThemeToggle();
loadTrending({ reset: true });