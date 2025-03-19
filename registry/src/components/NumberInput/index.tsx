import * as React from 'react';
import classNames from 'classnames';
import { NumericFormat, NumericFormatProps, numericFormatter, SourceInfo } from 'react-number-format';
import { ChevronDown, ChevronUp, MinusIcon, PlusIcon } from 'lucide-react';

import './index.css';

import { InputProps, Input, UnitSelector } from '../BaseInput';

// =========================
// NumberInput
// =========================
// Declare and export NumberInput type and NumberInput component

/**
 * Props for the NumberInput component.
 *
 * Extends properties from the `Input` component.
 */
export interface NumberInputProps extends Omit<InputProps, 'onChange'> {
  /**
   * The unit or list of units displayed alongside the input value.
   * Can be a single string or an array of strings to select from.
   *
   * @memberof NumberInputProps
   */
  unit?: string | string[];

  /**
   * The selected unit
   * Can be a single string to select from.
   *
   * @memberof NumberInputProps
   */
  selectedUnit?: string;

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
   * @default 'auto'
   * @memberof NumberInputProps
   */
  stepper?: 'auto' | 'chevron' | 'separate';

  /**
   * The increment or decrement value for the stepper control.
   * Defaults to 1 if not specified.
   *
   * @default 1
   * @memberof NumberInputProps
   */
  stepControl?: number;

  /**
   * Prevent or not prevent input when having steppers.
   *
   * @default true
   * @memberof NumberInputProps
   */
  allowInput?: boolean;
}

/**
 * **Parity NumberInput**.
 *
 *  @see {@link http://localhost:3005/number-input Parity NumberInput}
 */
export const NumberInput = React.forwardRef<HTMLInputElement, NumberInputProps & NumericFormatProps>(
  (
    {
      className,
      value,
      defaultValue,
      unit,
      selectedUnit,
      min,
      max,
      stepControl = 1,
      stepper,
      allowInput = true,
      type,
      isClearable,
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
    const isClearableNumberInput = !!stepper ? false : isClearable;
    const [currentValue, setCurrentValue] = React.useState(value ?? defaultValue ?? '');

    const handleChange = (values: any, event?: SourceInfo) => {
      let newValue = values.floatValue;
      if (currentValue === newValue) return;

      // fix uncontrolled react-format-number
      // if having value property that provided by HOC, we just dispatch event
      // if value is not provided by HOC, we need update inner value - current value
      if (!isControlled) setCurrentValue(newValue);
      onValueChange?.({ floatValue: newValue ?? '', ...values }, { event } as SourceInfo);
      onChange?.({ target: { value: newValue ?? '' } } as React.ChangeEvent<HTMLInputElement>);
    };

    // overwrite clear function because react-format-number replace original input value and control value
    const handleClear = () => {
      onClear?.();
      // react-format-number 5.4.3 does not need to update inner value - current value in ClearButton
      // Update inner value is updated by BaseInput component
      // handleChange({ floatValue: '', value: '', floatValueAsString: '' });
    };

    // generate unit selector
    const handleUnitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      onUnitChange?.(e.target.value as string);
    };
    const unitElement = (
      <UnitSelector
        unit={unit}
        onUnitChange={handleUnitChange}
        unitValue={selectedUnit}
        disabled={props.disabled}
        theme={props.theme}
      />
    );

    // define needed props for input and stepper
    const inputProps = { ...props, value: currentValue, onClear: handleClear } as any;
    const stepperProps = {
      value: isNaN(currentValue as number) || currentValue === undefined ? 0 : +currentValue,
      min: min,
      max: max,
      handleValue: handleChange,
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
        type='text'
        customInput={Input}
        isClearable={isClearableNumberInput}
        className={classNames('number-input', className, { [`${stepper}-stepper`]: !!stepper })}
        getInputRef={ref}
        onValueChange={handleChange}
        isAllowed={({ floatValue }) => {
          // TODO: fix case having value but onValueChange not change value
          if (!allowInput && !!stepper) return false;
          if (isControlled && !onValueChange) return false;
          if (floatValue === undefined || floatValue.toString() === '') return true;
          const isValidValue = (min === undefined || floatValue >= min) && (max === undefined || floatValue <= max);
          return isValidValue;
        }}
        readOnly={props.readOnly || (!allowInput && !!stepper)}
        wrapperProps={{
          ...inputProps.wrapperProps,
          leftElement: renderLeftElement(inputProps.wrapperProps?.leftElement)
        }}
        // Add aria-describedby to handle allow input with readonly attribute - fix uncontrolled behavior of react format number
        {...(!allowInput && !!stepper && !props.readOnly ? ({ 'data-readonly': 'not-allowed-input' } as any) : {})}
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
  handleValue: (e: any) => void;
  minusOnly?: boolean;
  plusOnly?: boolean;
  isChervon?: boolean;
  formatProps?: FormatProps;
}

const NumberButtonStepper = ({
  value,
  handleValue,
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
  const intervalValue = React.useRef<number>(value);
  const intervalRef = React.useRef<NodeJS.Timeout | null>(null);
  const debounceRef = React.useRef<NodeJS.Timeout | null>(null);

  const minusDisable = disabled || (min !== undefined && intervalValue.current <= min) || isNaN(intervalValue.current);
  const plusDisable = disabled || (max !== undefined && intervalValue.current >= max) || isNaN(intervalValue.current);

  const handleChange = (type: '+' | '-') => {
    const stepValue = type === '+' ? stepControl : -stepControl;
    intervalValue.current = intervalValue.current + stepValue;

    if (min !== undefined && intervalValue.current <= min) {
      intervalValue.current = min;
    } else if (max !== undefined && intervalValue.current >= max) {
      intervalValue.current = max;
    }

    handleValue({
      floatValue: isNaN(value) ? stepValue : intervalValue.current,
      value: intervalValue.current.toString(),
      formattedValue: numericFormatter(intervalValue.current.toString(), formatProps)
    });
  };

  // Recall +/- when user press button
  const startInterval = (type: '+' | '-') => {
    handleChange(type);
    debounceRef.current = setTimeout(() => (intervalRef.current = setInterval(() => handleChange(type), 100)), 1000);
  };

  // Stop +/- when mouse leave button
  const stopInterval = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (debounceRef.current) clearInterval(debounceRef.current);
  };

  const generateProps = (type: '+' | '-') => {
    return {
      className: 'square-icon',
      disabled: type === '-' ? minusDisable : plusDisable,
      onKeyDown: (e: React.KeyboardEvent<HTMLButtonElement>) => {
        if (e.key === 'Enter' || e.key === ' ') {
          handleChange(type);
        }
      },
      onMouseDown: () => startInterval(type),
      onMouseUp: () => stopInterval(),
      onMouseLeave: () => stopInterval()
    } as React.HTMLAttributes<HTMLButtonElement>;
  };

  React.useEffect(() => {
    if (value !== intervalValue.current) {
      intervalValue.current = value;
    }
  }, [value]);

  if (plusDisable || minusDisable) stopInterval();

  const MinusButton = <button {...generateProps('-')}>{isChervon ? <ChevronDown /> : <MinusIcon />}</button>;

  const PlusButton = <button {...generateProps('+')}>{isChervon ? <ChevronUp /> : <PlusIcon />}</button>;

  if (minusOnly) {
    return (
      <div className='number-stepper-wrapper'>
        {MinusButton}
        <div className='controller-divider'></div>
      </div>
    );
  }

  if (plusOnly) {
    return (
      <div className='number-stepper-wrapper'>
        <div className='controller-divider'></div>
        {PlusButton}
      </div>
    );
  }

  if (isChervon) {
    return (
      <div className='number-stepper-wrapper chevron-stepper'>
        <div className='controller-divider'></div>
        <div className='chevron-stepper-container'>
          {PlusButton}
          {MinusButton}
        </div>
      </div>
    );
  }

  return (
    <div className='number-stepper-wrapper'>
      {MinusButton}
      <div className='controller-divider'></div>
      {PlusButton}
    </div>
  );
};
