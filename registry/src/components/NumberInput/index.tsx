'use client';

import * as React from 'react';
import './index.css';
import { NumericFormat, NumericFormatProps, numericFormatter, SourceInfo } from 'react-number-format';
import { InputProps, Input } from '../BaseInput';
import { ChevronDown, ChevronUp, MinusIcon, PlusIcon } from 'lucide-react';
import classNames from 'classnames';

export interface NumberInputProps extends Omit<InputProps, 'onChange'> {
  /**
   * The unit or list of units displayed alongside the input value.
   * Can be a single string or an array of strings to select from.
   *
   * @memberof NumberInputProps
   */
  unit?: string | string[];

  /**
   * Callback function triggered when the unit is changed.
   *
   * @param {string} unit - The new selected unit.
   * @memberof NumberInputProps
   */
  onUnitChange?: (unit: string) => void;

  /**
   * The minimum allowed value for the input.
   *
   * @memberof NumberInputProps
   */
  min?: number;

  /**
   * The maximum allowed value for the input.
   *
   * @memberof NumberInputProps
   */
  max?: number;

  /**
   * Type of stepper control to display for adjusting the input value.
   * - `'auto'`: Automatic increment/decrement based on user interactions.
   * - `'chevron'`: Chevron-style increment/decrement buttons.
   * - `'separate'`: Cross-style button allowing put left and rigt buttons particularly.
   *
   * @memberof NumberInputProps
   */
  stepper?: 'auto' | 'chevron' | 'separate';

  /**
   * The increment or decrement value for the stepper control.
   * Defaults to 1 if not specified.
   *
   * @memberof NumberInputProps
   */
  stepControl?: number;
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
    const isControlled = value !== undefined;
    const [currentValue, setCurrentValue] = React.useState(value ?? defaultValue ?? '');

    const handleChange = (values: any, event?: SourceInfo) => {
      let newValue = values.floatValue;
      if (currentValue === newValue) return;

      // fix uncontrolled react-format-number
      // if having value property that provided by HOC, we just dispatch event
      // if value is not provided by HOC, we need update inner value - current value
      if (!isControlled) setCurrentValue(newValue);
      onValueChange?.({ floatValue: newValue, ...values }, { event } as SourceInfo);
      onChange?.({ target: { value: newValue } } as React.ChangeEvent<HTMLInputElement>);
    };

    // overwrite clear function because react-format-number replace original input value and control value
    const handleClear = () => {
      onClear?.();
      handleChange({ floatValue: '', value: '', floatValueAsString: '' });
    };

    // generate unit selector
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

    // define needed props for input and stepper
    const inputProps = { ...props, ref, value: currentValue, onClear: handleClear } as any;
    const stepperProps = {
      value: isNaN(currentValue as number) || currentValue === undefined ? 0 : +currentValue,
      min: min,
      max: max,
      hanldeValue: handleChange,
      stepControl: stepControl,
      disabled: props.disabled || props.readOnly,
      formatProps: {
        thousandSeparator: props.thousandSeparator,
        decimalSeparator: props.decimalSeparator,
        allowedDecimalSeparators: props.allowedDecimalSeparators,
        thousandsGroupStyle: props.thousandsGroupStyle,
        decimalScale: props.decimalScale,
        fixedDecimalScale: props.fixedDecimalScale,
        allowNegative: props.allowNegative,
        allowLeadingZeros: props.allowLeadingZeros,
        suffix: props.suffix,
        prefix: props.prefix
      } as FormatProps
    } as StepperProps;

    // define left elements, it is depend on related props
    const renderLeftElement = (originalElement?: React.ReactNode) => {
      if (stepper === 'separate') {
        return (
          <>
            {originalElement}
            <NumberButtonStepper {...stepperProps} minusOnly />
          </>
        );
      }
      return inputProps.leftIcon ? <span className='input-icon'>{inputProps.leftIcon}</span> : undefined;
    };

    // define right elements, it is depend on related props
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
        case 'separate':
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
        onValueChange={handleChange}
        isAllowed={({ floatValue }) => {
          // TODO: fix case having value but onValueChange not change value - backlog
          if (isControlled && !onValueChange) return false;
          if (floatValue === undefined || floatValue.toString() === '') return true;
          const isValidValue = (min === undefined || floatValue >= min) && (max === undefined || floatValue <= max);
          return isValidValue;
        }}
        wrapperProps={{
          ...inputProps.wrapperProps,
          leftElement: renderLeftElement(inputProps.wrapperProps?.leftElement)
        }}
        // No overwrite right element because of base input features, use ActionBtn instead
        ActionBtn={renderRightElement(inputProps.ActionBtn)}
      />
    );
  }
);

NumberInput.displayName = 'NumberInput';

// =========================
// Stepper
// =========================

type FormatProps = Pick<
  NumericFormatProps,
  | 'thousandSeparator'
  | 'decimalSeparator'
  | 'allowedDecimalSeparators'
  | 'thousandsGroupStyle'
  | 'decimalScale'
  | 'fixedDecimalScale'
  | 'allowNegative'
  | 'allowLeadingZeros'
  | 'suffix'
  | 'prefix'
>;

interface StepperProps extends Pick<NumberInputProps, 'stepControl' | 'min' | 'max' | 'disabled'> {
  value: number;
  hanldeValue: (e: any) => void;
  minusOnly?: boolean;
  plusOnly?: boolean;
  isChervon?: boolean;
  formatProps?: FormatProps;
}

const NumberButtonStepper = ({
  value,
  hanldeValue,
  stepControl = 1,
  min,
  max,
  disabled = false,
  minusOnly = false,
  plusOnly = false,
  isChervon = false,
  formatProps = {}
}: StepperProps) => {
  // create function handle value from number input, after that, render the suitable stepper button
  const handleChange = (type: '+' | '-') => {
    const stepValue = type === '+' ? stepControl : -stepControl;
    let newValue = value + stepValue;

    // handle min and max when value is change
    // if value larger than max, the new value is reset to max value
    // if value lower than min, the new value is reset to min value
    if (min !== undefined && newValue <= min) {
      newValue = min;
    } else if (max !== undefined && newValue >= max) {
      newValue = max;
    }

    hanldeValue({
      floatValue: isNaN(value) ? stepValue : newValue,
      value: newValue.toString(),
      formattedValue: numericFormatter(newValue.toString(), formatProps)
    });
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
