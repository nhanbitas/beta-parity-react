// 'use client'
import React from 'react';
import { NumberInput as NumberInputComponent } from 'beta-parity-react/ui/NumberInput';
export const NumberInputMdErrorClearable = () => {
  const [value, setValue] = React.useState(0);
  return (
    <NumberInputComponent
      isError={true}
      errorMessage='Error message'
      isClearable
      placeholder='Placeholder'
      inputSize='md'
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
