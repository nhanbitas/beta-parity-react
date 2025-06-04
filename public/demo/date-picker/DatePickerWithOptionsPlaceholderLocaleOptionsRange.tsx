'use client';
import React from 'react';
import { DatePicker } from 'beta-parity-react/ui/DatePicker';

type Props = any;

export const DatePickerWithOptionsPlaceholderLocaleOptionsRange = (props: Props) => (
  <DatePicker
    placeholder='Chọn ngày'
    locale='vn'
    options={{ defaultDate: ['22/02/2025', '28/02/2025'], mode: 'range', ...props.options }}
    {...props}
  />
);
