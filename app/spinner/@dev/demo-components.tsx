import { Spinner, SpinnerProps } from 'beta-parity-react/ui/Spinner';
import React from 'react';

type Props = {};

const variants = ['circular', 'dotted', 'sunburst'] as const;
const colors = ['neutral', 'accent'] as const;
const sizes = ['sm', 'md', 'lg', 'xl'] as const;

export const DemoVariantsSpinner = () => {
  return (
    <div className='flex gap-4'>
      {colors.map((color) =>
        variants.map((variant) => (
          <Spinner variant={variant as SpinnerProps['variant']} color={color as SpinnerProps['color']} key={variant} />
        ))
      )}
    </div>
  );
};

export const DemoSizeSpinner = (props: any) => {
  return (
    <div className='flex gap-4'>
      {colors.map((color) =>
        sizes.map((size) => (
          <Spinner
            size={size as SpinnerProps['size']}
            variant='circular'
            color={color as SpinnerProps['color']}
            key={size}
            {...props}
          />
        ))
      )}
    </div>
  );
};
