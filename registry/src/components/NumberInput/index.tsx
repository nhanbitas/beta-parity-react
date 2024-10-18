'use client';

import * as React from 'react';
import './index.css';
import '../Select/index.css';
import { Input } from '../BaseInput';

export interface NumberInputProps extends React.ComponentPropsWithoutRef<typeof Input> {
  unit?: string | string[];
  onUnitChange?: (unit: string) => void;
}

const NumberInput = React.forwardRef<
  React.ElementRef<typeof Input>,
  React.ComponentPropsWithoutRef<typeof Input> & NumberInputProps
>(({ type = 'text', value, unit = '', onChange, onUnitChange, ...props }, ref) => {
  const [currentValue, setCurrentValue] = React.useState(value || '');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const isNumber = /^[0-9]*$/.test(value);
    if (!isNumber) return;
    setCurrentValue(e.target.value);
    onChange && onChange(e);
  };

  const isSelectUnit = Array.isArray(unit);
  const handleUitChage = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onUnitChange?.(e.target.value as string);
  };
  const unitElement = !!unit ? (
    <span className={`input-icon number-input-unit ${isSelectUnit ? 'selectable' : ''}`}>
      {isSelectUnit ? (
        <select onChange={handleUitChage}>
          {unit.map((u) => (
            <option key={u} value={u}>
              {u}
            </option>
          ))}
        </select>
      ) : (
        unit
      )}
    </span>
  ) : undefined;

  return (
    <Input ref={ref} type={type} value={currentValue} onChange={handleChange} ActionBtn={unitElement} {...props} />
  );
});

NumberInput.displayName = 'NumberInput';

export { NumberInput };

NumberInput.displayName = 'NumberInput';
