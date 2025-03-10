import React from 'react';
import { Dot } from 'beta-parity-react/ui/Dot';

const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const;

type Props = {};

export const DotDemo = (props: Props) => {
  return (
    <div className='not-prose flex gap-2'>
      {sizes.map((size: (typeof sizes)[number]) => (
        <Dot key={size} size={size} />
      ))}
    </div>
  );
};

export const ColorDotDemo = ({ pulse }: { pulse: boolean }) => {
  return (
    <div className='not-prose flex gap-2'>
      {sizes.map((size: (typeof sizes)[number]) => (
        <Dot key={size} size={size} pulse={pulse} />
      ))}
    </div>
  );
};
