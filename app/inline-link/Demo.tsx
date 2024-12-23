import React from 'react';
import { InlineLink } from '@libComponents/InlineLink';

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
          <InlineLink key={color} color={color as any} underline='hover'>
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
            InlineLink
          </InlineLink>
        ))}
      </div>
      <h3>Medium</h3>
      <div className='not-prose my-4 flex gap-4'>
        {colors.map((color) => (
          <InlineLink key={color} color={color as any} size='md'>
            InlineLink
          </InlineLink>
        ))}
      </div>
      <h3>Large</h3>
      <div className='not-prose my-4 flex gap-4'>
        {colors.map((color) => (
          <InlineLink key={color} color={color as any} size='lg'>
            InlineLink
          </InlineLink>
        ))}
      </div>
    </div>
  );
};
