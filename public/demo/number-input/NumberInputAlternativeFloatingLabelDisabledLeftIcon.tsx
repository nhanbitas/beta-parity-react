// 'use client'
import React from 'react';
import { NumberInput as NumberInputComponent } from 'beta-parity-react/ui/NumberInput';
import { CircleDollarSign } from 'lucide-react';
export const NumberInputAlternativeFloatingLabelDisabledLeftIcon = () => {
  const [value, setValue] = React.useState(1000);
  return (
    <NumberInputComponent
      isClearable
      disabled
      floatingLabel='Enter Number'
      placeholder='Placeholder'
      value={value}
      leftIcon={<CircleDollarSign />}
      theme='alternative'
      onValueChange={(v) => setValue(typeof v?.floatValue === 'number' ? v.floatValue : 0)}
      allowInput={false}
      thousandSeparator='.'
      decimalSeparator=','
      wrapperProps={{ className: '!w-64' }}
      onClear={() => {}}
    />
  );
};
