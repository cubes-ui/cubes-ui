export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit = 500
): (...args: Parameters<T>) => void {
  let lastFunc: ReturnType<typeof setTimeout> | null;
  let lastRan: number | null = null;

  return (...args: Parameters<T>) => {
    const now = Date.now();
    if (!lastRan) {
      func(...args);
      lastRan = now;
    } else {
      if (lastFunc) clearTimeout(lastFunc);
      lastFunc = setTimeout(() => {
        if ((Date.now() - (lastRan ?? 0)) >= limit) {
          func(...args);
          lastRan = Date.now();
        }
      }, limit - (now - lastRan));
    }
  };
}
