// 'use client'
import React from 'react';
import { NumberInput as NumberInputComponent } from 'beta-parity-react/ui/NumberInput';
import { CircleDollarSign } from 'lucide-react';
export const NumberInputMdDisabledClearableLeftIcon = () => {
  const [value, setValue] = React.useState(1000);
  return (
    <NumberInputComponent
      disabled
      isClearable
      value={value}
      placeholder='Placeholder'
      leftIcon={<CircleDollarSign />}
      inputSize='md'
      onValueChange={(v) => setValue(typeof v?.floatValue === 'number' ? v.floatValue : 0)}
      allowInput={false}
      thousandSeparator='.'
      decimalSeparator=','
      wrapperProps={{ className: '!w-64' }}
      onClear={() => {}}
    />
  );
};
