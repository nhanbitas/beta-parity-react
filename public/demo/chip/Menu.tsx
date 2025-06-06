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

export const Menu = () => {
  return (
    <div className='flex flex-col gap-4'>
      {/* unvalued */}
      <div className='not-prose flex flex-wrap gap-2'>
        <Chip type='dropdown' label='Options' onChange={(e) => console.log(e)} />
      </div>
      {/* valued */}
      <div className='not-prose flex flex-wrap gap-2'>
        {/* no icon */}
        {Object.keys(colorMap).map((color: any) => (
          <Chip
            type='dropdown'
            key={color}
            value={color}
            color={color}
            label={color}
            onChange={(e) => console.log(e)}
          />
        ))}
      </div>
      <div className='not-prose flex flex-wrap gap-2'>
        {/*  icon */}
        {Object.keys(colorMap).map((color: any) => (
          <Chip type='dropdown' key={color} value={color} color={color} label={color} icon={<Container />} />
        ))}
      </div>
      {/* sizes */}
      <div className='not-prose flex flex-wrap gap-2'>
        {Object.keys(sizeMap).map((size: any) => (
          <Chip
            key={size}
            value={size}
            type='dropdown'
            kind='glass'
            size={size}
            label={sizeMap[size as keyof typeof sizeMap]}
          />
        ))}
      </div>
      <div className='not-prose flex flex-wrap gap-2'>
        <Chip disabled label='Disabled' type='dropdown' />
        <Chip disabled kind='glass' label='Disabled' type='dropdown' />
        <Chip disabled label='Disabled' value={1} type='dropdown' color='accent' />
        <Chip disabled kind='glass' value={2} label='Disabled' type='dropdown' color='accent' />
      </div>
    </div>
  );
};
