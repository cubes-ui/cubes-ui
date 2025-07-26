import { useCallback } from 'react';
import { isClient } from '../../utils';

export const useSessionStorage = () => {
  const getItem = useCallback((key: string): string | undefined => {
    if (!isClient) return;
    try {
      return sessionStorage.getItem(key) ?? undefined;
    } catch {
      return undefined;
    }
  }, [isClient]);

  const setItem = useCallback((key: string, value: string): void => {
    if (!isClient) return;
    try {
      sessionStorage.setItem(key, value);
    } catch {}
  }, [isClient]);

  const removeItem = useCallback((key: string): void => {
    if (!isClient) return;
    try {
      sessionStorage.removeItem(key);
    } catch {}
  }, [isClient]);

  return { getItem, setItem, removeItem };
};
