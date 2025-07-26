import { useCallback } from 'react';
import { isClient } from '../../utils';

export const useCache = (cacheName: string = 'default-cache') => {

  const openCache = (): Promise<Cache> => {
    if (!isClient || !('caches' in window)) {
      return Promise.reject('No cache API available');
    }
    return caches.open(cacheName);
  };

  const setItem = useCallback(async (key: string, response: Response) => {
    try {
      const cache = await openCache();
      await cache.put(new Request(key), response.clone());
    } catch {}
  }, [cacheName]);

  const getItem = useCallback(async (key: string): Promise<Response | undefined> => {
    try {
      const cache = await openCache();
      const match = await cache.match(new Request(key));
      return match ?? undefined;
    } catch {
      return undefined;
    }
  }, [cacheName]);

  const removeItem = useCallback(async (key: string) => {
    try {
      const cache = await openCache();
      await cache.delete(new Request(key));
    } catch {}
  }, [cacheName]);

  return { getItem, setItem, removeItem };
};
