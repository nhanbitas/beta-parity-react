'use client';
import React from 'react';
import { Button } from 'beta-parity-react/ui/Button';

export const KindButton = () => {
  const colors = ['neutral', 'accent', 'adverse'];
  return (
    <div className='gap-4 rounded-md p-2'>
      <h3>Solid</h3>
      <div className='my-4 flex gap-4'>
        {colors.map((color) => (
          <Button type='submit' key={color} color={color as any}>
            Button
          </Button>
        ))}
      </div>
      <h3>Outline</h3>
      <div className='my-4 flex gap-4'>
        {colors.map((color) => (
          <Button key={color} color={color as any} kind='outlined'>
            Button
          </Button>
        ))}
      </div>
      <h3>Ghost</h3>
      <div className='my-4 flex gap-4'>
        {colors.map((color) => (
          <Button key={color} color={color as any} kind='ghost'>
            Button
          </Button>
        ))}
      </div>
      <h3>Glass</h3>
      <div className='my-4 flex gap-4'>
        {colors.map((color) => (
          <Button key={color} color={color as any} kind='glass'>
            Button
          </Button>
        ))}
      </div>
    </div>
  );
};
