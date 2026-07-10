/* ────────────────────────────────────────────────────────────
   CV preview modal
   • Desktop (> 760px): opens an in-page modal that embeds the CV PDF,
     with Download and Open-in-new-tab actions.
   • Mobile (≤ 760px): mobile browsers render embedded PDFs poorly, so
     the trigger opens the PDF directly in a new tab instead.
   Triggers: any element with [data-cv-open]. Closers: [data-cv-close].
   ──────────────────────────────────────────────────────────── */
(function () {
  const modal = document.getElementById('cvModal');
  if (!modal) return;

  const pdf   = modal.getAttribute('data-cv-pdf');
  const drive = modal.getAttribute('data-cv-drive') || null;
  const frame = modal.querySelector('.cv-modal__frame');
  const frameSrc = frame ? frame.getAttribute('data-cv-src') : pdf;
  const isMobile = () => window.matchMedia('(max-width: 760px)').matches;
  let lastFocus = null;

  function openModal() {
    lastFocus = document.activeElement;
    if (frame && (!frame.src || frame.src === 'about:blank' ||
        frame.src.endsWith('about:blank'))) {
      frame.src = frameSrc;
    }
    modal.hidden = false;
    void modal.offsetWidth;           // reflow so the transition runs
    modal.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    const closeBtn = modal.querySelector('.cv-modal__close');
    if (closeBtn) closeBtn.focus();
    document.addEventListener('keydown', onKey);
  }

  function closeModal() {
    modal.classList.remove('is-open');
    document.body.style.overflow = '';
    document.removeEventListener('keydown', onKey);
    const hide = () => { modal.hidden = true; };
    let done = false;
    modal.addEventListener('transitionend', function te() {
      if (done) return; done = true;
      modal.removeEventListener('transitionend', te); hide();
    });
    setTimeout(function () {
      if (!done && !modal.classList.contains('is-open')) { done = true; hide(); }
    }, 350);
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }

  function onKey(e) {
    if (e.key === 'Escape') closeModal();
    // simple focus trap
    if (e.key === 'Tab') {
      const f = modal.querySelectorAll('a[href], button:not([disabled]), iframe');
      if (!f.length) return;
      const first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  }

  document.querySelectorAll('[data-cv-open]').forEach(function (el) {
    el.addEventListener('click', function (e) {
      e.preventDefault();
      if (isMobile()) { window.open(drive || pdf, '_blank', 'noopener'); return; }
      openModal();
    });
  });

  modal.querySelectorAll('[data-cv-close]').forEach(function (el) {
    el.addEventListener('click', closeModal);
  });
})();
