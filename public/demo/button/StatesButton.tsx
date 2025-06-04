'use client';
import React from 'react';
import { Button } from 'beta-parity-react/ui/Button';
import { Plus } from 'lucide-react';

export const StatesButton = () => {
  const sizes = ['sm', 'md', 'lg'];
  const kinds = ['solid', 'outlined', 'ghost', 'glass'];
  return (
    <div className='gap-4 rounded-md p-2'>
      <h3>Icons</h3>
      {sizes.map((size) => (
        <div className='mb-4 flex gap-4' key={size}>
          <Button iconOnly color='neutral' kind='glass' size={size as any}>
            <Plus />
          </Button>
          <Button color='adverse' kind='glass' size={size as any}>
            <Plus />
            Button
          </Button>
        </div>
      ))}
      <h3>States</h3>
      <div className='flex gap-4'>
        {kinds.map((kind) => (
          <Button key={kind} color='accent' kind={kind as any} disabled>
            Disable
          </Button>
        ))}
        {kinds.map((kind) => (
          <Button key={kind} color='accent' kind={kind as any} isPending>
            Pending
          </Button>
        ))}
      </div>
    </div>
  );
};
