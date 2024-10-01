'use client';

import React from 'react';
import './index.css';
import '../Input/index.css';
import classNames from 'classnames';
import Flatpickr, { DateTimePickerProps } from 'react-flatpickr';
import { InputWrapper } from '../Input';
import { Calendar } from 'lucide-react';
import useCombinedRefs from '../hooks/useCombinedRefs';
import { ContainedLabel } from '../FloatingLabel';

export interface DatePikerProps extends DateTimePickerProps {
  floatingLabel?: React.ReactNode;
  wrapperClassname?: string;
}

export const DatePicker = React.forwardRef<
  HTMLInputElement,
  {
    onFocus?: (e: any) => void;
    onBlur?: (e: any) => void;
  } & DatePikerProps
>(({ options, floatingLabel, wrapperClassname, ...props }, ref) => {
  const inputRef = React.useRef<any>(null);
  const combinedRefs = useCombinedRefs(ref, inputRef);
  const [isFocused, setIsFocused] = React.useState(false);
  const currentValue = props.value;

  const handleIconclick = (e: any) => {
    combinedRefs.current && combinedRefs.current.flatpickr.input.focus();
  };

  const RightBtn = (
    <button type='button' className='cursor-pointer' onClick={handleIconclick}>
      <Calendar />
    </button>
  );

  const addedClassname = RightBtn && 'input-action';

  const handleFocus = (e: any) => {
    setIsFocused(true);
    props.onFocus && props.onFocus(e);
  };

  const handleOnClose = (selectedDates: any, dateStr: any, instance: any) => {
    setIsFocused(false);
    props.onClose && props.onClose(selectedDates, dateStr, instance);
  };

  return (
    <InputWrapper className={classNames(addedClassname, wrapperClassname)} rightElement={RightBtn}>
      {floatingLabel && <ContainedLabel isActive={isFocused || !!currentValue}>{floatingLabel}</ContainedLabel>}
      <Flatpickr
        className={classNames('date-picker', 'par-input', props.className)}
        onFocus={handleFocus}
        onClose={handleOnClose}
        options={{ disableMobile: true, ...options }}
        {...props}
        ref={combinedRefs as any}
      />
    </InputWrapper>
  );
});

DatePicker.displayName = 'DatePicker';

// https://flatpickr.js.org/options/
