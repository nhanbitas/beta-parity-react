'use client';

import React from 'react';
import './index.css';
import '../Input/index.css';
import classNames from 'classnames';
import Flatpickr, { DateTimePickerProps } from 'react-flatpickr';
import { InputWrapper } from '../Input';
import { Calendar } from 'lucide-react';

export interface DatePikerProps extends DateTimePickerProps {}

export const DatePicker = React.forwardRef<HTMLInputElement, DatePikerProps>((props, ref) => {
  const RightBtn = (
    <span className='date-picker-calendar-button'>
      <Calendar />
    </span>
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
        {...props}
        ref={ref as any}
      />
    </InputWrapper>
  );
});

DatePicker.displayName = 'DatePicker';

// https://flatpickr.js.org/options/
