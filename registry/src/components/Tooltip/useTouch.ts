import { useEffect, useRef } from 'react';

export const useTouch = (
  context: any,
  options: {
    delay: number;
  }
) => {
  const { open, onOpenChange } = context; // get state from context of floating ui
  const touchTimeout = useRef<NodeJS.Timeout | null>(null); // Save timer
  const isTouching = useRef(false); // Track touch state

  const { delay } = options;

  const handleTouchStart = () => {
    isTouching.current = true;
    touchTimeout.current = setTimeout(() => {
      if (isTouching.current) {
        onOpenChange(true); // Open tooltip
      }
    }, delay);
  };

  const handleTouchEnd = () => {
    isTouching.current = false;
    if (touchTimeout.current) {
      clearTimeout(touchTimeout.current); // Clear timer
      onOpenChange(false); // Close Tooltip
    }
  };

  useEffect(() => {
    return () => {
      if (touchTimeout.current) {
        clearTimeout(touchTimeout.current); //Clear timer when unmount
      }
    };
  }, []);

  return {
    reference: {
      onTouchStart: handleTouchStart,
      onTouchEnd: handleTouchEnd
    }
  };
};
