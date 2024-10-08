'use client';

import React from 'react';
import { Button } from '@libComponents/Button';
import { Plus } from 'lucide-react';

const colors = ['neutral', 'accent', 'adverse'];
const kinds = ['solid', 'outlined', 'ghost', 'glass'];
const sizes = ['sm', 'md', 'lg'];

export const DemoKindButton = () => {
  return (
    <div className='gap-4 rounded-md p-2'>
      <h3>Solid</h3>
      <div className='my-4 flex gap-4'>
        {colors.map((color) => (
          <Button key={color} color={color as any}>
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

export const DemoColorButton = () => {
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

export const DemoSizesButton = () => {
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

export const DemoStatesButton = () => {
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
