'use client';
import React from 'react';
import { Button } from 'beta-parity-react/ui/Button';
import { CornerIndicator } from 'beta-parity-react/ui/CornerIndicator';
import { BellRing } from 'lucide-react';

export const CornerIndicatorDemo = (props: any) => {
  return (
    <div className='flex flex-wrap gap-4'>
      {['xs', 'sm', 'md'].map((size: any) => (
        <CornerIndicator key={size} label='5' color='red' size={size}>
          <Button iconOnly color='accent'>
            <BellRing />
          </Button>
        </CornerIndicator>
      ))}

      {['xs', 'sm', 'md'].map((size: any) => (
        <CornerIndicator key={size} label='5' color='red' size={size} outline>
          <Button iconOnly color='accent'>
            <BellRing />
          </Button>
        </CornerIndicator>
      ))}

      <CornerIndicator color='red'>
        <Button iconOnly color='accent'>
          <BellRing />
        </Button>
      </CornerIndicator>

      <CornerIndicator color='red' pulse>
        <Button iconOnly color='accent'>
          <BellRing />
        </Button>
      </CornerIndicator>
    </div>
  );
};

export { CornerIndicatorDemo as CornerIndicator };
