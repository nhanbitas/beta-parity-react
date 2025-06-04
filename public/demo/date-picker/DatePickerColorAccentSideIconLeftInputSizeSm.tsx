'use client';

import React from 'react';
import { DatePicker } from 'beta-parity-react/ui/DatePicker';

export const DatePickerColorAccentSideIconLeftInputSizeSm = () => {
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
      sideIcon='left'
      inputSize='sm'
      onChange={handleChange}
    />
  );
};
