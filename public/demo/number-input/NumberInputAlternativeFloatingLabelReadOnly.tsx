// 'use client'
import React from 'react';
import { NumberInput as NumberInputComponent } from 'beta-parity-react/ui/NumberInput';
export const NumberInputAlternativeFloatingLabelReadOnly = () => {
  const [value, setValue] = React.useState(1000);
  return (
    <NumberInputComponent
      isClearable
      readOnly
      floatingLabel='Enter Number'
      placeholder='Placeholder'
      value={value}
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
