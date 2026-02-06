// ===== Dark Mode Toggle =====
// Default is dark (no data-theme attribute). Light is toggled via data-theme="light".

const savedTheme = localStorage.getItem("theme");
const prefersLight = window.matchMedia("(prefers-color-scheme: light)");

// Set initial theme
if (savedTheme === "light" || (!savedTheme && prefersLight.matches)) {
  document.documentElement.setAttribute("data-theme", "light");
  updateIcon("light");
} else {
  updateIcon("dark");
}

function updateIcon(theme) {
  const iconEl = document.getElementById("darkModeIcon");
  if (!iconEl) return;

  if (theme === "light") {
    // Show moon icon (click to go dark)
    iconEl.innerHTML = '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>';
  } else {
    // Show sun icon (click to go light)
    iconEl.innerHTML =
      '<circle cx="12" cy="12" r="5"></circle>' +
      '<line x1="12" y1="1" x2="12" y2="3"></line>' +
      '<line x1="12" y1="21" x2="12" y2="23"></line>' +
      '<line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>' +
      '<line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>' +
      '<line x1="1" y1="12" x2="3" y2="12"></line>' +
      '<line x1="21" y1="12" x2="23" y2="12"></line>' +
      '<line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>' +
      '<line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>';
  }
}

function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute("data-theme");
  const newTheme = currentTheme === "light" ? "dark" : "light";

  if (newTheme === "dark") {
    document.documentElement.removeAttribute("data-theme");
  } else {
    document.documentElement.setAttribute("data-theme", "light");
  }

  localStorage.setItem("theme", newTheme);
  updateIcon(newTheme);
}

document
  .getElementById("darkModeToggle")
  .addEventListener("click", toggleTheme);

// ===== Active Nav Section Tracking =====
const navLinks = document.querySelectorAll(".sidebar nav a[data-section]");
const sections = document.querySelectorAll("section[id]");

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navLinks.forEach((link) => link.classList.remove("active"));
        const activeLink = document.querySelector(
          `.sidebar nav a[data-section="${entry.target.id}"]`
        );
        if (activeLink) activeLink.classList.add("active");
      }
    });
  },
  { rootMargin: "-20% 0px -60% 0px" }
);

sections.forEach((section) => sectionObserver.observe(section));

// ===== Fade-in on Scroll =====
const fadeElements = document.querySelectorAll(".fade-in");
const fadeObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.1 }
);

fadeElements.forEach((el) => fadeObserver.observe(el));
