'use client';
import React from 'react';
import { DatePicker } from 'beta-parity-react/ui/DatePicker';

type Props = any;

export const DatePickerWithOptionsIsErrorErrorMessageOptionsAllowInput = (props: Props) => (
  <DatePicker
    isError
    errorMessage='This is a required field'
    options={{ allowInput: true, ...props.options }}
    {...props}
  />
);
