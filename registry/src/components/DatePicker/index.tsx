import React from 'react';
import './index.css';
import './variables.css';
import '../BaseInput/index.css';
import classNames from 'classnames';
import Flatpickr, { DateTimePickerProps } from 'react-flatpickr';
import { InputWrapper, InputWrapperProps } from '../BaseInput';
import { Calendar } from 'lucide-react';
import useCombinedRefs from '../hooks/useCombinedRefs';
import { ContainedLabel } from '../FloatingLabel';
import { Instance } from 'flatpickr/dist/types/instance';

export interface DatePickerProps extends DateTimePickerProps {
  floatingLabel?: React.ReactNode;
  wrapperProps?: InputWrapperProps;
  color?: 'neutral' | 'accent';
}

export const DatePicker = React.forwardRef<
  HTMLInputElement,
  {
    onFocus?: (e: any) => void;
    onBlur?: (e: any) => void;
  } & DatePickerProps
>(
  (
    {
      options,
      floatingLabel,
      value,
      wrapperProps,
      color = 'neutral',
      onFocus,
      onClose,
      onChange,
      readOnly,
      disabled,
      ...props
    },
    ref
  ) => {
    const inputRef = React.useRef<any>(null);
    const combinedRefs = useCombinedRefs(ref, inputRef);
    const [isFocused, setIsFocused] = React.useState(false);
    const [currentValue, setCurrentValue] = React.useState(value || '');

    const handleIconclick = (e: any) => {
      combinedRefs.current && combinedRefs.current.flatpickr.input.focus();
    };

    const RightBtn = (
      <button type='button' className='cursor-pointer' onClick={handleIconclick} disabled={disabled || readOnly}>
        <Calendar />
      </button>
    );

    const addedClassname = RightBtn && 'input-action';

    const handleFocus = (e: any) => {
      setIsFocused(true);
      onFocus && onFocus(e);
    };

    const handleOnClose = (selectedDates: Date[], dateStr: string, instance: Instance) => {
      setIsFocused(false);
      onClose && onClose(selectedDates, dateStr, instance);
    };

    const handleOnReady = (_: Date[], __: string, instance: Instance) => {
      instance.calendarContainer.classList.add(`flatpickr-calendar-${color}`);
    };

    const handleChange = (dates: Date[], currentDateString: string, self: Instance, data?: any) => {
      setCurrentValue(currentDateString);
      onChange && onChange(dates, currentDateString, self, data);
    };

    return (
      <InputWrapper
        className={classNames(addedClassname, wrapperProps?.className)}
        rightElement={RightBtn}
        {...wrapperProps}
      >
        {floatingLabel && <ContainedLabel isActive={isFocused || !!currentValue}>{floatingLabel}</ContainedLabel>}
        <Flatpickr
          className={classNames('date-picker', 'par-input', props.className)}
          onChange={handleChange}
          onFocus={handleFocus}
          onClose={handleOnClose}
          onReady={handleOnReady}
          options={{
            disableMobile: true,
            clickOpens: !readOnly && !disabled,
            ...options
          }}
          disabled={disabled}
          readOnly={readOnly}
          {...props}
          ref={combinedRefs as any}
        />
      </InputWrapper>
    );
  }
);

DatePicker.displayName = 'DatePicker';

// https://flatpickr.js.org/options/
