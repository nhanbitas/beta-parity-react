// 'use client'
import React from 'react';
import { NumberInput as NumberInputComponent } from 'beta-parity-react/ui/NumberInput';
import { CircleDollarSign } from 'lucide-react';
export const NumberInputReadOnlyLeftIconChevron = () => {
  const [value, setValue] = React.useState(1000);
  return (
    <NumberInputComponent
      readOnly
      value={value}
      placeholder='Placeholder'
      leftIcon={<CircleDollarSign />}
      stepper='chevron'
      allowInput={false}
      thousandSeparator='.'
      decimalSeparator=','
      wrapperProps={{ className: '!w-64' }}
      onClear={() => {}}
    />
  );
};
