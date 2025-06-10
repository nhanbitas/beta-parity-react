'use client';

import React from 'react';
import { Avatar } from 'beta-parity-react/ui/Avatar';
import { Smile, UserRoundMinus } from 'lucide-react';

export const AvatarWithChildren = () => {
  return (
    <div className='flex gap-4'>
      <Avatar>
        <Smile
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
        />
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

      <Avatar size='md' borderStyle='alternative'>
        <div
          style={{
            backgroundColor: 'var(--par-yellow-500)',
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontWeight: 'bold'
          }}
        >
          <UserRoundMinus />
        </div>
      </Avatar>
    </div>
  );
};
