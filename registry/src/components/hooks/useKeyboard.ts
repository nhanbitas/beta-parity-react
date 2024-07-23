import React from 'react';

const useKeyboard = (key: string | string[], callback: (e: React.KeyboardEvent) => void) => {
  const excuteFunc = (e: React.KeyboardEvent) => {
    if (key === e.key || (Array.isArray(key) && key.includes(e.key))) {
      callback(e);
    }
  };

  return excuteFunc;
};

export default useKeyboard;
