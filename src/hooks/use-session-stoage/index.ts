import { useEffect, useState } from 'react';

const useSessionStorage = <T = any>(key: string, initialValue: T | (() => T)) => {
  const [value, setValue] = useState<T>(() => {
    try {
      const jsonValue = sessionStorage.getItem(key);
      if (jsonValue !== null) return JSON.parse(jsonValue);
      return typeof initialValue === 'function' ? (initialValue as () => T)() : initialValue;
    } catch {
      return typeof initialValue === 'function' ? (initialValue as () => T)() : initialValue;
    }
  });

  useEffect(() => {
    try {
      sessionStorage.setItem(key, JSON.stringify(value));
    } catch {
    }
  }, [key, value]);

  return [value, setValue] as [T, typeof setValue];
};

export default useSessionStorage;
