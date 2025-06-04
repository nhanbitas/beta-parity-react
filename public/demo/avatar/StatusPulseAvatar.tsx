'use client';

import React from 'react';
import { Avatar } from 'beta-parity-react/ui/Avatar';

export const StatusPulseAvatar = () => {
  return (
    <div className='flex gap-4'>
      <Avatar
        initials='JD'
        status={{
          type: 'dot',
          color: 'green',
          pulse: true
        }}
      />
      <Avatar
        initials='JD'
        status={{
          type: 'border',
          color: 'red',
          pulse: true
        }}
      />
    </div>
  );
};
