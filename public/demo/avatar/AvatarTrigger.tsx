'use client';

import React from 'react';
import { AvatarTrigger as ParityAvatarTrigger } from 'beta-parity-react/ui/Avatar';

export const AvatarTrigger = () => {
  const [active, setActive] = React.useState(false);

  return (
    <div className='flex gap-4'>
      <ParityAvatarTrigger initials='JD' active={active} onClick={() => setActive(!active)} />
      <ParityAvatarTrigger
        src='https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&h=300&fit=crop'
        alt='Portrait'
        active={!active}
        onClick={() => setActive(!active)}
      />
    </div>
  );
};
