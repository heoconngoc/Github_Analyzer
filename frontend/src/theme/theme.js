export function initThemeToggle() {
  const toggle_bt = document.getElementById("toggle_bt");

  toggle_bt.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    toggle_bt.textContent =
      document.body.classList.contains("dark") ? "☀️" : "🌙";
  });
}