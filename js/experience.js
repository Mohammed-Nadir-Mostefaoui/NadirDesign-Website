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
