/* ============================================================
   case-study.js — motion & interaction for the case-study pages
   Reuses the homepage patterns: IntersectionObserver reveal with
   --reveal-delay stagger, count-up stats, cursor spotlight, and
   copy-to-clipboard. All motion respects prefers-reduced-motion.
   ============================================================ */
(function () {
  'use strict';

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var hasIO  = 'IntersectionObserver' in window;

  /* ── Scroll-in reveal (staggered per parent) ─────────────── */
  var SEL = '.cs-hero-copy > *, .cs-hero-visual, .cs-section .cs-eyebrow, .cs-section .cs-h2, .cs-section .cs-lead, .cs-stat, .cs-card, .cs-split-col, .cs-phase, .cs-layer, .cs-swatch, .cs-specimen, .cs-inv, .cs-rule, .cs-a11y-item, .cs-status-item, .cs-shot, .cs-quote, .cs-pager';
  var els = Array.prototype.slice.call(document.querySelectorAll(SEL));

  var counts = new Map();
  els.forEach(function (el) {
    var p = el.parentNode;
    var n = counts.get(p) || 0;
    el.style.setProperty('--reveal-delay', Math.min(n * 70, 420) + 'ms');
    counts.set(p, n + 1);
  });

  if (reduce || !hasIO) {
    els.forEach(function (el) { el.classList.add('is-visible'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('is-visible'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    els.forEach(function (el) { io.observe(el); });
  }

  /* ── Count-up stat band ──────────────────────────────────── */
  function countUp(el) {
    var target = parseFloat(el.getAttribute('data-count'));
    if (isNaN(target)) return;
    var comma = el.hasAttribute('data-comma');
    var fmt = function (v) { return comma ? v.toLocaleString('en-US') : String(v); };
    if (reduce) { el.textContent = fmt(target); return; }
    var dur = 1100, start = null;
    (function step(ts) {
      if (start === null) start = ts;
      var p = Math.min((ts - start) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = fmt(Math.round(target * eased));
      if (p < 1) requestAnimationFrame(step);
    })(performance.now());
  }

  var stats = document.querySelector('.cs-stats');
  if (stats) {
    var run = function () { stats.querySelectorAll('.cs-stat-num[data-count]').forEach(countUp); };
    if (reduce || !hasIO) {
      run();
    } else {
      var seen = false;
      var so = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting && !seen) { seen = true; run(); so.disconnect(); }
        });
      }, { threshold: 0.3 });
      so.observe(stats);
    }
  }

  /* ── Cursor spotlight on interactive cards (fine pointer) ── */
  if (window.matchMedia('(pointer: fine)').matches) {
    document.querySelectorAll('.cs-card, .cs-layer, .cs-rule, .cs-a11y-item, .cs-status-item').forEach(function (card) {
      card.addEventListener('mousemove', function (e) {
        var r = card.getBoundingClientRect();
        card.style.setProperty('--sk-x', (e.clientX - r.left) + 'px');
        card.style.setProperty('--sk-y', (e.clientY - r.top) + 'px');
      });
    });
  }

  /* ── Colour tokens → copy hex (Clipboard API + file:// fallback) ── */
  function legacyCopy(text) {
    var t = document.createElement('textarea');
    t.value = text; t.setAttribute('readonly', '');
    t.style.position = 'fixed'; t.style.top = '-1000px'; t.style.opacity = '0';
    document.body.appendChild(t); t.select();
    var ok = false; try { ok = document.execCommand('copy'); } catch (err) { ok = false; }
    document.body.removeChild(t); return ok;
  }

  document.querySelectorAll('.cs-swatch[data-hex]').forEach(function (sw) {
    var hexEl = sw.querySelector('.cs-swatch-hex');
    var orig  = hexEl ? hexEl.textContent : '';
    var timer;
    sw.setAttribute('role', 'button');
    sw.setAttribute('tabindex', '0');
    /* aria-label comes from data-i18n-aria-label in the markup so it
       translates and live-updates on language switch. */

    function done() {
      sw.classList.add('is-copied');
      if (hexEl) hexEl.textContent = (window.i18n ? window.i18n.t('cs.ui.copied') : 'Copied!');
      clearTimeout(timer);
      timer = setTimeout(function () {
        sw.classList.remove('is-copied');
        if (hexEl) hexEl.textContent = orig;
      }, 1300);
    }
    function copy() {
      var val = sw.getAttribute('data-hex');
      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(val).then(done, function () { if (legacyCopy(val)) done(); });
      } else if (legacyCopy(val)) { done(); }
    }
    sw.addEventListener('click', copy);
    sw.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); copy(); }
    });
  });

  /* ── Lightbox: click a screenshot to enlarge it in-page ─── */
  var zooms = document.querySelectorAll('.cs-zoom');
  if (zooms.length) {
    var box = null, boxImg = null;
    function ensureBox() {
      if (box) return;
      box = document.createElement('div');
      box.className = 'cs-lightbox';
      var closeLabel = (window.i18n ? window.i18n.t('cs.ui.close') : 'Close');
      box.innerHTML = '<button class="cs-lightbox-close" type="button" aria-label="' + closeLabel + '"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg></button><img alt="">';
      boxImg = box.querySelector('img');
      document.body.appendChild(box);
      box.addEventListener('click', function (e) {
        if (e.target === box || e.target.closest('.cs-lightbox-close')) closeBox();
      });
    }
    function openBox(src, alt) { ensureBox(); boxImg.src = src; boxImg.alt = alt || ''; box.classList.add('is-open'); document.body.style.overflow = 'hidden'; }
    function closeBox() { if (box) { box.classList.remove('is-open'); document.body.style.overflow = ''; } }
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeBox(); });
    zooms.forEach(function (z) {
      z.addEventListener('click', function () {
        var img = z.querySelector('img');
        if (!img || img.naturalWidth === 0 || z.classList.contains('is-empty')) return;
        openBox(img.currentSrc || img.src, img.alt);
      });
    });
  }

})();
