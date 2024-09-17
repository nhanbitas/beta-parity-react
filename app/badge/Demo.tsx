import Badge from '@libComponents/Badge';
import { Box, Dot } from 'lucide-react';
import React from 'react';

type Props = {};

const colors = ['gray', 'red', 'orange', 'yellow', 'green', 'blue', 'cyan', 'violet', 'lime'];

export const DemoOutlinedBadge = (props: Props) => {
  return (
    <div className='flex flex-col gap-4'>
      <div className='flex flex-wrap gap-4'>
        {colors.map((color) => (
          <Badge key={color} color={color as any} icon={<Box />} label='Badge' />
        ))}
      </div>
      <div className='flex flex-wrap gap-4'>
        {colors.map((color) => (
          <Badge key={color} color={color as any} size='sm' icon={<Box />} label='Badge' />
        ))}
      </div>
      <div className='flex flex-wrap gap-4'>
        {colors.map((color) => (
          <Badge key={color} color={color as any} size='xs' icon={<Box />} label='Badge' />
        ))}
      </div>
    </div>
  );
};

export const DemoGlassBadge = (props: Props) => {
  return (
    <div className='flex flex-col gap-4'>
      <div className='flex flex-wrap gap-4'>
        {colors.map((color) => (
          <Badge key={color} color={color as any} variant='glass' icon={<Box />} label='Badge' />
        ))}
      </div>
      <div className='flex flex-wrap gap-4'>
        {colors.map((color) => (
          <Badge key={color} color={color as any} size='sm' variant='glass' icon={<Box />} label='Badge' />
        ))}
      </div>
      <div className='flex flex-wrap gap-4'>
        {colors.map((color) => (
          <Badge key={color} color={color as any} size='xs' variant='glass' icon={<Box />} label='Badge' />
        ))}
      </div>
    </div>
  );
};

export const DemoFilledBadge = (props: Props) => {
  return (
    <div className='flex flex-col gap-4'>
      <div className='flex flex-wrap gap-4'>
        {colors.map((color) => (
          <Badge key={color} color={color as any} variant='filled' icon={<Box />} label='Badge' />
        ))}
      </div>
      <div className='flex flex-wrap gap-4'>
        {colors.map((color) => (
          <Badge key={color} color={color as any} size='sm' variant='filled' icon={<Box />} label='Badge' />
        ))}
      </div>
      <div className='flex flex-wrap gap-4'>
        {colors.map((color) => (
          <Badge key={color} color={color as any} size='xs' variant='filled' icon={<Box />} label='Badge' />
        ))}
      </div>
    </div>
  );
};

export const DemoDotBadge = (props: Props) => {
  return (
    <div className='flex flex-col gap-4'>
      <div className='flex flex-wrap gap-4'>
        {colors.map((color) => (
          <Badge dot key={color} color={color as any} variant='outlined' icon={<Box />} label='Badge' />
        ))}
      </div>
      <div className='flex flex-wrap gap-4'>
        {colors.map((color) => (
          <Badge dot key={color} color={color as any} size='sm' variant='glass' icon={<Box />} label='Badge' />
        ))}
      </div>
      <div className='flex flex-wrap gap-4'>
        {colors.map((color) => (
          <Badge dot key={color} color={color as any} size='xs' variant='filled' icon={<Box />} label='Badge' />
        ))}
      </div>
    </div>
  );
};
