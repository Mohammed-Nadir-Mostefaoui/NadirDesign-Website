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
    const t = (window.i18n && window.i18n.t) ? window.i18n.t : null;
    const label = theme === 'dark'
      ? (t ? t('nav.theme_to_light') : 'Switch to light mode')
      : (t ? t('nav.theme_to_dark')  : 'Switch to dark mode');
    document.querySelectorAll('[data-theme-toggle]').forEach(btn => {
      btn.setAttribute('aria-label', label);
      btn.setAttribute('aria-pressed', theme === 'dark' ? 'true' : 'false');
    });
  }

  /* Refresh the toggle label when the language changes */
  document.addEventListener('langchange', function () {
    setTheme(root.getAttribute('data-theme') || 'light');
  });

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
