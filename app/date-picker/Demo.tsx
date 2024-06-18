'use client';

import React from 'react';
import { DatePicker } from '@libComponents/DatePicker';
import { FloatingLabel } from '@libComponents/FloatingLabel';

type Props = {};

export const DemoDatePicker = (props: Props) => {
  const [date, setDate] = React.useState(new Date());

  const handleChange = (date: any) => {
    console.log(date);
    setDate(date);
  };

  return (
    <DatePicker id='input-1' value={date} onChange={handleChange} options={{ dateFormat: 'd/m/Y', static: true }} />
  );
};

export const DemoLabelDatePicker = (props: Props) => {
  const [date, setDate] = React.useState(new Date());

  const handleChange = (date: any) => {
    console.log(date);
    setDate(date);
  };

  return (
    <FloatingLabel label='Date Picker'>
      <DatePicker id='input-1' value={date} onChange={handleChange} options={{ dateFormat: 'd/m/Y', static: true }} />
    </FloatingLabel>
  );
};
