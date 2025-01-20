'use client';

import { Button } from '@libComponents/Button';
import { Tooltip } from '@libComponents/Tooltip';
import React from 'react';
import { InfoIcon, Plus } from 'lucide-react';
import { InlineLink } from '@libComponents/InlineLink';
import Link from 'next/link';

type Props = {};

const positions = [
  'top',
  'bottom',
  'left',
  'right',
  'top-start',
  'bottom-start',
  'left-start',
  'right-start',
  'top-end',
  'bottom-end',
  'left-end',
  'right-end'
] as const;

export const DemoOutlinedTooltip = (props: Props) => {
  return (
    <div className='flex flex-col flex-wrap gap-4'>
      <div className='flex flex-wrap gap-4'>
        {positions.map((position) => (
          <Tooltip key={position} {...props} position={position} content='This is a tooltip with an icon'>
            <span className='flex items-center p-1'>
              <InfoIcon />
            </span>
          </Tooltip>
        ))}
      </div>

      <div className='flex flex-wrap gap-4'>
        {positions.map((position) => (
          <Tooltip key={position} {...props} position={position} content='This is a tooltip with a button'>
            <Button kind='glass' iconOnly onClick={() => window.alert('clicked')}>
              <Plus />
            </Button>
          </Tooltip>
        ))}
      </div>

      <div className='flex flex-wrap gap-4'>
        {positions.map((position) => (
          <Tooltip key={position} {...props} position={position} content='This is a tooltip with a text'>
            10.000
          </Tooltip>
        ))}
      </div>

      <div className='not-prose flex flex-wrap gap-4'>
        {positions.map((position) => (
          <Tooltip key={position} {...props} position={position} content='This is a tooltip with an inline link'>
            <InlineLink href='#'>InlineLink</InlineLink>
          </Tooltip>
        ))}
      </div>

      <div className='flex flex-wrap gap-4'>
        {positions.map((position) => (
          <Tooltip key={position} {...props} position={position} content='This is a tooltip with a link (next/link)'>
            <Link href='#' className='next-link' prefetch>
              Login
            </Link>
          </Tooltip>
        ))}
      </div>
    </div>
  );
};
