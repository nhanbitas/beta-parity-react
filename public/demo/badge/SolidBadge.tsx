'use client';
import { Badge } from 'beta-parity-react/ui/Badge';
import { Box } from 'lucide-react';
import React from 'react';

const colors = ['gray', 'red', 'orange', 'yellow', 'green', 'blue', 'cyan', 'violet', 'lime'];

export const SolidBadge = (props: {}) => {
  return (
    <div className='flex flex-col gap-4'>
      <div className='flex flex-wrap gap-4'>
        {colors.map((color) => (
          <Badge key={color} color={color as any} variant='solid' icon={<Box />} label='Badge' />
        ))}
      </div>
      <div className='flex flex-wrap gap-4'>
        {colors.map((color) => (
          <Badge key={color} color={color as any} size='sm' variant='solid' icon={<Box />} label='Badge' />
        ))}
      </div>
      <div className='flex flex-wrap gap-4'>
        {colors.map((color) => (
          <Badge key={color} color={color as any} size='xs' variant='solid' icon={<Box />} label='Badge' />
        ))}
      </div>
    </div>
  );
};
