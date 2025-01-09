import { useEffect, useRef } from 'react';

/**
 * A custom React hook that runs an effect function only after the component has mounted,
 * skipping the initial render. Useful when you want to skip running an effect during the
 * initial mount and only run it on subsequent updates when the dependencies change.
 *
 * @param {Function} effect - The effect callback function to run after the component has mounted.
 *                            This function can optionally return a cleanup function.
 * @param {Array<any>} deps - An array of dependencies that will trigger the effect when they change.
 *
 * @example
 * useDidMountEffect(() => {
 *   console.log('This will only run after the component has mounted and deps changed');
 * }, [someDependency]);
 *
 * @returns {void} - This hook does not return any value.
 */
export default function useDidMountEffect(effect: () => any, deps: Array<any>) {
  const didMount = useRef(false);

  useEffect(() => {
    if (didMount.current) {
      return effect();
    } else {
      didMount.current = true;
    }
  }, deps);
}
