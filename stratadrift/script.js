const input = document.getElementById("searchInput");
const cards = [...document.querySelectorAll(".resource-card")];
const noResults = document.getElementById("noResults");
const menuBtn = document.getElementById("menuBtn");
const nav = document.querySelector(".nav");

function searchResources(value) {
  const q = value.trim().toLowerCase();
  let shown = 0;
  cards.forEach(card => {
    const haystack = (card.dataset.search + " " + card.innerText).toLowerCase();
    const match = !q || haystack.includes(q);
    card.style.display = match ? "" : "block";
    if (!match) card.style.display = "none";
    if (match) shown++;
  });
  noResults.style.display = shown ? "none" : "block";
}
input?.addEventListener("input", e => searchResources(e.target.value));

document.addEventListener("keydown", e => {
  if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
    e.preventDefault();
    input?.focus();
  }
  if (e.key === "Escape" && document.activeElement === input) {
    input.value = "";
    searchResources("");
    input.blur();
  }
});

menuBtn?.addEventListener("click", () => nav.classList.toggle("open"));
nav?.querySelectorAll("a").forEach(a => a.addEventListener("click", () => nav.classList.remove("open")));
