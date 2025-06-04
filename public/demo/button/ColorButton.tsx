'use client';
import React from 'react';
import { Button } from 'beta-parity-react/ui/Button';

export const ColorButton = () => {
  const kinds = ['solid', 'outlined', 'ghost', 'glass'];
  return (
    <div>
      <h3>Primary</h3>
      <div className='my-4 flex gap-4'>
        {kinds.map((kind) => (
          <Button key={kind} color='accent' kind={kind as any}>
            Button
          </Button>
        ))}
      </div>
      <h3>Neutral</h3>
      <div className='my-4 flex gap-4'>
        {kinds.map((kind) => (
          <Button key={kind} color='neutral' kind={kind as any}>
            Button
          </Button>
        ))}
      </div>
      <h3>Adverse</h3>
      <div className='my-4 flex gap-4'>
        {kinds.map((kind) => (
          <Button key={kind} color='adverse' kind={kind as any}>
            Button
          </Button>
        ))}
      </div>
    </div>
  );
};
