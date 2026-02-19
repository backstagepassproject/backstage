const navLinks = document.querySelectorAll('.nav a[href^="#"]');
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-links');
const siteHeader = document.querySelector('.site-header');

const pageLinks = document.querySelectorAll('.nav-links a[href$=".html"]');

if (pageLinks.length) {
  const path = window.location.pathname.split('/').pop() || 'index.html';
  pageLinks.forEach((link) => {
    const href = link.getAttribute('href');
    if (!href) return;
    const normalized = href.replace('./', '');
    if (normalized === path) {
      link.classList.add('is-active');
    }
  });
}

if (navToggle && navMenu) {
  navToggle.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });
}

navLinks.forEach((link) => {
  link.addEventListener('click', (event) => {
    const targetId = link.getAttribute('href');
    if (!targetId || targetId === '#') {
      return;
    }

    const target = document.querySelector(targetId);
    if (!target) {
      return;
    }

    event.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    if (navMenu) {
      navMenu.classList.remove('is-open');
      navToggle?.setAttribute('aria-expanded', 'false');
    }
  });
});

if (siteHeader) {
  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const current = window.scrollY || 0;
    if (current > lastScroll && current > 80) {
      siteHeader.classList.add('is-hidden');
    } else {
      siteHeader.classList.remove('is-hidden');
    }
    lastScroll = current;
  });
}
