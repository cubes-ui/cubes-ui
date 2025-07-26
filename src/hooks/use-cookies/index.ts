import { useCallback } from 'react';
export interface CookieOptions {
  path?: string;
  maxAge?: number;
  expires?: Date | string;
  secure?: boolean;
  sameSite?: 'Lax' | 'Strict' | 'None';
}

export const useCookies = () => {
  const isClient = typeof window !== 'undefined';

  const getCookie = useCallback((name: string): string | undefined => {
    if (!isClient) return;
    const match = document.cookie.match(
      new RegExp(
        `(?:^|; )${name.replace(/([.$?*|{}()[\]\\/+^])/g, '\\$1')}=([^;]*)`
      )
    );
    return match ? decodeURIComponent(match[1]) : undefined;
  }, [isClient]);

  const setCookie = useCallback(
    (name: string, value: string, options: CookieOptions = {}) => {
      if (!isClient) return;

      let cookieStr = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;

      Object.entries(options).forEach(([key, val]) => {
        cookieStr += `; ${key}`;
        if (val !== true) {
          if (key === 'expires' && val instanceof Date) {
            cookieStr += `=${val.toUTCString()}`;
          } else {
            cookieStr += `=${val}`;
          }
        }
      });

      document.cookie = cookieStr;
    },
    [isClient]
  );

  const deleteCookie = useCallback((name: string) => {
    if (!isClient) return;
    setCookie(name, '', { maxAge: -1 });
  }, [setCookie, isClient]);

  return { getCookie, setCookie, deleteCookie };
};
