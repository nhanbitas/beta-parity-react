'use client';

import React from 'react';
import { Avatar, AvatarTrigger } from 'beta-parity-react/ui/Avatar';

export const DisabledAvatar = () => {
  return (
    <div className='flex gap-4'>
      <Avatar initials='JD' disabled />
      <Avatar
        src='https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&h=300&fit=crop'
        alt='Portrait'
        disabled
      />
      <AvatarTrigger initials='AB' disabled />
    </div>
  );
};
