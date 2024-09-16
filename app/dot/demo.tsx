import React from 'react';
import Dot from '@libComponents/Dot';

const colors = ['gray', 'orange', 'cyan', 'violet', 'green', 'red', 'yellow', 'blue', 'lime'] as const;
const sizes = ['xs', 'sm', 'md', 'lg'] as const;
const kinds = ['glass', 'filled'] as const;

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

export const ColorDotDemo = ({
  kind,
  size,
  pulse
}: {
  kind: (typeof kinds)[number];
  size: (typeof sizes)[number];
  pulse: boolean;
}) => {
  return (
    <div className='not-prose flex gap-2'>
      {colors.map((color: (typeof colors)[number]) => (
        <Dot key={color} color={color} size={size} kind={kind} pulse={pulse} />
      ))}
    </div>
  );
};
