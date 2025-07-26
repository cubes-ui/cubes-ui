export const isClient = typeof window !== "undefined";
export const isBrowser = isClient && typeof window.document !== "undefined";
