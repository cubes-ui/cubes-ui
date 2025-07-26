import { useTransition, useCallback } from 'react';

export const useLazyTransition = () => {
  const [isPending, startTransition] = useTransition();

  const start = useCallback(
    (action: () => void) => {
      startTransition(() => {
        action();
      });
    },
    [startTransition]
  );

  return {
    isPending,
    start,
  };
};
