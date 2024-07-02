'use client';

import React from 'react';
import { DatePicker } from '@libComponents/DatePicker';

type Props = {};

export const DemoDatePicker = (props: Props) => {
  const [date, setDate] = React.useState('');

  const handleChange = (date: any) => {
    console.log(date);
    setDate(date);
  };

  return (
    <DatePicker
      value={date}
      onChange={handleChange}
      options={{ dateFormat: 'd/m/Y', static: true, allowInput: true }}
    />
  );
};

export const DemoLabelDatePicker = (props: Props) => {
  const [date, setDate] = React.useState('');

  const handleChange = (selectedDates: any, dateStr: any, instance: any) => {
    setDate(dateStr);
  };

  return (
    <DatePicker value={date} onChange={handleChange} options={{ dateFormat: 'd/m/Y' }} floatingLabel='Choose date' />
  );
};
