import type { MutableRefObject, Ref } from "react";

export function mergeRefs<T>(
  ...refs: (Ref<T> | undefined)[]
): (instance: T | null) => void {
  return (instance: T | null) => {
    refs.forEach((ref) => {
      if (!ref) return;

      if (typeof ref === "function") {
        ref(instance);
      } else {
        try {
          const r = ref as MutableRefObject<T | null>;
          r.current = instance;
        } catch {}
      }
    });
  };
}
