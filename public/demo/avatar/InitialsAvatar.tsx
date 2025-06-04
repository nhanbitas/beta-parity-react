'use client';

import React from 'react';
import { Avatar } from 'beta-parity-react/ui/Avatar';

export const InitialsAvatar = () => {
  return (
    <div className='flex gap-4'>
      <Avatar initials='JD' />
      <Avatar initials='AB' />
      <Avatar initials='XY' />
      <Avatar initials='WZ' />
    </div>
  );
};
