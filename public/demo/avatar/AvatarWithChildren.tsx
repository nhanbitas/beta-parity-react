'use client';

import React from 'react';
import { Avatar } from 'beta-parity-react/ui/Avatar';

export const AvatarWithChildren = () => {
  return (
    <div className='flex gap-4'>
      <Avatar>
        <svg width='100%' height='100%' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
          <path
            d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 
            8 8-3.59 8-8 8zm-5-9c.83 0 1.5-.67 1.5-1.5S7.83 8 7 8s-1.5.67-1.5 1.5S6.17 11 7 11zm10 0c.83 0 1.5-.67 1.5-1.5S17.83 8 17 8s-1.5.67-1.5 1.5.67 
            1.5 1.5 1.5zM12 17.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z'
            fill='currentColor'
          />
        </svg>
      </Avatar>

      <Avatar status={{ type: 'dot', color: 'green' }}>
        <div
          style={{
            backgroundColor: '#6366f1',
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontWeight: 'bold'
          }}
        >
          RP
        </div>
      </Avatar>

      <Avatar size='large' borderStyle='alternative'>
        <svg width='100%' height='100%' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
          <path
            d='M12 2L1 21h22L12 2zm0 4.03L19.76 19H4.24L12 6.03zm-1 9.47v2h2v-2h-2zm0-6h2v4h-2v-4z'
            fill='currentColor'
          />
        </svg>
      </Avatar>
    </div>
  );
};
