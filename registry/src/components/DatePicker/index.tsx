'use client';

import React from 'react';
import './index.css';
import '../Input/index.css';
import classNames from 'classnames';
import Flatpickr, { DateTimePickerProps } from 'react-flatpickr';
import { InputWrapper } from '../Input';
import { Calendar } from 'lucide-react';
import useCombinedRefs from '../hooks/useCombinedRefs';

export interface DatePikerProps extends DateTimePickerProps {}

export const DatePicker = React.forwardRef<
  HTMLInputElement,
  {
    onFocus?: (e: any) => void;
    onBlur?: (e: any) => void;
  } & DatePikerProps
>(({ options, ...props }, ref) => {
  const inputRef = React.useRef<any>(null);
  const combinedRefs = useCombinedRefs(ref, inputRef);

  const handleIconclick = (e: any) => {
    combinedRefs.current && combinedRefs.current.flatpickr.input.focus();
  };

  const RightBtn = (
    <button type='button' className='cursor-pointer' onClick={handleIconclick}>
      <Calendar />
    </button>
  );

  const handleFocus = (e: any) => {
    props.onFocus && props.onFocus(e);
  };

  const handleBlur = (e: any) => {
    props.onBlur && props.onBlur(e);
  };

  React.useEffect(() => {
    handleFocus({ target: { value: props.value } });
  }, [props.value]);

  return (
    <InputWrapper rightElement={RightBtn}>
      <Flatpickr
        className={classNames('date-picker', props.className)}
        onBlur={handleBlur}
        onFocus={handleFocus}
        options={{ disableMobile: true, ...options }}
        {...props}
        ref={combinedRefs as any}
      />
    </InputWrapper>
  );
});

DatePicker.displayName = 'DatePicker';

// https://flatpickr.js.org/options/
