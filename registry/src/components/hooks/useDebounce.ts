import { useEffect, useRef } from 'react';

export default function useDebounce(callback: (...args: any) => void, delay: number) {
  const timeoutId = useRef<any>(null);

  useEffect(() => {
    return () => clearTimeout(timeoutId.current);
  }, []);

  const debouncedCallback = (...args: any) => {
    clearTimeout(timeoutId.current);
    timeoutId.current = setTimeout(() => {
      callback(...args);
    }, delay);
  };

  return debouncedCallback;
}
