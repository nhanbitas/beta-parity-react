'use client';

import React from 'react';
import { Chip } from '@libComponents/Chip';
import { CarFrontIcon } from 'lucide-react';
import Image from 'next/image';

type Props = {};

export const DemoChip = (props: Props) => {
  return (
    <>
      <Chip label='chip' color='orange' />
      <Chip label='chip' color='green' variant='filled' />
      <Chip label='chip' color='red' isActive={true} />
      <Chip label='chip' color='blue' onDeactive={(value) => console.log(value)} />
      <Chip label='chip' isToggle={false} color='blue' value='value' onActive={(value) => console.log(value)} />
      <Chip
        icon={<CarFrontIcon />}
        label='chip'
        isToggle={false}
        color='blue'
        value='value'
        onActive={(value) => console.log(value)}
        onDeactive={(value) => console.log(value)}
      />
      <Chip
        icon={
          <Image
            alt='chip-avatar'
            className='rounded-full'
            width={24}
            height={24}
            src='https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
          />
        }
        label='chip'
        isToggle={false}
        color='blue'
        value='value'
        onActive={(value) => console.log(value)}
        onDeactive={(value) => console.log(value)}
      />
    </>
  );
};
