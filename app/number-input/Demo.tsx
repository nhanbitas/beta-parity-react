'use client';

import React from 'react';
import { NumberInput } from '@libComponents/NumberInput';

type Props = {};

export const DemoNumberInput = (props: Props) => {
  return (
    <NumberInput
      onChange={(e) => console.log(e.target.value)}
      wrapperProps={{ className: '!w-64' }}
      onClear={() => console.log('clear')}
      onUnitChange={(unit: string) => console.log(unit)}
      {...props}
    />
  );
};
