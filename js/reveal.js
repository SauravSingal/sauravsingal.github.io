/* ─────────────────────────────────
   HERO MARQUEE
───────────────────────────────── */

const track = document.getElementById('hero-marquee');

if (track) {
  // Step 1: clone until we have 3x screen width
  while (track.scrollWidth < window.innerWidth * 3) {
    track.innerHTML += track.innerHTML;
  }

  // Step 2: measure AFTER cloning
  const loopWidth = track.scrollWidth / 2;

  let x           = 0;
  let speed = 0.5;
  let targetSpeed = 0.5;

  function tick() {
    // Ease toward target direction
    speed += (targetSpeed - speed) * 0.02;

    // Never let it fully stop
    // limiter
	if (Math.abs(speed) < 0.05) {
	  speed = 0.05 * Math.sign(targetSpeed);
	}

    x -= speed;

    // Seamless loop in both directions
    if (x <= -loopWidth) x += loopWidth;
    if (x > 0)           x -= loopWidth;

    track.style.transform = `translateX(${x}px)`;
    requestAnimationFrame(tick);
  }

  tick();

  // Scroll direction detection
  let lastY = window.scrollY;

  window.addEventListener('scroll', () => {
    // scroll
	targetSpeed = window.scrollY > lastY ? .5 : -.5;
    lastY = window.scrollY;
  });
}

/* ─────────────────────────────────
   SCROLL REVEAL
───────────────────────────────── */

const revealElements = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 90);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

revealElements.forEach((el) => observer.observe(el));
