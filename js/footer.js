/* ============================================================
   FOOTER — scroll-in reveal, contact form (Formspree), copy-to-clipboard
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

  /* ── Contact form → submits to Formspree via fetch (AJAX) ──
     Keeps the visitor on the page (no redirect to Formspree's own thank-you
     page) so the button/status text can show sending → sent → error states
     inline. The form also carries a real action="…" + method="POST" in the
     HTML as a no-JS fallback: if fetch is unavailable for some reason, the
     browser still submits the form natively straight to Formspree. */
  const form   = document.getElementById('footer-form');
  const submit = document.getElementById('footer-submit');
  const label  = submit ? submit.querySelector('.footer-submit-label') : null;
  const status = document.getElementById('ff-status');

  if (form && submit) {
    let resetTimer = null;

    function setStatus(text, isError) {
      if (!status) return;
      status.textContent = text || '';
      status.classList.toggle('is-error', !!isError);
      status.classList.toggle('is-visible', !!text);
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      if (!form.reportValidity()) return;

      clearTimeout(resetTimer);
      submit.disabled = true;
      submit.classList.remove('is-sent');
      if (label) label.textContent = t('footer.form_sending', 'Sending…');
      setStatus('', false);

      fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { 'Accept': 'application/json' }
      })
        .then((response) => {
          if (!response.ok) throw new Error('Formspree request failed');

          submit.classList.add('is-sent');
          if (label) label.textContent = t('footer.form_sent', 'Message sent!');
          form.reset();

          resetTimer = setTimeout(() => {
            submit.disabled = false;
            submit.classList.remove('is-sent');
            if (label) label.textContent = t('footer.form_send', 'Send Message');
          }, 3200);
        })
        .catch(() => {
          submit.disabled = false;
          if (label) label.textContent = t('footer.form_send', 'Send Message');
          setStatus(
            t('footer.form_error', 'Something went wrong — please try again, or email me directly.'),
            true
          );
        });
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

  /* ── Project-type selector + CTA prefill ──
     Shared across every footer (homepage + all case-study pages) so the
     "What can I help with?" chips behave identically everywhere, and any
     button carrying data-project-type (e.g. a case-study closing CTA)
     pre-selects the matching chip when clicked. */
  const ptypeChips = Array.prototype.slice.call(document.querySelectorAll('.cs-ptype-chip'));
  if (ptypeChips.length) {
    const ptypeHidden = document.getElementById('ff-project-type');
    const selectType = function (val) {
      ptypeChips.forEach((c) => {
        const on = c.getAttribute('data-value') === val;
        c.classList.toggle('is-active', on);
        c.setAttribute('aria-checked', on ? 'true' : 'false');
      });
      if (ptypeHidden) ptypeHidden.value = val || '';
    };
    ptypeChips.forEach((c) => {
      c.setAttribute('role', 'radio');
      c.setAttribute('aria-checked', 'false');
      c.addEventListener('click', () => selectType(c.getAttribute('data-value')));
    });
    document.querySelectorAll('[data-project-type]').forEach((a) => {
      a.addEventListener('click', () => selectType(a.getAttribute('data-project-type')));
    });
  }
})();
