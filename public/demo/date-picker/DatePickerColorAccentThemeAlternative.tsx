'use client';
import React from 'react';
import { DatePicker } from 'beta-parity-react/ui/DatePicker';

type Props = any;

export const DatePickerColorAccentThemeAlternative = (props: Props) => (
  <DatePicker color='accent' theme='alternative' {...props} />
);
