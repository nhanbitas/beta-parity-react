'use client';

import React from 'react';
import { Avatar } from 'beta-parity-react/ui/Avatar';

export const StatusDotsAvatar = () => {
  const statusColors = ['gray', 'orange', 'violet', 'green', 'red', 'yellow', 'blue', 'lime', 'cyan'];
  return (
    <div className='flex flex-wrap gap-4'>
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
  );
};
