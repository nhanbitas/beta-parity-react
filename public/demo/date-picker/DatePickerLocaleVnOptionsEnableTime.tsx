'use client';
import React from 'react';
import { DatePicker } from 'beta-parity-react/ui/DatePicker';

type Props = any;

export const DatePickerLocaleVnOptionsEnableTime = (props: Props) => (
  <DatePicker
    locale='vn'
    options={{
      defaultDate: ['25/02/2025'],
      enableTime: true,
      enableSeconds: true,
      dateFormat: 'G:i K, \\ngà\\y d t\\há\\ng m \\nă\\m Y',
      ...props.options
    }}
    {...props}
  />
);
