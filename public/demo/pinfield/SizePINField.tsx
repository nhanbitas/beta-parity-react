'use client';

import React from 'react';
import { PINField } from 'beta-parity-react/ui/PINField';

export const SizePINField = (props: any) => {
  return (
    <>
      <div className='mb-4'>
        <p className='mb-2'>Small Size:</p>
        <PINField size='sm' {...props} />
      </div>
      <div>
        <p className='mb-2'>Medium Size:</p>
        <PINField size='md' {...props} />
      </div>
    </>
  );
};
