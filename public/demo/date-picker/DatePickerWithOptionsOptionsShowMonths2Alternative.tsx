'use client';

import React from 'react';
import { DatePicker } from 'beta-parity-react/ui/DatePicker';

export const DatePickerWithOptionsOptionsShowMonths2Alternative = () => {
  const handleChange = (...args: any) => {
    console.log(args[0]);
  };

  return (
    <DatePicker
      wrapperProps={{
        style: {
          width: '626px'
        }
      }}
      options={{ defaultDate: ['25/02/2025'], showMonths: 2 }}
      theme='alternative'
      onChange={handleChange}
    />
  );
};
