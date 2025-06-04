'use client';
import React from 'react';
import { DatePicker } from 'beta-parity-react/ui/DatePicker';

type Props = any;

export const DatePickerDisabledThemeAlternative = (props: Props) => (
  <DatePicker disabled theme='alternative' {...props} />
);
