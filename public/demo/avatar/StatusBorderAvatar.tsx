'use client';

import React from 'react';
import { Avatar } from 'beta-parity-react/ui/Avatar';

export const StatusBorderAvatar = () => {
  const statusColors = ['gray', 'green', 'red', 'yellow'];
  return (
    <>
      <div className='mt-2 flex flex-wrap gap-4 p-2'>
        {statusColors.map((color) => (
          <Avatar
            key={color}
            initials='JD'
            status={{
              type: 'border',
              color: color as any
            }}
          />
        ))}
      </div>

      <div className='mt-2 flex flex-wrap gap-4 bg-cyan-100 p-2'>
        {statusColors.map((color) => (
          <Avatar
            key={color}
            initials='JD'
            status={{
              type: 'border',
              color: color as any
            }}
          />
        ))}
      </div>
    </>
  );
};
