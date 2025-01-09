import { useEffect, useRef } from 'react';

/**
 * A custom hook that provides a debounced version of a callback function.
 * The callback is executed only after the specified delay has elapsed since the last invocation.
 *
 * @param {Function} callback - The function to debounce. This function will be called after the delay.
 * @param {number} delay - The debounce delay in milliseconds.
 *
 * @returns {Function} A debounced version of the provided callback function. Invoke it like the original function.
 *
 * @example
 * const debouncedSearch = useDebounce((query) => {
 *   fetchResults(query);
 * }, 500);
 *
 * <input
 *   type="text"
 *   onChange={(e) => debouncedSearch(e.target.value)}
 * />;
 */
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
