'use client';

import React from 'react';
import { PINField } from 'beta-parity-react/ui/PINField';

export const CustomPINField = (props: any) => {
  return (
    <>
      <div className='mb-4'>
        <p className='mb-2'>Custom Separator:</p>
        <PINField groups={[2, 3, 2]} separator='-' {...props} />
      </div>
      <div className='mb-4'>
        <p className='mb-2'>Custom Placeholder:</p>
        <PINField placeholder='*' {...props} />
      </div>
    </>
  );
};
