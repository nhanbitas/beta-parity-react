// 'use client'
import React from 'react';
import { NumberInput as NumberInputComponent } from 'beta-parity-react/ui/NumberInput';
export const NumberInputMdReadOnlyClearable = () => {
  const [value, setValue] = React.useState(1000);
  return (
    <NumberInputComponent
      readOnly
      isClearable
      value={value}
      placeholder='Placeholder'
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
