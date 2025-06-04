'use client';
import React from 'react';
import { InlineLink } from 'beta-parity-react/ui/InlineLink';
import Link from 'next/link';

const colors = ['standard', 'neutral'];

export const KindInlineLink = () => {
  return (
    <div className='gap-4 rounded-md p-2'>
      <h3>None Underline</h3>
      <div className='not-prose my-4 flex gap-4'>
        {colors.map((color) => (
          <InlineLink key={color} color={color as any} underline='none'>
            InlineLink
          </InlineLink>
        ))}
      </div>
      <h3>Hover to Underline</h3>
      <div className='not-prose my-4 flex gap-4 '>
        {colors.map((color) => (
          <InlineLink key={color} color={color as any} underline='hover' asChild>
            <Link href='#' prefetch={true}>
              InlineLink
            </Link>
          </InlineLink>
        ))}
        {colors.map((color) => (
          <InlineLink key={color} color={color as any} underline='hover' disabled>
            InlineLink
          </InlineLink>
        ))}
      </div>
      <h3>Always Underline</h3>
      <div className='not-prose my-4 flex gap-4 '>
        {colors.map((color) => (
          <InlineLink key={color} color={color as any} underline='always'>
            InlineLink
          </InlineLink>
        ))}
      </div>
    </div>
  );
};
