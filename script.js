// seyrek.dev — script
// Theme toggle, typing animation, fade-in on scroll, keyboard shortcuts.

(function () {
  // ===== Theme =====
  const root = document.documentElement;
  const saved = localStorage.getItem('sd-theme');
  const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
  const initial = saved || (prefersLight ? 'light' : 'dark');
  applyTheme(initial);

  function applyTheme(theme) {
    if (theme === 'light') root.setAttribute('data-theme', 'light');
    else root.removeAttribute('data-theme');
    updateThemeIcon(theme);
  }

  function updateThemeIcon(theme) {
    const btn = document.getElementById('themeToggle');
    if (!btn) return;
    btn.setAttribute('aria-label', theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode');
    btn.innerHTML = theme === 'light'
      ? '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>'
      : '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg>';
  }

  document.addEventListener('click', (e) => {
    if (e.target.closest('#themeToggle')) {
      const cur = root.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
      const next = cur === 'light' ? 'dark' : 'light';
      applyTheme(next);
      localStorage.setItem('sd-theme', next);
    }
  });

  // ===== Typing animation for hero name =====
  const nameEl = document.querySelector('[data-typing]');
  if (nameEl && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const fullText = nameEl.dataset.typing;
    nameEl.textContent = '';
    let i = 0;
    const speed = 70;
    const type = () => {
      if (i < fullText.length) {
        nameEl.textContent += fullText[i++];
        setTimeout(type, speed + Math.random() * 40);
      }
    };
    setTimeout(type, 400);
  } else if (nameEl) {
    nameEl.textContent = nameEl.dataset.typing;
  }

  // ===== Fade-in on scroll =====
  const fadeEls = document.querySelectorAll('.fade-in');
  // Reveal anything already in the viewport immediately so above-the-fold
  // content never gets stuck at opacity:0.
  const revealIfInView = () => {
    fadeEls.forEach((el) => {
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight && r.bottom > 0) {
        el.classList.add('visible');
      }
    });
  };
  revealIfInView();
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.05 });
    fadeEls.forEach((el) => io.observe(el));
  } else {
    fadeEls.forEach((el) => el.classList.add('visible'));
  }
  // Belt-and-suspenders fallback: after 600ms, force-reveal anything still hidden.
  setTimeout(() => fadeEls.forEach((el) => el.classList.add('visible')), 600);

  // ===== Keyboard shortcuts =====
  document.addEventListener('keydown', (e) => {
    if (e.target.matches('input, textarea')) return;
    if (e.key === 't' || e.key === 'T') {
      document.getElementById('themeToggle')?.click();
    }
    if (e.key === 'g' && !e.metaKey && !e.ctrlKey) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    if (e.key === 'G') {
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    }
  });

  // ===== Dynamic year in EOF =====
  const yearEl = document.querySelector('[data-year]');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ===== Last commit date =====
  const commitEl = document.querySelector('[data-commit]');
  if (commitEl) commitEl.textContent = new Date().toISOString().slice(0, 10);
})();
