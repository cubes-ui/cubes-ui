import { useEffect, useState } from "react";

export const useLocalStorage = <T = any>(key: string, initialValue: T | (() => T)) => {
  const [value, setValue] = useState<T>(() => {
    try {
      const json = localStorage.getItem(key);
      if (json !== null) return JSON.parse(json);
      return typeof initialValue === "function"
        ? (initialValue as () => T)()
        : initialValue;
    } catch {
      return typeof initialValue === "function"
        ? (initialValue as () => T)()
        : initialValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {}
  }, [key, value]);

  useEffect(() => {
    const sync = (e: StorageEvent) => {
      if (e.key === key && e.newValue !== null) {
        try {
          setValue(JSON.parse(e.newValue));
        } catch {}
      }
    };
    window.addEventListener("storage", sync);
    return () => window.removeEventListener("storage", sync);
  }, [key]);

  return [value, setValue] as [T, typeof setValue];
};
