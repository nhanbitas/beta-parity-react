import { useEffect, useRef, useCallback } from 'react';

/**
 * Custom hook for managing keyboard navigation with arrow keys and tab within a container element.
 * This is particularly useful for accessible navigation of a list of focusable items like buttons.
 *
 * @param {React.RefObject<HTMLElement>} containerRef - A React ref object pointing to the container element
 *                                                      that contains the focusable items.
 *
 * @returns {Object} An object containing methods and properties to manage navigation:
 * - `setItemsRef`: A callback ref to assign individual items to be navigated.
 * - `resetItemsRef`: A function to reset the tracked list of items.
 * - `items`: The current list of items being tracked.
 * - `handleKeyDown`: A function to manually handle key down events for navigation.
 * - `focusItem`: The first focusable item in the list.
 * - `initFocus`: A function to initialize focus handling on the first key event.
 *
 * @example
 * const containerRef = useRef(null);
 * const { setItemsRef, resetItemsRef, initFocus } = useArrowKeyNavigation(containerRef);
 *
 * useEffect(() => {
 *   resetItemsRef();
 * }, []);
 *
 * return (
 *   <div ref={containerRef}>
 *     <button ref={(el) => setItemsRef(el)}>Item 1</button>
 *     <button ref={(el) => setItemsRef(el)}>Item 2</button>
 *     <button ref={(el) => setItemsRef(el)}>Item 3</button>
 *   </div>
 * );
 */
export const useArrowKeyNavigation = (containerRef: React.RefObject<HTMLElement>) => {
  const itemsRef = useRef<HTMLButtonElement[]>([]);
  const setItemsRef = useCallback((el: HTMLButtonElement | null) => {
    if (el && !itemsRef.current.includes(el)) {
      itemsRef.current.push(el);
    }
  }, []);

  const resetItemsRef = useCallback(() => {
    itemsRef.current = [];
  }, []);

  const handleKeyDown = useCallback((event: KeyboardEvent, isInitial = false) => {
    const { key } = event;
    const items = itemsRef.current;
    const activeIndex = items.findIndex((item) => document.activeElement === item) ?? -1;

    if (key === 'ArrowDown' || (!event.shiftKey && key === 'Tab')) {
      event.preventDefault();
      const nextIndex = isInitial ? 0 : (activeIndex + 1) % items.length;
      items[nextIndex]?.focus();
    } else if (key === 'ArrowUp' || (event.shiftKey && key === 'Tab')) {
      event.preventDefault();
      const prevIndex = isInitial ? items.length - 1 : (activeIndex - 1 + items.length) % items.length;
      items[prevIndex]?.focus();
    }
  }, []);

  const handleFirstFocus = useCallback((event: KeyboardEvent) => {
    handleKeyDown(event, true);
    document.removeEventListener('keydown', handleFirstFocus);
  }, []);

  useEffect(() => {
    const container = containerRef.current;

    if (container) {
      container.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      if (container) {
        container.removeEventListener('keydown', handleKeyDown);
      }
    };
  }, [handleKeyDown, containerRef, containerRef.current]);

  return {
    setItemsRef,
    resetItemsRef,
    items: itemsRef.current,
    handleKeyDown,
    focusItem: itemsRef.current[0],
    initFocus: () => {
      document.addEventListener('keydown', handleFirstFocus);
    }
  };
};
