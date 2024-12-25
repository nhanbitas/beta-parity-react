import { useEffect, useRef } from 'react';

const DEFAULT_EVENTS = ['mousedown', 'touchstart'];

/**
 * A custom React hook that detects clicks outside a specified element or set of elements.
 * It triggers a handler function when a click event occurs outside the target elements.
 *
 *
 * @param {() => void} handler - A callback function that is triggered when a click outside the target elements occurs.
 * @param {string[] | null} [events] - An optional array of event names to listen for. Defaults to `['mousedown', 'touchstart']`.
 * @param {(HTMLElement | null)[]} [nodes] - An optional array of HTML elements to monitor for outside clicks. If not provided, the ref returned by the hook will be used.
 *
 * @returns {React.RefObject<T>} A ref object that should be attached to the element you want to monitor for outside clicks.
 *
 * @example
 * // Usage with a single element
 * const ref = useOutsideClick(() => {
 *   console.log('Clicked outside');
 * });
 *
 * return <div ref={ref}>Click outside me</div>;
 *
 * @example
 * // Usage with multiple elements
 * const buttonRef = useRef(null);
 * const menuRef = useRef(null);
 *
 * useOutsideClick(() => {
 *   console.log('Clicked outside the menu and button');
 * }, ['mousedown'], [buttonRef.current, menuRef.current]);
 *
 * return (
 *   <>
 *     <button ref={buttonRef}>Toggle Menu</button>
 *     <div ref={menuRef}>Menu</div>
 *   </>
 * );
 */
export function useOutsideClick<T extends HTMLElement = any>(
  handler: () => void,
  events?: string[] | null,
  nodes?: (HTMLElement | null)[]
) {
  const ref = useRef<T>();

  useEffect(() => {
    const listener = (event: any) => {
      const { target } = event ?? {};
      if (Array.isArray(nodes)) {
        const shouldIgnore =
          target?.hasAttribute('data-ignore-outside-clicks') ||
          (!document.body.contains(target) && target.tagName !== 'HTML');
        const shouldTrigger = nodes.every((node) => !!node && !event.composedPath().includes(node));
        shouldTrigger && !shouldIgnore && handler();
      } else if (ref.current && !ref.current.contains(target)) {
        handler();
      }
    };

    (events || DEFAULT_EVENTS).forEach((fn) => document.addEventListener(fn, listener));

    return () => {
      (events || DEFAULT_EVENTS).forEach((fn) => document.removeEventListener(fn, listener));
    };
  }, [ref, handler, nodes]);

  return ref;
}
