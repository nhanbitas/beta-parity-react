'use client';

import React from 'react';
import { Avatar } from 'beta-parity-react/ui/Avatar';

export const BorderStylesAvatar = () => {
  const borderStyles = ['none', 'default', 'alternative', 'inherit'];
  return (
    <div className='flex gap-4 bg-cyan-100 p-2'>
      {borderStyles.map((style) => (
        <Avatar key={style} status={{ borderStyle: style as any }} initials='JD' />
      ))}
    </div>
  );
};
