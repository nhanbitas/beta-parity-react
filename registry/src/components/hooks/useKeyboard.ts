import React from 'react';

/**
 * Custom hook to handle keyboard events for a specific key or an array of keys.
 *
 * @param {string | string[]} key - The target key(s) to listen for. Can be a single key as a string or an array of keys.
 * @param {Function} callback - The function to execute when the specified key(s) is pressed.
 *                              The callback receives the keyboard event as an argument.
 *
 * @returns {Function} A function to handle keyboard events. It should be passed to an element's event listener.
 *
 * @example
 * const handleKeyPress = useKeyboard(['Enter', 'Escape'], (e) => {
 *   console.log(`Key pressed: ${e.key}`);
 * });
 *
 * return <div onKeyDown={handleKeyPress}>Press Enter or Escape</div>;
 */
const useKeyboard = (key: string | string[], callback: (e: React.KeyboardEvent) => void) => {
  const excuteFunc = (e: React.KeyboardEvent) => {
    if (key === e.key || (Array.isArray(key) && key.includes(e.key))) {
      callback(e);
    }
  };

  return excuteFunc;
};

export default useKeyboard;
