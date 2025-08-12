import { useEffect, useRef, RefObject, useCallback } from 'react';

const DEFAULT_EVENTS = ['mousedown', 'touchstart'];

/**
 * A custom hook that detects clicks outside of one or more elements.
 * Optimized for cross-device compatibility and performance.
 */
export function useOutsideClick<T extends HTMLElement = any>(
  handler: () => void,
  events: string[] = DEFAULT_EVENTS,
  refs?: RefObject<HTMLElement | null>[]
) {
  const innerRef = useRef<T>(null);
  const handlerRef = useRef(handler);
  const touchHandled = useRef(false);

  // Keep handler ref up to date
  useEffect(() => {
    handlerRef.current = handler;
  }, [handler]);

  // Memoize the listener to prevent unnecessary re-renders
  const listener = useCallback(
    (event: Event) => {
      // Prevent double firing on devices that support both touch and mouse
      if (event.type === 'touchstart') {
        touchHandled.current = true;
      } else if (event.type === 'mousedown' && touchHandled.current) {
        touchHandled.current = false;
        return;
      }

      const target = event.target;

      // Enhanced safety checks
      if (!target || !(target instanceof Node)) return;

      // Ignore if element has this attribute
      if ((target as HTMLElement)?.hasAttribute?.('data-ignore-outside-clicks')) {
        return;
      }

      // Get all refs to check
      const allRefs = refs ?? [innerRef];

      // Check if click is outside all referenced elements
      const isOutside = allRefs.every((ref) => {
        const el = ref?.current;
        if (!el) return true; // If ref is null, consider it "outside"

        // Additional check for shadow DOM compatibility
        try {
          return !el.contains(target);
        } catch (error) {
          // Fallback for edge cases with shadow DOM or cross-frame scenarios
          console.warn('useOutsideClick: Error checking element containment', error);
          return true;
        }
      });

      if (isOutside) {
        handlerRef.current();
      }
    },
    [refs]
  );

  useEffect(() => {
    // Add passive listeners for better performance on touch devices
    const options: AddEventListenerOptions = {
      passive: true,
      capture: true // Use capture phase for more reliable detection
    };

    events.forEach((event) => {
      document.addEventListener(event, listener, options);
    });

    return () => {
      events.forEach((event) => {
        document.removeEventListener(event, listener, options);
      });
      // Reset touch flag on cleanup
      touchHandled.current = false;
    };
  }, [listener, events]);

  return innerRef;
}
