'use client';

import React from 'react';
import { NumberInput as NumberInputComponent } from 'beta-parity-react/ui/NumberInput';
import { CircleDollarSign } from 'lucide-react';
export const NumberInputErrorDisabledPlaceholderLeftIcon = () => {
  const [value, setValue] = React.useState(0);
  return (
    <NumberInputComponent
      disabled
      placeholder='Placeholder'
      leftIcon={<CircleDollarSign />}
      value={value}
      onValueChange={(v) => setValue(typeof v?.floatValue === 'number' ? v.floatValue : 0)}
      allowInput={false}
      thousandSeparator='.'
      decimalSeparator=','
      wrapperProps={{ className: '!w-64' }}
      onClear={() => {}}
    />
  );
};
