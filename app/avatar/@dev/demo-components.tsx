'use client';

import React from 'react';
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
