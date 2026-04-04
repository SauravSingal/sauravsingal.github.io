/* ─────────────────────────────────
   NAV
   Adds a frosted glass effect to the
   navbar once the user scrolls down
───────────────────────────────── */

const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 80) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});
