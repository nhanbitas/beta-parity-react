'use client';

import React from 'react';
import { Dot } from 'beta-parity-react/ui/Dot';

const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const;

type Props = {};

export const SizesDot = (props: Props) => {
  return (
    <div className='not-prose flex gap-2'>
      {sizes.map((size: (typeof sizes)[number]) => (
        <Dot key={size} size={size} />
      ))}
    </div>
  );
};
