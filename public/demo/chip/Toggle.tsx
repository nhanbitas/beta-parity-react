'use client';

import React from 'react';
import { Chip } from 'beta-parity-react/ui/Chip';
import { Container } from 'lucide-react';

const colorMap = {
  neutral: 'neutral',
  accent: 'accent'
} as const;

const sizeMap = {
  sm: 'small',
  md: 'medium',
  lg: 'large'
};

export const Toggle = () => {
  return (
    <div className='flex flex-col gap-4'>
      <div className='not-prose flex flex-wrap gap-2'>
        {Object.keys(colorMap).map((color: any) => (
          <Chip
            key={color}
            value={color}
            color={color}
            label={color}
            onChange={(e) => console.log(e)}
            defaultChecked={true}
          />
        ))}
      </div>

      <div className='not-prose flex flex-wrap gap-2'>
        {Object.keys(colorMap).map((color: any) => (
          <Chip kind='glass' key={color} value={color} color={color} label={color} onChange={(e) => console.log(e)} />
        ))}
      </div>

      <div className='not-prose flex flex-wrap gap-2'>
        {Object.keys(colorMap).map((color: any) => (
          <Chip key={color} value={color} color={color} label={color} icon={<Container />} />
        ))}
      </div>

      <div className='not-prose flex flex-wrap gap-2'>
        {Object.keys(sizeMap).map((size: any) => (
          <Chip
            key={size}
            value={size}
            kind='glass'
            size={size}
            defaultChecked={true}
            label={sizeMap[size as keyof typeof sizeMap]}
            icon={<Container />}
          />
        ))}
      </div>
      <div className='not-prose flex flex-wrap gap-2'>
        <Chip disabled label='Disabled' checked />
        <Chip disabled label='Disabled' kind='glass' checked />
        <Chip disabled label='Disabled' />
        <Chip disabled label='Disabled' kind='glass' />
      </div>
    </div>
  );
};
