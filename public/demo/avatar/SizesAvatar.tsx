'use client';

import React from 'react';
import { Avatar } from 'beta-parity-react/ui/Avatar';

export const SizesAvatar = () => {
  return (
    <div className='flex items-center gap-4'>
      {['2extra-small', 'extra-small', 'small', 'medium', 'large', 'extra-large'].map((size) => (
        <Avatar key={size} size={size as any} initials='JD' />
      ))}
    </div>
  );
};
