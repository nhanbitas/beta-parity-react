import { useEffect, useRef, RefObject } from 'react';

const DEFAULT_EVENTS = ['mousedown', 'touchstart'];

/**
 * A custom hook that detects clicks outside of one or more elements.
 *
 * @param handler - Function to call when click is detected outside
 * @param events - List of events to listen to (default: ['mousedown', 'touchstart'])
 * @param refs - Refs to elements to monitor for outside clicks
 *
 * @returns A ref you can assign to a DOM node if you're not passing refs manually
 */
export function useOutsideClick<T extends HTMLElement = any>(
  handler: () => void,
  events: string[] = DEFAULT_EVENTS,
  refs?: RefObject<HTMLElement | null>[]
) {
  const innerRef = useRef<T>(null);

  useEffect(() => {
    const listener = (event: Event) => {
      const target = event.target as Node;

      // Ignore if element has this attribute
      if ((target as HTMLElement)?.hasAttribute?.('data-ignore-outside-clicks')) return;

      const allRefs = refs ?? [innerRef];

      const isOutside = allRefs.every((ref) => {
        const el = ref?.current;
        return el && !el.contains(target);
      });

      if (isOutside) {
        handler();
      }
    };

    events.forEach((event) => document.addEventListener(event, listener));
    return () => {
      events.forEach((event) => document.removeEventListener(event, listener));
    };
  }, [handler, events, refs]);

  return innerRef;
}
