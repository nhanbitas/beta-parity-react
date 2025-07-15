'use client';

import React from 'react';
import Image from 'next/image';
import { Avatar } from 'beta-parity-react/ui/Avatar';

export const AvatarWithNextImage = () => {
  return (
    <div className='flex gap-4'>
      <Avatar>
        <Image
          src='https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop'
          alt='Portrait'
          width={100}
          height={100}
          style={{ objectFit: 'cover', width: '100%', height: '100%' }}
        />
      </Avatar>

      <Avatar status={{ type: 'dot', color: 'green' }}>
        <Image
          src='https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=300&fit=crop'
          alt='Portrait'
          width={100}
          height={100}
          style={{ objectFit: 'cover', width: '100%', height: '100%' }}
        />
      </Avatar>

      <Avatar status={{ borderStyle: 'alternative' }}>
        <Image
          src='https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop'
          alt='Portrait'
          width={100}
          height={100}
          style={{ objectFit: 'cover', width: '100%', height: '100%' }}
          priority
        />
      </Avatar>
    </div>
  );
};
