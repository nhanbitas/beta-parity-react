'use client';

import React from 'react';
import { NumberInput } from '@libComponents/NumberInput';

type Props = any;

export const DemoNumberInput = (props: Props) => {
  const [value, setValue] = React.useState((props.value as number) ?? 0);
  const handleChange = (values: any) => {
    setValue(values.floatValue);
    console.log(values);
  };

  return (
    <div>
      <NumberInput
        value={value}
        onValueChange={handleChange}
        thousandSeparator='.'
        decimalSeparator=','
        wrapperProps={{ className: '!w-64' }}
        onClear={() => console.log('clear')}
        onUnitChange={(unit: string) => console.log(unit)}
        {...props}
      />
    </div>
  );
};
