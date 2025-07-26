export function deepClone<T>(obj: T, hash = new WeakMap()): T {
  if (obj === null || typeof obj !== "object") return obj;

  if (hash.has(obj)) return hash.get(obj);

  if (obj instanceof Date) return new Date(obj.getTime()) as any;

  if (obj instanceof RegExp) return new RegExp(obj.source, obj.flags) as any;

  if (obj instanceof Map) {
    const result = new Map();
    hash.set(obj, result);
    obj.forEach((value, key) => {
      result.set(key, deepClone(value, hash));
    });
    return result as any;
  }

  if (obj instanceof Set) {
    const result = new Set();
    hash.set(obj, result);
    obj.forEach((value) => {
      result.add(deepClone(value, hash));
    });
    return result as any;
  }

  if (Array.isArray(obj)) {
    const result: any[] = [];
    hash.set(obj, result);
    obj.forEach((item, index) => {
      result[index] = deepClone(item, hash);
    });
    return result as any;
  }

  const result: Record<string | symbol, any> = {};
  hash.set(obj, result);

  [...Object.keys(obj), ...Object.getOwnPropertySymbols(obj)].forEach((key) => {
    result[key] = deepClone((obj as any)[key], hash);
  });

  return result as T;
}
