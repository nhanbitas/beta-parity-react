// 'use client'
import React from 'react';
import { NumberInput as NumberInputComponent } from 'beta-parity-react/ui/NumberInput';
export const NumberInputReadOnlySeparate = () => {
  const [value, setValue] = React.useState(1000);
  return (
    <NumberInputComponent
      readOnly
      value={value}
      placeholder='Placeholder'
      stepper='separate'
      allowInput={false}
      thousandSeparator='.'
      decimalSeparator=','
      wrapperProps={{ className: '!w-64' }}
      onClear={() => {}}
    />
  );
};
