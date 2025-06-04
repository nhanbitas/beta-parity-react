'use client';

import React from 'react';
import { Avatar } from 'beta-parity-react/ui/Avatar';

export const BorderStylesAvatar = () => {
  const borderStyles = ['default', 'alternative', 'none'];
  return (
    <div className='flex gap-4'>
      {borderStyles.map((style) => (
        <Avatar key={style} borderStyle={style as any} initials='JD' />
      ))}
    </div>
  );
};
