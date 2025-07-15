'use client';

import React from 'react';
import { Avatar } from 'beta-parity-react/ui/Avatar';

export const StatusDotsAvatar = () => {
  const statusColors = ['gray', 'orange', 'violet', 'green', 'red', 'yellow', 'blue', 'lime', 'cyan'];
  return (
    <>
      <div className='flex flex-wrap gap-4 p-2'>
        {statusColors.map((color) => (
          <Avatar
            key={color}
            initials='JD'
            status={{
              type: 'dot',
              color: color as any
            }}
          />
        ))}
      </div>
      <div className='flex flex-wrap gap-4 p-2'>
        {statusColors.map((color) => (
          <Avatar
            key={color}
            initials='JD'
            status={{
              type: 'dot',
              color: color as any,
              borderStyle: 'alternative'
            }}
          />
        ))}
      </div>
      <div className='flex flex-wrap gap-4 bg-cyan-100 p-2'>
        {statusColors.map((color) => (
          <Avatar
            key={color}
            initials='JD'
            status={{
              type: 'dot',
              color: color as any,
              borderStyle: 'inherit'
            }}
          />
        ))}
      </div>
    </>
  );
};
