import { Spinner, SpinnerProps } from '@libComponents/Spinner';
import React from 'react';

type Props = {};

const variants = ['circle-01', 'circle-02', 'logo-01', 'logo-02', 'logo-03', 'logo-04'];

export const DemoVariantsSpinner = () => {
  return (
    <div className='flex gap-4'>
      {variants.map((variant) => (
        <Spinner variant={variant as SpinnerProps['variant']} key={variant} />
      ))}
    </div>
  );
};

export const DemoSizeSpinner = () => {
  return (
    <div className='flex gap-4'>
      <Spinner variant='logo-01' size='sm' />
      <Spinner variant='logo-01' />
      <Spinner variant='logo-01' size='lg' />
    </div>
  );
};
