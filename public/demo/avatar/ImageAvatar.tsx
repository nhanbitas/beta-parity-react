'use client';

import React from 'react';
import { Avatar } from 'beta-parity-react/ui/Avatar';

export const ImageAvatar = () => {
  return (
    <div className='flex gap-4'>
      <Avatar src='https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&h=300&fit=crop' alt='Portrait' />
      <Avatar src='https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=300&h=300&fit=crop' alt='Portrait' />
      <Avatar src='https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop' alt='Portrait' />
      <Avatar src='https://images.unsplash.com/photo-1554151228-14d9def656e4?w=300&h=300&fit=crop' alt='Portrait' />
    </div>
  );
};
