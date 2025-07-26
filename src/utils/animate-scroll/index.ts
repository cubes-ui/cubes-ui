export function animateScroll(
  targetY: number,
  duration = 500,
  easingFunc?: (t: number) => number
) {
  const startY = window.scrollY || window.pageYOffset;
  const diff = targetY - startY;
  const startTime = performance.now();

  const easeInOutQuad = (t: number) =>
    t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;

  const ease = easingFunc || easeInOutQuad;

  function step(currentTime: number) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const easedProgress = ease(progress);

    window.scrollTo(0, startY + diff * easedProgress);

    if (elapsed < duration) {
      requestAnimationFrame(step);
    }
  }

  requestAnimationFrame(step);
}
