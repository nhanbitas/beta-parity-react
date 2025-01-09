import { useEffect, useMemo, useRef, useState } from 'react';

type ObserverRect = Omit<DOMRectReadOnly, 'toJSON'>;

const defaultState: ObserverRect = {
  x: 0,
  y: 0,
  width: 0,
  height: 0,
  top: 0,
  left: 0,
  bottom: 0,
  right: 0
};

/**
 * Custom hook to observe the resizing of an element using the ResizeObserver API.
 *
 * @param {ResizeObserverOptions} [options] - Optional ResizeObserver options (e.g., `box`).
 *
 * @returns {[React.RefObject<T>, ObserverRect]} A tuple containing:
 * - `ref`: A React ref object to attach to the element you want to observe.
 * - `rect`: An object representing the dimensions and position of the observed element.
 *
 * @typedef {Object} ObserverRect
 * @property {number} width - The width of the observed element.
 * @property {number} height - The height of the observed element.
 * @property {number} top - The top offset of the element relative to the viewport.
 * @property {number} left - The left offset of the element relative to the viewport.
 * @property {number} bottom - The bottom offset of the element relative to the viewport.
 * @property {number} right - The right offset of the element relative to the viewport.
 *
 * @example
 * const [ref, rect] = useResizeObserver();
 *
 * return (
 *   <div ref={ref}>
 *     Width: {rect.width}, Height: {rect.height}
 *   </div>
 * );
 */
export function useResizeObserver<T extends HTMLElement = any>(options?: ResizeObserverOptions) {
  const frameID = useRef(0);
  const ref = useRef<T>(null);

  const [rect, setRect] = useState<ObserverRect>(defaultState);

  const observer = useMemo(
    () =>
      typeof window !== 'undefined'
        ? new ResizeObserver((entries: any) => {
            const entry = entries[0];

            if (entry) {
              cancelAnimationFrame(frameID.current);

              frameID.current = requestAnimationFrame(() => {
                if (ref.current) {
                  setRect(entry.contentRect);
                }
              });
            }
          })
        : null,
    []
  );

  useEffect(() => {
    if (ref.current) {
      observer?.observe(ref.current, options);
    }

    return () => {
      observer?.disconnect();

      if (frameID.current) {
        cancelAnimationFrame(frameID.current);
      }
    };
  }, [ref.current]);

  return [ref, rect] as const;
}

/**
 * Custom hook to observe the size (width and height) of an element using ResizeObserver.
 *
 * @template T - The type of the target element to observe (extends `HTMLElement` by default).
 * @param {ResizeObserverOptions} [options] - Optional ResizeObserver options (e.g., `box`).
 *
 * @returns {{ ref: React.RefObject<T>, width: number, height: number }} An object containing:
 * - `ref`: A React ref object to attach to the element you want to observe.
 * - `width`: The current width of the observed element.
 * - `height`: The current height of the observed element.
 *
 * @example
 * const { ref, width, height } = useElementSize();
 *
 * return (
 *   <div ref={ref}>
 *     Element is {width}px wide and {height}px tall.
 *   </div>
 * );
 */
export function useElementSize<T extends HTMLElement = any>(options?: ResizeObserverOptions) {
  const [ref, { width, height }] = useResizeObserver<T>(options);
  return { ref, width, height };
}
