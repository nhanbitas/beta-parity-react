// 'use client'
import React from 'react';
import { NumberInput as NumberInputComponent } from 'beta-parity-react/ui/NumberInput';
export const NumberInputFloatingLabelUnitArray = () => {
  const [value, setValue] = React.useState(0);
  const [unit, setUnit] = React.useState('USD');
  return (
    <NumberInputComponent
      floatingLabel='Enter Number'
      placeholder='Placeholder'
      unit={['USD', 'VND', 'EUR', 'JPY']}
      selectedUnit={unit}
      onUnitChange={setUnit}
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
