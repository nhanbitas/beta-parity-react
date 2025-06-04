'use client';

import React from 'react';
import { PINField } from 'beta-parity-react/ui/PINField';
import { RotateCw } from 'lucide-react';
import { Button } from 'beta-parity-react/ui/Button';

export const StatePINField = (props: any) => {
  const [reset, setReset] = React.useState(false);
  return (
    <>
      <div className='mb-4'>
        <p className='mb-2'>Default:</p>
        <PINField {...props} />
      </div>
      <div className='mb-4'>
        <p className='mb-2'>Invalid:</p>
        <PINField invalid={true} {...props} />
      </div>
      <div className='mb-4'>
        <p className='mb-2'>Disabled:</p>
        <PINField disabled={true} {...props} />
      </div>
      <div className='mb-4'>
        <p className='mb-2'>Read Only:</p>
        <PINField readOnly={true} value='12' {...props} />
      </div>
      <div className='mb-4'>
        <p className='mb-2'>Reset Button:</p>
        <div className='flex items-center gap-4'>
          <PINField reset={reset} {...props} />
          <Button
            kind='ghost'
            iconOnly
            onClick={() => {
              setReset(true);
              setTimeout(() => setReset(false), 100);
            }}
          >
            <RotateCw />
          </Button>
        </div>
      </div>
    </>
  );
};
