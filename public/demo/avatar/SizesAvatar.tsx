'use client';

import React from 'react';
import { Avatar } from 'beta-parity-react/ui/Avatar';

const sizes = ['xxs', 'xs', 'sm', 'md', 'lg', 'xl'] as const;

export const SizesAvatar = () => {
  return (
    <>
      <div className='mt-2 flex items-center gap-4'>
        {sizes.map((size) => (
          <Avatar key={size} size={size as any} status={{ type: 'dot', color: 'green' }} />
        ))}
      </div>

      <div className='mt-2 flex items-center gap-4'>
        {sizes.map((size) => (
          <Avatar key={size} size={size as any} status={{ type: 'border', color: 'green' }} />
        ))}
      </div>
    </>
  );
};
