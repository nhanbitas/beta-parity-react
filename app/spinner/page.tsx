import { Spinner, SpinnerProps } from '@libComponents/Spinner';
import React from 'react';

type Props = {};

const variants = ['circle-01', 'circle-02', 'logo-01', 'logo-02', 'logo-03', 'logo-04'];

const page = (props: Props) => {
  return (
    <>
      {variants.map((variant) => (
        <Spinner variant={variant as SpinnerProps['variant']} key={variant} />
      ))}

      <Spinner variant='logo-01' size='small' />
      <Spinner variant='logo-01' size='large' />
    </>
  );
};

export default page;
