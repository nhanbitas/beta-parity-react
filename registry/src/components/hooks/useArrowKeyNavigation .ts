import { useEffect, useRef, useCallback } from 'react';

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
