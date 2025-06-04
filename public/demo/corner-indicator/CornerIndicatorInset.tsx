'use client';
import React from 'react';
import { CornerIndicator } from 'beta-parity-react/ui/CornerIndicator';
import Image from 'next/image';

export const CornerIndicatorInset = (props: any) => {
  return (
    <div className='flex  flex-wrap gap-4'>
      {['bottom-left', 'bottom-right'].map((position: any) => (
        <CornerIndicator key={position} size='lg' color='green' position={position} outline offset={-6}>
          <span className='grid h-10 w-10 place-items-center overflow-hidden rounded-full'>
            <Image
              alt='chip-avatar'
              width={40}
              height={40}
              src='https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
            />
          </span>
        </CornerIndicator>
      ))}
    </div>
  );
};
