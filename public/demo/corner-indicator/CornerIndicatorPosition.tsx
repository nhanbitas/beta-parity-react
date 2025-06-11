'use client';
import React from 'react';
import { Button } from 'beta-parity-react/ui/Button';
import { CornerIndicator } from 'beta-parity-react/ui/CornerIndicator';
import { BellRing, PhoneMissed, Globe } from 'lucide-react';

export const CornerIndicatorPosition = (props: any) => {
  return (
    <div className='flex flex-col gap-8'>
      <div className='flex flex-wrap gap-8'>
        {['top-left', 'top-right', 'bottom-left', 'bottom-right'].map((position: any) => (
          <CornerIndicator key={position} pulse color='red' position={position} label='5' outline>
            <Button iconOnly color='accent' kind='glass'>
              <BellRing />
            </Button>
          </CornerIndicator>
        ))}
      </div>

      <div className='flex flex-wrap gap-8 '>
        {['top-left', 'top-right', 'bottom-left', 'bottom-right'].map((position: any) => (
          <CornerIndicator key={position} growDirection='inward' size='sm' color='red' position={position} label='23'>
            <Button iconOnly color='adverse' kind='glass'>
              <PhoneMissed />
            </Button>
          </CornerIndicator>
        ))}
      </div>

      <div className='flex flex-wrap gap-28'>
        {['top-right', 'bottom-right', 'top-left', 'bottom-left'].map((position: any) => (
          <CornerIndicator
            key={position}
            growDirection='outward'
            size='sm'
            color='green'
            position={position}
            label='connected'
          >
            <Button iconOnly color='neutral' kind='glass'>
              <Globe />
            </Button>
          </CornerIndicator>
        ))}
      </div>
    </div>
  );
};
