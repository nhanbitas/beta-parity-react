'use client';

import React from 'react';
import { Avatar as ParityAvatar, AvatarGroup as ParityAvatarGroup } from 'beta-parity-react/ui/Avatar';

export const AvatarGroup = () => {
  return (
    <div className='flex flex-col gap-4'>
      <ParityAvatarGroup>
        <ParityAvatar
          src='https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&h=300&fit=crop'
          alt='Portrait'
        />
        <ParityAvatar
          src='https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=300&h=300&fit=crop'
          alt='Portrait'
        />
        <ParityAvatar
          src='https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop'
          alt='Portrait'
        />
        <ParityAvatar
          src='https://images.unsplash.com/photo-1554151228-14d9def656e4?w=300&h=300&fit=crop'
          alt='Portrait'
        />
        <ParityAvatar initials='JD' />
        <ParityAvatar initials='AB' />
        <ParityAvatar initials='XY' />
      </ParityAvatarGroup>

      <ParityAvatarGroup max={3}>
        <ParityAvatar
          src='https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&h=300&fit=crop'
          alt='Portrait'
        />
        <ParityAvatar
          src='https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=300&h=300&fit=crop'
          alt='Portrait'
        />
        <ParityAvatar
          src='https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop'
          alt='Portrait'
        />
        <ParityAvatar
          src='https://images.unsplash.com/photo-1554151228-14d9def656e4?w=300&h=300&fit=crop'
          alt='Portrait'
        />
        <ParityAvatar initials='JD' />
      </ParityAvatarGroup>

      <ParityAvatarGroup direction='column' spacing='-0.25rem'>
        <ParityAvatar
          src='https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&h=300&fit=crop'
          alt='Portrait'
        />
        <ParityAvatar
          src='https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=300&h=300&fit=crop'
          alt='Portrait'
        />
        <ParityAvatar
          src='https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop'
          alt='Portrait'
        />
      </ParityAvatarGroup>
    </div>
  );
};
