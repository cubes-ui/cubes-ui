import { useState, useEffect, useRef } from "react";

type Listener<T> = (state: T) => void;

export function createStore<T>(initialState: T) {
  let state = initialState;
  const listeners = new Set<Listener<T>>();

  function setState(newState: T | ((prev: T) => T)) {
    state =
      typeof newState === "function"
        ? (newState as (prev: T) => T)(state)
        : newState;
    listeners.forEach((listener) => listener(state));
  }

  function subscribe(listener: Listener<T>): () => void {
    listeners.add(listener);
    return () => listeners.delete(listener);
  }

  function getState() {
    return state;
  }

  function useStore(): [T, typeof setState] {
    const [, setTick] = useState(0);
    const stateRef = useRef(state);

    useEffect(() => {
      const listener = (newState: T) => {
        if (stateRef.current !== newState) {
          stateRef.current = newState;
          setTick((tick) => tick + 1);
        }
      };
      return subscribe(listener);
    }, []);

    return [stateRef.current, setState];
  }

  return {
    useStore,
    getState,
    setState,
    subscribe,
  };
}
