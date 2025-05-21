'use client';

import React from 'react';
import Image from 'next/image'; // Add Next.js Image import
import { Avatar, AvatarGroup, AvatarTrigger } from 'beta-parity-react/ui/Avatar';

const avatarSizes = ['2extra-small', 'extra-small', 'small', 'medium', 'large', 'extra-large'];
const statusColors = ['gray', 'orange', 'violet', 'green', 'red', 'yellow', 'blue', 'lime', 'cyan'];
const borderStyles = ['default', 'alternative', 'none'];

export const DemoSizesAvatar = () => {
  return (
    <div className='flex items-center gap-4'>
      {avatarSizes.map((size) => (
        <Avatar key={size} size={size as any} initials='JD' />
      ))}
    </div>
  );
};

export const DemoInitialsAvatar = () => {
  return (
    <div className='flex gap-4'>
      <Avatar initials='JD' />
      <Avatar initials='AB' />
      <Avatar initials='XY' />
      <Avatar initials='WZ' />
    </div>
  );
};

export const DemoImageAvatar = () => {
  return (
    <div className='flex gap-4'>
      <Avatar src='https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&h=300&fit=crop' alt='Portrait' />
      <Avatar src='https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=300&h=300&fit=crop' alt='Portrait' />
      <Avatar src='https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop' alt='Portrait' />
      <Avatar src='https://images.unsplash.com/photo-1554151228-14d9def656e4?w=300&h=300&fit=crop' alt='Portrait' />
    </div>
  );
};

export const DemoBorderStylesAvatar = () => {
  return (
    <div className='flex gap-4'>
      {borderStyles.map((style) => (
        <Avatar key={style} borderStyle={style as any} initials='JD' />
      ))}
    </div>
  );
};

export const DemoStatusDotsAvatar = () => {
  return (
    <div className='flex flex-wrap gap-4'>
      {statusColors.map((color) => (
        <Avatar
          key={color}
          initials='JD'
          status={{
            type: 'dot',
            color: color as any
          }}
        />
      ))}
    </div>
  );
};

export const DemoStatusBorderAvatar = () => {
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

export const DemoStatusPulseAvatar = () => {
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

export const DemoAvatarGroup = () => {
  return (
    <div className='flex flex-col gap-4'>
      <AvatarGroup>
        <Avatar
          src='https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&h=300&fit=crop'
          alt='Portrait'
        />
        <Avatar
          src='https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=300&h=300&fit=crop'
          alt='Portrait'
        />
        <Avatar
          src='https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop'
          alt='Portrait'
        />
        <Avatar src='https://images.unsplash.com/photo-1554151228-14d9def656e4?w=300&h=300&fit=crop' alt='Portrait' />
        <Avatar initials='JD' />
        <Avatar initials='AB' />
        <Avatar initials='XY' />
      </AvatarGroup>

      <AvatarGroup max={3}>
        <Avatar
          src='https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&h=300&fit=crop'
          alt='Portrait'
        />
        <Avatar
          src='https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=300&h=300&fit=crop'
          alt='Portrait'
        />
        <Avatar
          src='https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop'
          alt='Portrait'
        />
        <Avatar src='https://images.unsplash.com/photo-1554151228-14d9def656e4?w=300&h=300&fit=crop' alt='Portrait' />
        <Avatar initials='JD' />
      </AvatarGroup>

      <AvatarGroup direction='column' spacing='-0.25rem'>
        <Avatar
          src='https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&h=300&fit=crop'
          alt='Portrait'
        />
        <Avatar
          src='https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=300&h=300&fit=crop'
          alt='Portrait'
        />
        <Avatar
          src='https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop'
          alt='Portrait'
        />
      </AvatarGroup>
    </div>
  );
};

export const DemoAvatarTrigger = () => {
  const [active, setActive] = React.useState(false);

  return (
    <div className='flex gap-4'>
      <AvatarTrigger initials='JD' active={active} onClick={() => setActive(!active)} />
      <AvatarTrigger
        src='https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&h=300&fit=crop'
        alt='Portrait'
        active={!active}
        onClick={() => setActive(!active)}
      />
    </div>
  );
};

export const DemoDisabledAvatar = () => {
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

export const DemoAvatarWithChildren = () => {
  return (
    <div className='flex gap-4'>
      <Avatar>
        <svg width='100%' height='100%' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
          <path
            d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-5-9c.83 0 1.5-.67 1.5-1.5S7.83 8 7 8s-1.5.67-1.5 1.5S6.17 11 7 11zm10 0c.83 0 1.5-.67 1.5-1.5S17.83 8 17 8s-1.5.67-1.5 1.5.67 1.5 1.5 1.5zM12 17.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z'
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

export const DemoAvatarWithNextImage = () => {
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

      <Avatar size='large' borderStyle='alternative'>
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
