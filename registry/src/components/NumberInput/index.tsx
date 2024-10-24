'use client';

import * as React from 'react';
import './index.css';
import { NumericFormat, NumericFormatProps, SourceInfo } from 'react-number-format';
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
      ActionBtn,
      onUnitChange,
      onClear,
      onValueChange,
      onChange,
      ...props
    },
    ref
  ) => {
    const [currentValue, setCurrentValue] = React.useState(value || defaultValue || '');

    const handleChange = (values: any, event?: SourceInfo) => {
      let newValue = values.floatValue;

      if (min !== undefined && newValue <= min) {
        newValue = min;
      } else if (max !== undefined && newValue >= max) {
        newValue = max;
      }

      setCurrentValue(newValue);
      onChange?.({ target: { value: newValue } } as React.ChangeEvent<HTMLInputElement>);
      onValueChange?.(newValue, { event } as SourceInfo);
    };

    const handleClear = () => {
      onClear?.();
      handleChange({ floatValue: '' });
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
    ) : null;

    const inputProps = { ...props, ref, value: currentValue, onClear: handleClear } as any;

    const stepperProps = {
      value: isNaN(currentValue as number) ? 0 : +currentValue,
      min: min,
      max: max,
      hanldeValue: handleChange,
      stepControl: stepControl,
      disabled: props.disabled || props.readOnly
    } as StepperProps;

    const renderLeftElement = (originalElement?: React.ReactNode) => {
      if (stepper === 'cross') {
        return (
          <>
            {originalElement}
            <NumberButtonStepper {...stepperProps} minusOnly />
          </>
        );
      }
      return inputProps.leftIcon ? <span className='input-icon'>{inputProps.leftIcon}</span> : undefined;
    };

    const renderRightElement = (originalElement?: React.ReactNode) => {
      switch (stepper) {
        case 'auto':
          return (
            <>
              {originalElement}
              <NumberButtonStepper {...stepperProps} />
            </>
          );
        case 'chevron':
          return (
            <>
              {originalElement}
              <NumberButtonStepper {...stepperProps} isChervon />
            </>
          );
        case 'cross':
          return (
            <>
              {originalElement}
              <NumberButtonStepper {...stepperProps} plusOnly />
            </>
          );
        default:
          return unitElement || ActionBtn;
      }
    };

    React.useEffect(() => {
      setCurrentValue(value as string | number);
    }, [value]);

    return (
      <NumericFormat
        {...inputProps}
        customInput={Input}
        className={classNames('number-input', className, { [`${stepper}-stepper`]: !!stepper })}
        getInputRef={ref}
        value={currentValue}
        onValueChange={handleChange}
        // isAllowed is a pre handle function that returns true if the value is allowed
        isAllowed={({ floatValue }) => {
          const isValidValue =
            floatValue === undefined ||
            ((min === undefined || floatValue >= min) && (max === undefined || floatValue <= max));
          return isValidValue;
        }}
        wrapperProps={{
          ...inputProps.wrapperProps,
          leftElement: renderLeftElement(inputProps.wrapperProps?.leftElement)
          // No overwrite right element because of base input features, use ActionBtn instead
        }}
        ActionBtn={renderRightElement(inputProps.ActionBtn)}
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
  hanldeValue: (e: any) => void;
  minusOnly?: boolean;
  plusOnly?: boolean;
  isChervon?: boolean;
}

// TODO: fix double dispatch events
const NumberButtonStepper = ({
  value,
  hanldeValue,
  stepControl = 1,
  min,
  max,
  disabled = false,
  minusOnly = false,
  plusOnly = false,
  isChervon = false
}: StepperProps) => {
  const handleChange = (type: '+' | '-') => {
    const stepValue = type === '+' ? stepControl : -stepControl;
    const newValue = value + stepValue;
    hanldeValue({ floatValue: isNaN(value) ? stepValue : newValue });
  };

  const minusDisable = disabled || (min !== undefined && value <= min) || isNaN(value);
  const plusDisable = disabled || (max !== undefined && value >= max) || isNaN(value);

  if (minusOnly) {
    return (
      <div className='number-stepper-wrapper'>
        <button className='square-icon' disabled={minusDisable} onClick={() => handleChange('-')}>
          <MinusIcon />
        </button>
        <div className='controller-divider'></div>
      </div>
    );
  }

  if (plusOnly) {
    return (
      <div className='number-stepper-wrapper'>
        <div className='controller-divider'></div>
        <button className='square-icon' disabled={plusDisable} onClick={() => handleChange('+')}>
          <PlusIcon />
        </button>
      </div>
    );
  }

  if (isChervon) {
    return (
      <div className='number-stepper-wrapper chevron-stepper'>
        <div className='chevron-stepper-container'>
          <button className='square-icon' disabled={plusDisable} onClick={() => handleChange('+')}>
            <ChevronUp />
          </button>
          <button className='square-icon' disabled={minusDisable} onClick={() => handleChange('-')}>
            <ChevronDown />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className='number-stepper-wrapper'>
      <button className='square-icon' disabled={minusDisable} onClick={() => handleChange('-')}>
        <MinusIcon />
      </button>
      <div className='controller-divider'></div>
      <button className='square-icon' disabled={plusDisable} onClick={() => handleChange('+')}>
        <PlusIcon />
      </button>
    </div>
  );
};
