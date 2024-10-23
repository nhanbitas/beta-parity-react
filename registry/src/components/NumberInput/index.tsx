'use client';

import * as React from 'react';
import './index.css';
import { NumericFormat, NumericFormatProps } from 'react-number-format';
import { InputProps, Input } from '../BaseInput';
import { ChevronDown, ChevronUp, MinusIcon, PlusIcon } from 'lucide-react';
import classNames from 'classnames';

export interface NumberInputProps extends Omit<InputProps, 'onChange'> {
  unit?: string | string[];
  onUnitChange?: (unit: string) => void;
  min?: number;
  max?: number;
  stepper?: 'auto' | 'chevron' | 'cross';
  stepControl?: number;
  format?: any;
}

export const NumberInput = React.forwardRef<HTMLInputElement, NumberInputProps & NumericFormatProps>(
  (
    {
      className,
      value,
      defaultValue,
      unit,
      min,
      max,
      stepControl = 1,
      stepper,
      type,
      onUnitChange,
      onClear,
      onValueChange,
      onChange,
      ...props
    },
    ref
  ) => {
    const [currentValue, setCurrentValue] = React.useState(value || defaultValue || '');

    const handleChange = (e: any) => {
      let newValue = e.floatValue;

      if (min !== undefined && newValue <= min) {
        newValue = min;
      } else if (max !== undefined && newValue >= max) {
        newValue = max;
      }

      setCurrentValue(newValue);
    };

    const handleClear = () => {
      onClear?.();
      handleChange({ floatValue: '' });
    };

    React.useEffect(() => {
      setCurrentValue(value as string | number);
    }, [value]);

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
    ) : null;

    const inputProps = { ...props, ref, value: currentValue, onClear: handleClear, onChange: undefined };
    const stepperProps = {
      value: isNaN(currentValue as number) ? 0 : +currentValue,
      min: min,
      max: max,
      onChange: handleChange,
      stepControl: stepControl
    } as StepperProps;

    const leftElement = inputProps.leftIcon ? <span className='input-icon'>{inputProps.leftIcon}</span> : undefined;
    const rightElement =
      stepper === 'auto' ? (
        <NumberButtonStepper {...stepperProps} />
      ) : stepper === 'chevron' ? (
        <NumberChevronStepper {...stepperProps} />
      ) : (
        unitElement
      );

    return (
      <NumericFormat
        {...inputProps}
        className={classNames('number-input', className)}
        getInputRef={ref}
        onValueChange={handleChange}
        wrapperProps={{
          ...inputProps.wrapperProps,
          leftElement: leftElement,
          rightElement: rightElement
        }}
        customInput={Input}
      />
    );
  }
);

NumberInput.displayName = 'NumberInput';

// =========================
// Stepper
// =========================
interface StepperProps extends Pick<NumberInputProps, 'stepControl' | 'min' | 'max' | 'disabled'> {
  value: number;
  onChange: (e: any) => void;
}

const NumberButtonStepper = ({ value, onChange, stepControl = 1, min, max, disabled = false }: StepperProps) => {
  const handleChange = (type: '+' | '-') => {
    const stepValue = type === '+' ? stepControl : -stepControl;
    const newValue = value + stepValue;
    onChange({ floatValue: isNaN(value) ? stepValue : newValue });
  };

  const leftDisabled = disabled || (min !== undefined && value <= min) || isNaN(value);
  const rightDisabled = disabled || (max !== undefined && value >= max) || isNaN(value);

  return (
    <div className='number-controller-wrapper'>
      <button className='square-icon' disabled={leftDisabled} onClick={() => handleChange('-')}>
        <MinusIcon />
      </button>
      <div className='controller-divider'></div>
      <button className='square-icon' disabled={rightDisabled} onClick={() => handleChange('+')}>
        <PlusIcon />
      </button>
    </div>
  );
};

const NumberChevronStepper = ({ value, onChange, stepControl = 1, min, max }: StepperProps) => {
  const handleChange = (type: '+' | '-') => {
    const stepValue = type === '+' ? stepControl : -stepControl;
    const newValue = value + stepValue;
    onChange({ floatValue: isNaN(value) ? stepValue : newValue });
  };

  const topDisabled = (max !== undefined && value >= max) || isNaN(value);
  const bottomDisabled = (min !== undefined && value <= min) || isNaN(value);

  return (
    <div className='number-controller-wrapper chevron-stepper'>
      <button className='square-icon' disabled={topDisabled} onClick={() => handleChange('+')}>
        <ChevronUp />
      </button>
      <button className='square-icon' disabled={bottomDisabled} onClick={() => handleChange('-')}>
        <ChevronDown />
      </button>
    </div>
  );
};
