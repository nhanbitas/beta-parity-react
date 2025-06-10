'use client';

import React from 'react';
import { Avatar } from 'beta-parity-react/ui/Avatar';

export const StatusBorderAvatar = () => {
  const statusColors = ['gray', 'green', 'red', 'yellow'];
  return (
    <div className='flex flex-wrap gap-4'>
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
  );
};
