/* ============================================================
   WORK SECTION — case-study explorer
   ARIA tabs (vertical desktop / horizontal mobile), sliding
   indicator bar, and re-triggering count-up stats.
   ============================================================ */
(function () {
  'use strict';

  var tablist = document.querySelector('.work-tablist');
  if (!tablist) return;

  var tabs      = Array.prototype.slice.call(tablist.querySelectorAll('.work-tab'));
  var indicator = tablist.querySelector('.work-tab-indicator');
  var panels    = Array.prototype.slice.call(document.querySelectorAll('.work-panel'));

  if (!tabs.length || !panels.length) return;

  var mobileQuery = window.matchMedia('(max-width: 900px)');

  /* ── Count-up stat animation ─────────────────────────────── */
  function animateStat(el) {
    var raw = el.getAttribute('data-count');
    var target = parseFloat(raw);
    if (isNaN(target)) return;
    var isDecimal = raw.indexOf('.') !== -1;
    var duration = 900;
    var start = null;

    function step(ts) {
      if (start === null) start = ts;
      var progress = Math.min((ts - start) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3);
      var value = target * eased;
      el.textContent = isDecimal ? value.toFixed(1) : Math.round(value);
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = isDecimal ? target.toFixed(1) : String(target);
      }
    }
    requestAnimationFrame(step);
  }

  function animateStatsIn(panel) {
    var nums = panel.querySelectorAll('.work-stat-num[data-count]');
    nums.forEach(function (el) { animateStat(el); });
  }

  /* ── Sliding indicator ───────────────────────────────────── */
  /* Uses offsetLeft/offsetTop (relative to .work-tablist, its offsetParent)
     rather than getBoundingClientRect + scrollLeft. Both the indicator and
     the tabs live inside the same scrolling container, so offset-based
     positioning stays correct at any scroll position with no extra math —
     and it sidesteps scrollLeft's inverted/negative sign convention in RTL
     scroll containers, which threw the horizontal (mobile) position off. */
  function positionIndicator(tab) {
    if (!indicator || !tab) return;

    if (mobileQuery.matches) {
      indicator.style.height = '';
      indicator.style.width  = tab.offsetWidth + 'px';
      indicator.style.transform = 'translateX(' + tab.offsetLeft + 'px)';
    } else {
      indicator.style.width  = '';
      indicator.style.height = tab.offsetHeight + 'px';
      indicator.style.transform = 'translateY(' + tab.offsetTop + 'px)';
    }
  }

  /* Stats only count up once the section has actually been seen — no
     point animating numbers that finish before the user scrolls to them. */
  var hasEnteredView = false;
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting && !hasEnteredView) {
        hasEnteredView = true;
        var activeIndex = tabs.findIndex(function (t) { return t.getAttribute('aria-selected') === 'true'; });
        animateStatsIn(panels[activeIndex === -1 ? 0 : activeIndex]);
        observer.disconnect();
      }
    });
  }, { threshold: 0.25 });
  var panelsWrap = document.querySelector('.work-panels');
  if (panelsWrap) observer.observe(panelsWrap);

  /* ── Activate a tab/panel pair ───────────────────────────── */
  function activate(index, opts) {
    opts = opts || {};
    tabs.forEach(function (tab, i) {
      var selected = i === index;
      tab.setAttribute('aria-selected', String(selected));
      tab.setAttribute('tabindex', selected ? '0' : '-1');
    });
    panels.forEach(function (panel, i) {
      var active = i === index;
      panel.classList.toggle('is-active', active);
      if (active) {
        panel.removeAttribute('hidden');
      } else {
        panel.setAttribute('hidden', '');
      }
    });

    positionIndicator(tabs[index]);

    /* Re-animate stats on every user-driven switch; the very first
       (page-load) activation is handled separately by the IntersectionObserver
       above so numbers don't finish counting before the section is visible. */
    if (opts.userTriggered && panels[index]) animateStatsIn(panels[index]);

    if (opts.focus) tabs[index].focus();
  }

  /* ── Click handling ──────────────────────────────────────── */
  tabs.forEach(function (tab, i) {
    tab.addEventListener('click', function () {
      activate(i, { userTriggered: true });
    });
  });

  /* ── Keyboard: standard ARIA tabs pattern ───────────────── */
  tablist.addEventListener('keydown', function (e) {
    var current = tabs.findIndex(function (t) { return t === document.activeElement; });
    if (current === -1) return;

    var next = null;
    switch (e.key) {
      case 'ArrowDown':
      case 'ArrowRight':
        next = (current + 1) % tabs.length;
        break;
      case 'ArrowUp':
      case 'ArrowLeft':
        next = (current - 1 + tabs.length) % tabs.length;
        break;
      case 'Home':
        next = 0;
        break;
      case 'End':
        next = tabs.length - 1;
        break;
      default:
        return;
    }
    e.preventDefault();
    activate(next, { focus: true, userTriggered: true });
  });

  /* ── Keep indicator aligned across resizes / breakpoint flips ── */
  var resizeTimer;
  window.addEventListener('resize', function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      var activeIndex = tabs.findIndex(function (t) { return t.getAttribute('aria-selected') === 'true'; });
      positionIndicator(tabs[activeIndex === -1 ? 0 : activeIndex]);
    }, 120);
  }, { passive: true });

  /* ── Init ────────────────────────────────────────────────── */
  activate(0);

  /* Re-measure once webfonts finish loading. The activate(0) call above
     can run before IBM Plex Sans has swapped in — font-display: swap
     (see index.html's font <link>) renders a fallback font immediately,
     so the indicator's initial width/position gets measured against
     fallback-font tab sizes. On mobile the indicator's width tracks the
     tab's own content width (translateX + width), so once the real font
     swaps in and the label reflows, the bar is left the wrong size/place
     until the user interacts with a tab. document.fonts.ready resolves
     once every font used on the page has actually loaded, so this
     corrects it reliably regardless of connection speed. */
  if (window.document && document.fonts && document.fonts.ready) {
    document.fonts.ready.then(function () {
      var activeIndex = tabs.findIndex(function (t) { return t.getAttribute('aria-selected') === 'true'; });
      positionIndicator(tabs[activeIndex === -1 ? 0 : activeIndex]);
    });
  }
})();
