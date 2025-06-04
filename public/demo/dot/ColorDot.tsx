import React from 'react';
import { Dot } from 'beta-parity-react/ui/Dot';

const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const;

export const ColorDot = ({ pulse }: { pulse: boolean }) => {
  return (
    <div className='not-prose flex gap-2'>
      {sizes.map((size: (typeof sizes)[number]) => (
        <Dot key={size} size={size} pulse={pulse} />
      ))}
    </div>
  );
};
