import { Spinner, SpinnerProps } from 'beta-parity-react/ui/Spinner';
import React from 'react';

const colors = ['neutral', 'accent'] as const;
const sizes = ['sm', 'md', 'lg', 'xl'] as const;

export const SizeSpinnerDotted = () => {
  return (
    <div className='flex gap-4'>
      {colors.map((color) =>
        sizes.map((size) => (
          <Spinner
            size={size as SpinnerProps['size']}
            variant='dotted'
            color={color as SpinnerProps['color']}
            key={size}
          />
        ))
      )}
    </div>
  );
};
