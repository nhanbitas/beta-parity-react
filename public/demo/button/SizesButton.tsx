'use client';
import React from 'react';
import { Button } from 'beta-parity-react/ui/Button';

export const SizesButton = () => {
  const sizes = ['sm', 'md', 'lg'];
  return (
    <div className='flex gap-4'>
      {sizes.map((size) => (
        <Button key={size} size={size as any} kind='glass'>
          Button
        </Button>
      ))}
    </div>
  );
};
