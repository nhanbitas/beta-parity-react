import { Spinner, SpinnerProps } from 'beta-parity-react/ui/Spinner';
import React from 'react';

const variants = ['circular', 'dotted', 'sunburst'] as const;
const colors = ['neutral', 'accent'] as const;

export const VariantsSpinner = () => {
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
