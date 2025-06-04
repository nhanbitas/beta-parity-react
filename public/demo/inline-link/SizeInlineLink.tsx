'use client';
import React from 'react';
import { InlineLink } from 'beta-parity-react/ui/InlineLink';
import { ArrowUpRight } from 'lucide-react';

const colors = ['standard', 'neutral'];

export const SizeInlineLink = () => {
  return (
    <div className=' gap-4 rounded-md p-2'>
      <h3>Small</h3>
      <div className='not-prose my-4 flex gap-4'>
        {colors.map((color) => (
          <InlineLink key={color} color={color as any} size='sm'>
            InlineLink <ArrowUpRight />
          </InlineLink>
        ))}
      </div>
      <h3>Medium</h3>
      <div className='not-prose my-4 flex gap-4'>
        {colors.map((color) => (
          <InlineLink key={color} color={color as any} size='md'>
            InlineLink <ArrowUpRight />
          </InlineLink>
        ))}
        {colors.map((color) => (
          <InlineLink key={color} color={color as any} size='md' disabled>
            InlineLink <ArrowUpRight />
          </InlineLink>
        ))}
      </div>
      <h3>Large</h3>
      <div className='not-prose my-4 flex gap-4'>
        {colors.map((color) => (
          <InlineLink key={color} color={color as any} size='lg'>
            InlineLink <ArrowUpRight />
          </InlineLink>
        ))}
      </div>
    </div>
  );
};
