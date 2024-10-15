'use client';

import * as React from 'react';
import './index.css';
import { Input } from '../Input';

export interface NumberInputProps extends React.ComponentPropsWithoutRef<typeof Input> {}

const NumberInput = React.forwardRef<
  React.ElementRef<typeof Input>,
  React.ComponentPropsWithoutRef<typeof Input> & NumberInputProps
>(({ type = 'text', value, onChange, ...props }, ref) => {
  const [currentValue, setCurrentValue] = React.useState(value || '');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const isNumber = /^[0-9]*$/.test(value);
    if (!isNumber) return;
    setCurrentValue(e.target.value);
    onChange && onChange(e);
  };

  return <Input ref={ref} type={type} value={currentValue} onChange={handleChange} {...props} />;
});

NumberInput.displayName = 'NumberInput';

export { NumberInput };

NumberInput.displayName = 'NumberInput';
