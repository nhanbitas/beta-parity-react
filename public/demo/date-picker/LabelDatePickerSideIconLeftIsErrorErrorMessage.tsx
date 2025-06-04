'use client';
import React from 'react';
import { DatePicker } from 'beta-parity-react/ui/DatePicker';

type Props = any;

export const LabelDatePickerSideIconLeftIsErrorErrorMessage = (props: Props) => (
  <DatePicker sideIcon='left' isError errorMessage='This is a required field' {...props} />
);
