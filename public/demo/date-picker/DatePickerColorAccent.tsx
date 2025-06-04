'use client';

import React from 'react';
import { DatePicker } from 'beta-parity-react/ui/DatePicker';

export const DatePickerColorAccent = () => {
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
      color='accent'
      onChange={handleChange}
    />
  );
};
