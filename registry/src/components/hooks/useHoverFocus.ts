import { useState } from 'react';

export type UseHoverFocus = ReturnType<typeof useHoverFocus>;

export type EventHandlers = {
  onMouseEnter?: (event: React.MouseEvent) => void;
  onMouseLeave?: (event: React.MouseEvent) => void;
  onTouchStart?: (event: React.TouchEvent) => void;
  onTouchEnd?: (event: React.TouchEvent) => void;
  onFocus?: (event: React.MouseEvent) => void;
  onBlur?: (event: React.MouseEvent) => void;
};

/**
 * Helper function to combine default and custom event handlers.
 * @param {function} defaultHandler - The default handler provided by the hook.
 * @param {function} customHandler - The custom handler provided by the user.
 * @returns {function} Combined event handler.
 */
const combineHandlers = (
  defaultHandler: (event: React.MouseEvent) => void,
  customHandler?: (event: React.MouseEvent) => void
) => {
  return (event: React.MouseEvent) => {
    if (defaultHandler) defaultHandler(event);
    if (customHandler) customHandler(event);
  };
};

/**
 * Custom hook to handle hover and focus events for both desktop and mobile devices.
 * @returns {object} - Object containing hover, focus states, and combined event handlers.
 */
const useHoverFocus = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  // Hover Handlers (Mouse + Touch)
  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);
  const handleTouchStart = () => setIsHovered(true);
  const handleTouchEnd = () => setIsHovered(false);

  // Focus Handlers
  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  /**
   * Generate combined event handlers with support for user-defined handlers.
   * @param {object} customHandlers - User-defined handlers for additional customization.
   * @returns {object} Combined event handlers.
   */
  const getEventHandlers = (customHandlers: EventHandlers) => ({
    onMouseEnter: combineHandlers(handleMouseEnter, customHandlers?.onMouseEnter),
    onMouseLeave: combineHandlers(handleMouseLeave, customHandlers?.onMouseLeave),
    onTouchStart: combineHandlers(handleTouchStart, customHandlers?.onTouchStart as any),
    onTouchEnd: combineHandlers(handleTouchEnd, customHandlers?.onTouchEnd as any),
    onFocus: combineHandlers(handleFocus, customHandlers?.onFocus),
    onBlur: combineHandlers(handleBlur, customHandlers?.onBlur)
  });

  return { isHovered, isFocused, getEventHandlers };
};

export default useHoverFocus;
