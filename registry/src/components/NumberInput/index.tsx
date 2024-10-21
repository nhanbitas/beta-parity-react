'use client';

import * as React from 'react';
import './index.css';
import '../Select/index.css';
import { Input } from '../BaseInput';
import { NumericFormatProps, numericFormatter, removeNumericFormat } from 'react-number-format';

export interface NumberInputProps extends Omit<React.ComponentPropsWithoutRef<typeof Input>, 'type' | 'min' | 'max'> {
  unit?: string | string[];
  onUnitChange?: (unit: string) => void;
  min?: number;
  max?: number;

  /**
   * Options for formatting the numeric input.
   * @default { allowNegative: true, thousandSeparator: true, allowLeadingZeros: true }
   * @see https://s-yadav.github.io/react-number-format/docs/numeric_format
   */
  formatOptions?: NumericFormatProps;
}

const numbericChangeMeta = {
  from: { start: 0, end: 0 },
  to: { start: 0, end: 0 },
  lastValue: ''
};

export const NumberInput = React.forwardRef<React.ElementRef<typeof Input>, NumberInputProps>(
  ({ value, min, max, unit = '', formatOptions = {}, onChange, onUnitChange, ...props }, ref) => {
    const [currentValue, setCurrentValue] = React.useState(value || '');

    const options: NumericFormatProps = {
      allowNegative: true,
      thousandSeparator: true,
      allowLeadingZeros: true,
      ...formatOptions
    };

    const updateCurrentValue = (nativeNumber: string) => {
      const formatedNumber = numericFormatter(nativeNumber, options); // format
      setCurrentValue(formatedNumber);
      onChange?.({
        target: { value: isNaN(Number(nativeNumber)) || nativeNumber === '' ? '' : Number(nativeNumber) }
      } as React.ChangeEvent<HTMLInputElement>);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      if (!value) return updateCurrentValue('');
      let nativeNumber = removeNumericFormat(value, numbericChangeMeta, options); // remove format
      if (!Number(nativeNumber)) return updateCurrentValue(nativeNumber); // not a number, handle for ["-", "+"]
      if (min != undefined && Number(nativeNumber) <= min) nativeNumber = min.toString(); // set min if less than min
      if (max != undefined && Number(nativeNumber) >= max) nativeNumber = max.toString(); // set max if greater than max
      updateCurrentValue(nativeNumber);
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
      <Input ref={ref} type='text' value={currentValue} onChange={handleChange} ActionBtn={unitElement} {...props} />
    );
  }
);

NumberInput.displayName = 'NumberInput';
