import { useCallback } from 'react';
import { isClient } from '../../utils';

export const useIndexedDB = (dbName: string, storeName: string) => {

  const openDB = (): Promise<IDBDatabase> =>
    new Promise((resolve, reject) => {
      if (!isClient) return reject('Not client');
      const request = indexedDB.open(dbName);

      request.onupgradeneeded = () => {
        request.result.createObjectStore(storeName);
      };
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });

  const getItem = useCallback(
    async (key: string): Promise<any | undefined> => {
      try {
        const db = await openDB();
        const tx = db.transaction(storeName, 'readonly');
        const store = tx.objectStore(storeName);
        const request = store.get(key);

        return new Promise((resolve, reject) => {
          request.onsuccess = () => resolve(request.result);
          request.onerror = () => reject(undefined);
        });
      } catch {
        return undefined;
      }
    },
    [dbName, storeName]
  );

  const setItem = useCallback(
    async (key: string, value: any): Promise<void> => {
      try {
        const db = await openDB();
        const tx = db.transaction(storeName, 'readwrite');
        tx.objectStore(storeName).put(value, key);
      } catch {}
    },
    [dbName, storeName]
  );

  const removeItem = useCallback(
    async (key: string): Promise<void> => {
      try {
        const db = await openDB();
        const tx = db.transaction(storeName, 'readwrite');
        tx.objectStore(storeName).delete(key);
      } catch {}
    },
    [dbName, storeName]
  );

  return { getItem, setItem, removeItem };
};
