/* ============================================================
   experience.js — Accordion expand/collapse for the Experience section
   ============================================================ */

(function () {
  'use strict';

  var accItems = document.querySelectorAll('.expa-item');

  accItems.forEach(function (item) {
    var trigger = item.querySelector('.expa-trigger');
    if (!trigger) return;

    trigger.addEventListener('click', function () {
      var isOpen = item.classList.contains('expa-item--open');

      /* Close all others */
      accItems.forEach(function (other) {
        if (other !== item) {
          other.classList.remove('expa-item--open');
          var t = other.querySelector('.expa-trigger');
          if (t) t.setAttribute('aria-expanded', 'false');
        }
      });

      /* Toggle clicked item */
      item.classList.toggle('expa-item--open', !isOpen);
      trigger.setAttribute('aria-expanded', String(!isOpen));
    });
  });

})();

/* ============================================================
   Live "X yrs Y mos" durations for roles still in progress.
   The i18n LOCALES entries (experience.<id>.duration) stay as static
   text purely as a no-JS/first-paint fallback — this recomputes the
   real figure from each role's start date on every load and again on
   every language switch (via i18n.js's "langchange" event), so nobody
   has to remember to bump these numbers by hand as time passes.
   Only roles whose displayed range ends in "Present" are handled here;
   closed roles (Five Angles, SARL GLD) keep their fixed, authored text.
   ============================================================ */
(function () {
  'use strict';

  /* start month is 1-indexed (1 = January). Verified against the
     currently-authored duration strings (EN/FR/AR) at time of writing,
     e.g. Datamaster: Sep 2024 start → "1 yr 11 mos" as of mid-2026. */
  var ONGOING_ROLES = [
    { id: 'nawat', startYear: 2026, startMonth: 1 },
    { id: 'dma',   startYear: 2024, startMonth: 9 },
    { id: 'atqin', startYear: 2023, startMonth: 6 }
  ];

  function monthsElapsed(startYear, startMonth) {
    var now = new Date();
    var total = (now.getFullYear() - startYear) * 12 + ((now.getMonth() + 1) - startMonth) + 1;
    return total < 1 ? 1 : total;
  }

  function arYearWord(n) {
    if (n === 1) return 'سنة';
    if (n === 2) return 'سنتان';
    if (n >= 3 && n <= 10) return n + ' سنوات';
    return n + ' سنة';
  }
  function arMonthWord(n) {
    if (n === 1) return 'شهر واحد';
    if (n === 2) return 'شهران';
    if (n >= 3 && n <= 10) return n + ' أشهر';
    return n + ' شهرًا';
  }

  function formatDuration(totalMonths, lang) {
    var years  = Math.floor(totalMonths / 12);
    var months = totalMonths % 12;

    if (lang === 'fr') {
      var yPartFr = years  > 0 ? years + ' ' + (years === 1 ? 'an' : 'ans') : '';
      var mPartFr = months > 0 ? months + ' mois' : '';
      return [yPartFr, mPartFr].filter(Boolean).join(' ');
    }
    if (lang === 'ar') {
      var yPartAr = years  > 0 ? arYearWord(years)  : '';
      var mPartAr = months > 0 ? arMonthWord(months) : '';
      if (yPartAr && mPartAr) return yPartAr + ' و' + mPartAr;
      return yPartAr || mPartAr;
    }
    /* default: en */
    var yPartEn = years  > 0 ? years + ' ' + (years === 1 ? 'yr' : 'yrs') : '';
    var mPartEn = months > 0 ? months + ' ' + (months === 1 ? 'mo' : 'mos') : '';
    return [yPartEn, mPartEn].filter(Boolean).join(' ');
  }

  function updateDurations() {
    var lang = (window.i18n && window.i18n.current) ? window.i18n.current() : (document.documentElement.getAttribute('lang') || 'en');
    ONGOING_ROLES.forEach(function (role) {
      var el = document.querySelector('[data-i18n="experience.' + role.id + '.duration"]');
      if (!el) return;
      el.textContent = formatDuration(monthsElapsed(role.startYear, role.startMonth), lang);
    });
  }

  document.addEventListener('DOMContentLoaded', updateDurations);
  document.addEventListener('langchange', updateDurations);
})();
