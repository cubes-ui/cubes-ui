import { useRef, useEffect } from "react";

export const useFirstRender = (): boolean => {
  const firstRef = useRef(true);

  useEffect(() => {
    firstRef.current = false;
  }, []);

  return firstRef.current;
};