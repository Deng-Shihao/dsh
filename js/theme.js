// Theme toggle with system preference detection
(function () {
  const THEME_KEY = "theme-preference";

  function getSystemTheme() {
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }

  function getStoredTheme() {
    return localStorage.getItem(THEME_KEY);
  }

  function setTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    updateIcon(theme);
  }

  function updateIcon(theme) {
    const icon = document.querySelector(".theme-toggle i");
    if (icon) {
      icon.className = theme === "dark" ? "ri-sun-line" : "ri-moon-line";
    }
  }

  function initTheme() {
    const stored = getStoredTheme();
    const theme = stored || getSystemTheme();
    setTheme(theme);
  }

  function toggleTheme() {
    const current = document.documentElement.getAttribute("data-theme");
    const next = current === "dark" ? "light" : "dark";
    localStorage.setItem(THEME_KEY, next);
    setTheme(next);
  }

  // Listen for system theme changes
  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", (e) => {
      if (!getStoredTheme()) {
        setTheme(e.matches ? "dark" : "light");
      }
    });

  // Initialize theme before page renders
  initTheme();

  // Expose toggle function
  window.toggleTheme = toggleTheme;

  // Update icon after DOM loads
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
      const theme =
        getStoredTheme() || getSystemTheme();
      updateIcon(theme);
    });
  } else {
    const theme = getStoredTheme() || getSystemTheme();
    updateIcon(theme);
  }
})();
