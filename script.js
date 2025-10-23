// Check for saved theme preference or respect system preference
const savedTheme = localStorage.getItem("theme");
const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");

// Set theme on page load
if (savedTheme === "dark" || (!savedTheme && prefersDarkScheme.matches)) {
  document.documentElement.setAttribute("data-theme", "dark");
  document.getElementById("darkModeIcon").textContent = "☀️";
}

// Toggle theme function
function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute("data-theme");
  const newTheme = currentTheme === "dark" ? "light" : "dark";

  document.documentElement.setAttribute("data-theme", newTheme);
  localStorage.setItem("theme", newTheme);

  // Update icon
  document.getElementById("darkModeIcon").textContent =
    newTheme === "dark" ? "☀️" : "🌙";
}

// Add event listener to toggle button
document
  .getElementById("darkModeToggle")
  .addEventListener("click", toggleTheme);
