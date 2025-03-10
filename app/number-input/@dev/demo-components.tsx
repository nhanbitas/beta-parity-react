'use client';

import React from 'react';
import { NumberInput } from 'beta-parity-react/ui/NumberInput';

type Props = any;

export const DemoNumberInput = (props: Props) => {
  const [value, setValue] = React.useState((props.value as number) ?? 0);
  const [unit, setUnit] = React.useState('USD');
  const handleChange = (values: any) => {
    setValue(values.floatValue);
    console.log(values);
  };

  const handleUnitChange = (unit: string) => {
    setUnit(unit);
    console.log(unit);
  };

  return (
    <div>
      <NumberInput
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
