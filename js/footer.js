/* ============================================================
   FOOTER — scroll-in reveal, contact form (mailto), copy-to-clipboard
   ============================================================ */
(function () {
  const footer = document.querySelector('.site-footer');
  if (!footer) return;

  /* ── Current year in the copyright line ── */
  const yearEl = document.getElementById('footer-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ── Staggered scroll-in reveal, same pattern as .skill-card-in ── */
  const revealEls = footer.querySelectorAll('.footer-reveal');
  revealEls.forEach((el, i) => {
    el.style.setProperty('--reveal-delay', (i * 90) + 'ms');
  });
  if (revealEls.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });
    revealEls.forEach((el) => observer.observe(el));
  }

  /* Helper: translated string via the i18n public API, with a fallback
     in case i18n.js hasn't run yet for some reason. */
  function t(key, fallback) {
    return (window.i18n && window.i18n.t(key)) || fallback;
  }

  /* ── Contact form → opens the visitor's email client via mailto: ──
     No backend on this static site, so a mailto link is the simplest
     option that actually works from a file:// or any static host. */
  const form   = document.getElementById('footer-form');
  const submit = document.getElementById('footer-submit');
  const label  = submit ? submit.querySelector('.footer-submit-label') : null;

  if (form && submit) {
    let resetTimer = null;

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      if (!form.reportValidity()) return;

      const name    = form.elements['name'].value.trim();
      const email   = form.elements['email'].value.trim();
      const message = form.elements['message'].value.trim();

      const subject = encodeURIComponent(`Portfolio contact — ${name}`);
      const body    = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
      const mailto  = `mailto:contact@nadirdesign.com?subject=${subject}&body=${body}`;

      submit.classList.add('is-sent');
      if (label) label.textContent = t('footer.form_sent', 'Email app opened!');

      window.location.href = mailto;

      clearTimeout(resetTimer);
      resetTimer = setTimeout(() => {
        submit.classList.remove('is-sent');
        if (label) label.textContent = t('footer.form_send', 'Send Message');
      }, 3200);
    });
  }

  /* ── Copy-to-clipboard for the email address ──
     Tries the async Clipboard API first, but that requires a "secure
     context" (https/localhost) and is unavailable on plain file:// pages
     — this site explicitly needs to work there, so a execCommand-based
     fallback covers that case synchronously. */
  function legacyCopy(text) {
    const tmp = document.createElement('textarea');
    tmp.value = text;
    tmp.setAttribute('readonly', '');
    tmp.style.position = 'fixed';
    tmp.style.top = '-1000px';
    tmp.style.opacity = '0';
    document.body.appendChild(tmp);
    tmp.select();
    tmp.setSelectionRange(0, text.length);
    let ok = false;
    try { ok = document.execCommand('copy'); } catch (err) { ok = false; }
    document.body.removeChild(tmp);
    return ok;
  }

  document.querySelectorAll('.fc-copy').forEach((btn) => {
    let copyTimer = null;
    btn.addEventListener('click', function () {
      const value = btn.getAttribute('data-copy-value');
      if (!value) return;

      const showCopied = () => {
        btn.classList.add('is-copied');
        clearTimeout(copyTimer);
        copyTimer = setTimeout(() => btn.classList.remove('is-copied'), 1600);
      };

      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(value).then(showCopied, () => {
          if (legacyCopy(value)) showCopied();
        });
      } else if (legacyCopy(value)) {
        showCopied();
      }
    });
  });

  /* ── Form field hover spotlight — cursor-following glow, same technique
     as .skill-card's mousemove spotlight (fine-pointer devices only). ── */
  if (window.matchMedia('(pointer: fine)').matches) {
    footer.querySelectorAll('.ff-field').forEach((field) => {
      field.addEventListener('mousemove', (e) => {
        const rect = field.getBoundingClientRect();
        field.style.setProperty('--ff-x', (e.clientX - rect.left) + 'px');
        field.style.setProperty('--ff-y', (e.clientY - rect.top) + 'px');
      });
    });
  }
})();
