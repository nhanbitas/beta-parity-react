import { Button } from '@libComponents/Button';
import { CornerIndicator } from '@libComponents/CornerIndicator';
import { BellRing, Globe, PhoneMissed, User } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

type Props = {};

export const DemoCornerIndicator = (props: Props) => {
  return (
    <div className='flex flex-wrap gap-4'>
      {['xs', 'sm', 'md'].map((size) => (
        <CornerIndicator key={size} label='5' color='red' size={size as any}>
          <Button iconOnly color='info'>
            <BellRing />
          </Button>
        </CornerIndicator>
      ))}

      {['xs', 'sm', 'md'].map((size) => (
        <CornerIndicator key={size} label='5' color='red' size={size as any} outline>
          <Button iconOnly color='info'>
            <BellRing />
          </Button>
        </CornerIndicator>
      ))}

      <CornerIndicator color='red'>
        <Button iconOnly color='info'>
          <BellRing />
        </Button>
      </CornerIndicator>

      <CornerIndicator color='red' pulse>
        <Button iconOnly color='info'>
          <BellRing />
        </Button>
      </CornerIndicator>
    </div>
  );
};

export const DemoCornerIndicatorPosition = (props: Props) => {
  return (
    <>
      <div className='flex  flex-wrap gap-8'>
        {['top-left', 'top-right', 'bottom-left', 'bottom-right'].map((position) => (
          <CornerIndicator key={position} pulse color='red' position={position as any} label='5' outline>
            <Button iconOnly color='info' kind='glass'>
              <BellRing />
            </Button>
          </CornerIndicator>
        ))}
      </div>

      <div className='flex flex-col flex-wrap gap-8 '>
        {['top-left', 'top-right', 'bottom-left', 'bottom-right'].map((position) => (
          <CornerIndicator
            key={position}
            growDirection='inward'
            size='sm'
            color='red'
            position={position as any}
            label='23'
          >
            <Button iconOnly color='danger' kind='glass'>
              <PhoneMissed />
            </Button>
          </CornerIndicator>
        ))}
      </div>

      <div className='flex flex-col flex-wrap gap-8 '>
        {['top-left', 'top-right', 'bottom-left', 'bottom-right'].map((position) => (
          <CornerIndicator
            key={position}
            growDirection='outward'
            size='sm'
            color='green'
            position={position as any}
            label='connected'
          >
            <Button iconOnly color='success' kind='glass'>
              <Globe />
            </Button>
          </CornerIndicator>
        ))}
      </div>
    </>
  );
};

export const DemoCornerIndicatorInset = (props: Props) => {
  return (
    <div className='flex  flex-wrap gap-4'>
      {['bottom-left', 'bottom-right'].map((position) => (
        <CornerIndicator key={position} size='lg' color='green' position={position as any} outline offset={-6}>
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
