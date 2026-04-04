/* ─────────────────────────────────
   CURSOR
   Custom magnetic cursor effect
───────────────────────────────── */

const cursor   = document.getElementById('cursor');
const follower = document.getElementById('follower');

let mouseX = 0, mouseY = 0;
let followX = 0, followY = 0;

// Move small dot instantly
document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursor.style.left = mouseX + 'px';
  cursor.style.top  = mouseY + 'px';
});

// Lag the follower ring for smooth feel
(function animateFollower() {
  followX += (mouseX - followX) * 0.12;
  followY += (mouseY - followY) * 0.12;
  follower.style.left = followX + 'px';
  follower.style.top  = followY + 'px';
  requestAnimationFrame(animateFollower);
})();

// Grow cursor when hovering interactive elements
const hoverTargets = document.querySelectorAll('a, .skill-item, .cta-btn');

hoverTargets.forEach((el) => {
  el.addEventListener('mouseenter', () => {
    cursor.style.width    = '20px';
    cursor.style.height   = '20px';
    follower.style.width  = '60px';
    follower.style.height = '60px';
  });

  el.addEventListener('mouseleave', () => {
    cursor.style.width    = '10px';
    cursor.style.height   = '10px';
    follower.style.width  = '36px';
    follower.style.height = '36px';
  });
});
