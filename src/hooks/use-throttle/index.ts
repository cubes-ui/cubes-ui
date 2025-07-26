import { useState, useEffect } from 'react';

export const useThrottle = <T>(value: T, delay = 500): T => {
  const [throttledValue, setThrottledValue] = useState<T>(value);
  const [lastUpdateTime, setLastUpdateTime] = useState<number>(Date.now());

  useEffect(() => {
    const now = Date.now();
    if (now - lastUpdateTime >= delay) {
      setThrottledValue(value);
      setLastUpdateTime(now);
    }
  }, [value, delay, lastUpdateTime]);

  return throttledValue;
};
