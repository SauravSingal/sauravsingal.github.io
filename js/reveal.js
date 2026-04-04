/* ─────────────────────────────────
   SCROLL REVEAL
   Fades elements in as you scroll
───────────────────────────────── */

const revealElements = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // Stagger each element slightly
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, i * 90);

      // Stop watching once visible
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.1
});

revealElements.forEach((el) => observer.observe(el));
