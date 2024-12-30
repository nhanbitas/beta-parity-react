'use client';

import { Button } from '@libComponents/Button';
import Badge from '@libComponents/Badge';
import { Tooltip } from '@libComponents/Tooltip';
import React from 'react';
import { Info, InfoIcon, Plus } from 'lucide-react';

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
    <div className='flex flex-col gap-4'>
      <div className='flex flex-wrap gap-4'>
        {positions.map((position) => (
          <Tooltip key={position} {...props} position={position}>
            <InfoIcon />
          </Tooltip>
        ))}
      </div>
      <div className='flex flex-wrap gap-4'>
        {positions.map((position) => (
          <Tooltip key={position} {...props} position={position}>
            <Button kind='glass' iconOnly>
              <Plus />
            </Button>
          </Tooltip>
        ))}
      </div>
    </div>
  );
};
