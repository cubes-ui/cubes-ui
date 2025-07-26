import { useCallback, useState } from "react";

export function useClipboard() {
  const [isCopied, setIsCopied] = useState(false);

  const copy = useCallback((text: string) => {
    if (!navigator.clipboard) return false;

    navigator.clipboard.writeText(text).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    });
  }, []);

  return { isCopied, copy };
}
