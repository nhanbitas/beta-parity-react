'use client';

import React from 'react';
import { NumberInput as NumberInputComponent } from 'beta-parity-react/ui/NumberInput';

export const NumberInput = (props: any) => {
  const [value, setValue] = React.useState((props.value as number) ?? 0);
  const [unit, setUnit] = React.useState('USD');
  const handleChange = (values: any) => {
    setValue(typeof values?.floatValue === 'number' ? values.floatValue : 0);
    console.log(values);
  };

  const handleUnitChange = (unit: string) => {
    setUnit(unit);
    console.log(unit);
  };

  return (
    <div>
      <NumberInputComponent
        value={value}
        onValueChange={handleChange}
        allowInput={false}
        thousandSeparator='.'
        decimalSeparator=','
        wrapperProps={{ className: '!w-64' }}
        onClear={() => console.log('clear')}
        selectedUnit={unit}
        onUnitChange={handleUnitChange}
        {...props}
      />
    </div>
  );
};
