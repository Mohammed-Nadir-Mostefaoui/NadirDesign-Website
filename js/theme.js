/* ============================================================
   THEME — dark / light mode toggle
   Persists preference in localStorage.
   Applies [data-theme="dark"] on <html>.
   ============================================================ */

(function () {
  const STORAGE_KEY = 'nadir-theme';
  const root = document.documentElement;

  function getPreferred() {
    // Default to light mode for first-time visitors — ignore OS/browser
    // color-scheme preference. Only an explicit saved choice (from the
    // toggle) should switch this to dark.
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored || 'light';
  }

  function setTheme(theme) {
    root.setAttribute('data-theme', theme);
    localStorage.setItem(STORAGE_KEY, theme);
    // Update all toggle buttons
    document.querySelectorAll('[data-theme-toggle]').forEach(btn => {
      btn.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
      btn.setAttribute('aria-pressed', theme === 'dark' ? 'true' : 'false');
    });
  }

  function toggle() {
    const current = root.getAttribute('data-theme') || 'light';
    setTheme(current === 'dark' ? 'light' : 'dark');
  }

  // Apply immediately to avoid flash
  setTheme(getPreferred());

  // Expose globally so HTML onclick can call it
  window.themeToggle = toggle;

  // Wire up after DOM is ready
  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('[data-theme-toggle]').forEach(btn => {
      btn.addEventListener('click', toggle);
    });
  });
})();
