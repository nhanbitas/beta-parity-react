'use client';

import React from 'react';
import { Avatar } from 'beta-parity-react/ui/Avatar';

const sizes = ['xs', 'sm', 'md', 'lg'] as const;

export const SizesAvatar = () => {
  return (
    <div className='flex items-center gap-4'>
      {sizes.map((size) => (
        <Avatar key={size} size={size as any} initials='JD' />
      ))}
    </div>
  );
};
