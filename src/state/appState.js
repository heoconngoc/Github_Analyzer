export function setLoading(value) {
  const card = document.getElementById("user_card");
  card.classList.remove("card-hidden");

  if (value) {
    card.innerHTML = `<p class="loading">Loading...</p>`;
  }
};