import React from 'react';
import { InlineLink } from 'beta-parity-react/ui/InlineLink';
import { ArrowUpRight, HomeIcon } from 'lucide-react';
import Link from 'next/link';

const colors = ['standard', 'neutral'];

export const DemoKindInlineLink = () => {
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

export const DemoSizeInlineLink = () => {
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

export const DemoIconInlineLink = () => {
  return (
    <div className=' gap-4 rounded-md p-2'>
      <h3>Small</h3>
      <div className='not-prose my-4 flex gap-4'>
        {colors.map((color) => (
          <InlineLink key={color} color={color as any} size='sm' iconOnly>
            <HomeIcon />
          </InlineLink>
        ))}
      </div>
      <h3>Medium</h3>
      <div className='not-prose my-4 flex gap-4'>
        {colors.map((color) => (
          <InlineLink key={color} color={color as any} size='md' iconOnly>
            <HomeIcon />
          </InlineLink>
        ))}
        {colors.map((color) => (
          <InlineLink key={color} color={color as any} size='md' iconOnly disabled>
            <HomeIcon />
          </InlineLink>
        ))}
      </div>
      <h3>Large</h3>
      <div className='not-prose my-4 flex gap-4'>
        {colors.map((color) => (
          <InlineLink key={color} color={color as any} size='lg' iconOnly>
            <HomeIcon />
          </InlineLink>
        ))}
      </div>
    </div>
  );
};
