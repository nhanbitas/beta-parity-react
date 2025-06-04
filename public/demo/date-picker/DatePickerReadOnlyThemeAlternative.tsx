'use client';
import React from 'react';
import { DatePicker } from 'beta-parity-react/ui/DatePicker';

type Props = any;

export const DatePickerReadOnlyThemeAlternative = (props: Props) => (
  <DatePicker readOnly theme='alternative' {...props} />
);
