// Custom smooth cursor tracking
const cursor = document.getElementById('custom-cursor');

if (window.matchMedia('(pointer: fine)').matches && cursor) {
  window.addEventListener('mousemove', (e) => {
    cursor.style.left = `${e.clientX}px`;
    cursor.style.top = `${e.clientY}px`;
  });

  const interactiveElements = document.querySelectorAll('a, button, article');
  interactiveElements.forEach((el) => {
    el.addEventListener('mouseenter', () => {
      cursor.style.transform = 'translate(-50%, -50%) scale(2.4)';
      cursor.style.backgroundColor = '#c8e52b';
    });
    el.addEventListener('mouseleave', () => {
      cursor.style.transform = 'translate(-50%, -50%) scale(1)';
    });
  });
} else if (cursor) {
  cursor.style.display = 'none';
}

document.addEventListener('DOMContentLoaded', () => {
  // Scroll-triggered reveal animations
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal-element').forEach((el) => revealObserver.observe(el));

  // Highlight the active nav link while scrolling
  const sections = document.querySelectorAll('main section[id], footer[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.classList.toggle('nav-active', link.getAttribute('href') === `#${entry.target.id}`);
        });
      }
    });
  }, { rootMargin: '-45% 0px -45% 0px' });

  sections.forEach((section) => navObserver.observe(section));
});