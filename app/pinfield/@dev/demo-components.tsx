'use client';

import React from 'react';
import { PINField } from 'beta-parity-react/ui/PINField';

export const DemoBasicPINField = (props: any) => {
  const [value, setValue] = React.useState('');

  return (
    <PINField {...props} onChange={(val) => setValue(val)} onComplete={(val) => console.log(`PIN complete: ${val}`)} />
  );
};

export const DemoGroupsPINField = () => {
  const [value, setValue] = React.useState('');

  return (
    <PINField
      groups={[2, 2, 2]}
      onChange={(val) => setValue(val)}
      onComplete={(val) => console.log(`PIN complete: ${val}`)}
    />
  );
};

export const DemoMaskedPINField = () => {
  const [value, setValue] = React.useState('');

  return (
    <PINField
      masked={true}
      onChange={(val) => setValue(val)}
      onComplete={(val) => console.log(`PIN complete: ${val}`)}
    />
  );
};

export const DemoSizePINField = () => {
  return (
    <>
      <div className='mb-4'>
        <p className='mb-2'>Small Size:</p>
        <PINField size='small' />
      </div>
      <div>
        <p className='mb-2'>Medium Size:</p>
        <PINField size='medium' />
      </div>
    </>
  );
};

export const DemoStatePINField = () => {
  const [reset, setReset] = React.useState(false);

  return (
    <>
      <div className='mb-4'>
        <p className='mb-2'>Default:</p>
        <PINField />
      </div>
      <div className='mb-4'>
        <p className='mb-2'>Invalid:</p>
        <PINField invalid={true} />
      </div>
      <div className='mb-4'>
        <p className='mb-2'>Disabled:</p>
        <PINField disabled={true} />
      </div>
      <div className='mb-4'>
        <p className='mb-2'>Read Only:</p>
        <PINField readOnly={true} />
      </div>
      <div className='mb-4'>
        <p className='mb-2'>Reset Button:</p>
        <div className='flex items-center gap-4'>
          <PINField reset={reset} />
          <button
            className='rounded bg-blue-500 px-4 py-2 text-white'
            onClick={() => {
              setReset(true);
              setTimeout(() => setReset(false), 100);
            }}
          >
            Reset
          </button>
        </div>
      </div>
    </>
  );
};

export const DemoCustomPINField = () => {
  return (
    <>
      <div className='mb-4'>
        <p className='mb-2'>Custom Separator:</p>
        <PINField groups={[2, 3, 2]} separator='•' />
      </div>
      <div className='mb-4'>
        <p className='mb-2'>Custom Placeholder:</p>
        <PINField placeholder='○' />
      </div>
    </>
  );
};
