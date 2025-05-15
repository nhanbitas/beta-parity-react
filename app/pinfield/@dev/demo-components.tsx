'use client';

import React from 'react';
import { PINField } from 'beta-parity-react/ui/PINField';
import { RotateCw } from 'lucide-react';
import { Button } from 'beta-parity-react/ui/Button';

export const DemoBasicPINField = (props: any) => {
  const [value, setValue] = React.useState('');

  return (
    <PINField
      {...props}
      value={value}
      onChange={(val) => setValue(val)}
      onComplete={(val) => console.log(`PIN complete: ${val}`)}
    />
  );
};

export const DemoGroupsPINField = (props: any) => {
  const [value, setValue] = React.useState('');

  return (
    <PINField
      groups={[2, 2, 2]}
      value={value}
      onChange={(val) => setValue(val)}
      onComplete={(val) => console.log(`PIN complete: ${val}`)}
      {...props}
    />
  );
};

export const DemoMaskedPINField = (props: any) => {
  const [value, setValue] = React.useState('');

  return (
    <PINField
      masked={true}
      groups={[6]}
      value={value}
      onChange={(val) => setValue(val)}
      placeholder=' '
      onComplete={(val) => console.log(`PIN complete: ${val}`)}
      {...props}
    />
  );
};

export const DemoSizePINField = (props: any) => {
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

export const DemoStatePINField = (props: any) => {
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

export const DemoCustomPINField = (props: any) => {
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
