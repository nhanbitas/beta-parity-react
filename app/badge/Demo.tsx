import { Badge } from '@libComponents/Badge';
import { Box, Dot } from 'lucide-react';
import React from 'react';

type Props = {};

const colors = ['gray', 'red', 'orange', 'yellow', 'green', 'blue', 'cyan', 'violet', 'lime'];

export const DemoOutlinedBadge = (props: Props) => {
  return (
    <div className='flex flex-col gap-4'>
      <div className='flex gap-4'>
        {colors.map((color) => (
          <Badge key={color} color={color as any}>
            <Box /> Badge
          </Badge>
        ))}
      </div>
      <div className='flex gap-4'>
        {colors.map((color) => (
          <Badge key={color} color={color as any} size='sm'>
            <Box /> Badge
          </Badge>
        ))}
      </div>
      <div className='flex gap-4'>
        {colors.map((color) => (
          <Badge key={color} color={color as any} size='xs'>
            <Box /> Badge
          </Badge>
        ))}
      </div>
    </div>
  );
};

export const DemoGlassBadge = (props: Props) => {
  return (
    <div className='flex flex-col gap-4'>
      <div className='flex gap-4'>
        {colors.map((color) => (
          <Badge key={color} color={color as any} variant='glass'>
            <Box /> Badge
          </Badge>
        ))}
      </div>
      <div className='flex gap-4'>
        {colors.map((color) => (
          <Badge key={color} color={color as any} size='sm' variant='glass'>
            <Box /> Badge
          </Badge>
        ))}
      </div>
      <div className='flex gap-4'>
        {colors.map((color) => (
          <Badge key={color} color={color as any} size='xs' variant='glass'>
            <Box /> Badge
          </Badge>
        ))}
      </div>
    </div>
  );
};

export const DemoFilledBadge = (props: Props) => {
  return (
    <div className='flex flex-col gap-4'>
      <div className='flex gap-4'>
        {colors.map((color) => (
          <Badge key={color} color={color as any} variant='filled'>
            <Box /> Badge
          </Badge>
        ))}
      </div>
      <div className='flex gap-4'>
        {colors.map((color) => (
          <Badge key={color} color={color as any} size='sm' variant='filled'>
            <Box /> Badge
          </Badge>
        ))}
      </div>
      <div className='flex gap-4'>
        {colors.map((color) => (
          <Badge key={color} color={color as any} size='xs' variant='filled'>
            <Box /> Badge
          </Badge>
        ))}
      </div>
    </div>
  );
};

export const DemoDotBadge = (props: Props) => {
  return (
    <div className='flex flex-col gap-4'>
      <div className='flex gap-4'>
        {colors.map((color) => (
          <Badge dot key={color} color={color as any} variant='outlined'>
            Badge
          </Badge>
        ))}
      </div>
      <div className='flex gap-4'>
        {colors.map((color) => (
          <Badge dot key={color} color={color as any} size='sm' variant='glass'>
            <Box /> Badge
          </Badge>
        ))}
      </div>
      <div className='flex gap-4'>
        {colors.map((color) => (
          <Badge dot key={color} color={color as any} size='xs' variant='filled'>
            Badge
          </Badge>
        ))}
      </div>
    </div>
  );
};

export const DemoDotBadgeDark = (props: Props) => {
  return (
    <div className='flex flex-col gap-4 rounded-md bg-gray-950 p-2' data-theme='dark'>
      <div className='flex gap-4'>
        {colors.map((color) => (
          <Badge dot key={color} color={color as any} variant='outlined'>
            Badge
          </Badge>
        ))}
      </div>
      <div className='flex gap-4'>
        {colors.map((color) => (
          <Badge dot key={color} color={color as any} size='sm' variant='glass'>
            <Box /> Badge
          </Badge>
        ))}
      </div>
      <div className='flex gap-4'>
        {colors.map((color) => (
          <Badge dot key={color} color={color as any} size='xs' variant='filled'>
            Badge
          </Badge>
        ))}
      </div>
    </div>
  );
};
