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

/* ── Resume blob magnetic effect ── */
const blob     = document.getElementById('resumeBlob');
const blobWrap = document.getElementById('resumeWrap');

if (blob && blobWrap) {
  let blobX = 0, blobY = 0;
  let targetX = 0, targetY = 0;
  let isNear = false;

  const MAGNETIC_DISTANCE = 180;  // how far away it starts pulling
  const MAGNETIC_STRENGTH = 0.4;  // how strongly it follows (0-1)

  document.addEventListener('mousemove', (e) => {
    const rect = blobWrap.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top  + rect.height / 2;

    const dx = e.clientX - centerX;
    const dy = e.clientY - centerY;
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (dist < MAGNETIC_DISTANCE) {
      isNear = true;
      // Pull toward cursor
      targetX = dx * MAGNETIC_STRENGTH;
      targetY = dy * MAGNETIC_STRENGTH;
    } else {
      isNear = false;
      // Return to center
      targetX = 0;
      targetY = 0;
    }
  });

  function animateBlob() {
    // Smooth lerp toward target
    blobX += (targetX - blobX) * 0.1;
    blobY += (targetY - blobY) * 0.1;

    blob.style.transform = `translate(calc(-50% + ${blobX}px), calc(-50% + ${blobY}px))`;
    requestAnimationFrame(animateBlob);
  }

  animateBlob();

  // Squish on hover
  blob.addEventListener('mouseenter', () => {
    blob.style.background = '#0f52d4';
  });

  blob.addEventListener('mouseleave', () => {
    blob.style.background = '#1a6cf6';
  });
}
