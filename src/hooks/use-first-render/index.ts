import { useRef, useEffect } from "react";

const useFirstRender = (): boolean => {
  const firstRef = useRef(true);

  useEffect(() => {
    firstRef.current = false;
  }, []);

  return firstRef.current;
};

export default useFirstRender;
