'use client';
import React from 'react';
import { DatePicker } from 'beta-parity-react/ui/DatePicker';

type Props = any;

export const DatePickerWithOptionsOptionsShowMonths2 = (props: Props) => (
  <DatePicker options={{ defaultDate: ['25/02/2025'], showMonths: 2, ...props.options }} {...props} />
);
