'use client';

import React from 'react';
import { DatePicker } from '@libComponents/DatePicker';

type Props = any;

export const DemoDatePicker = (props: Props) => {
  const [date, setDate] = React.useState(new Date('2025-02-24'));

  const handleChange = (date: any) => {
    console.log(date);
    setDate(date);
  };

  return (
    <DatePicker
      value={date}
      wrapperProps={{
        style: {
          width: '312px'
        }
      }}
      onChange={handleChange}
      options={{
        dateFormat: 'd/m/Y',
        static: true,
        allowInput: true,
        ...props.options
      }}
      {...props}
    />
  );
};

export const DemoDatePickerWithOptions = (props: Props) => {
  const [date, setDate] = React.useState(new Date('2025-02-24'));

  const handleChange = (date: any) => {
    console.log(date);
    setDate(date);
  };

  return (
    <DatePicker
      wrapperProps={{
        style: {
          width: '626px'
        }
      }}
      value={date}
      onChange={handleChange}
      {...props}
    />
  );
};

export const DemoLabelDatePicker = (props: Props) => {
  return (
    <DatePicker
      wrapperProps={{
        style: {
          width: '353px'
        }
      }}
      options={{ dateFormat: 'd/m/Y', weekNumbers: true }}
      floatingLabel='Choose date'
      {...props}
    />
  );
};
