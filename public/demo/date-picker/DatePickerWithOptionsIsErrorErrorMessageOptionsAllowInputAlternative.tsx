'use client';

import React from 'react';
import { DatePicker } from 'beta-parity-react/ui/DatePicker';

export const DatePickerWithOptionsIsErrorErrorMessageOptionsAllowInputAlternative = () => {
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
      isError
      errorMessage='This is a required field'
      options={{ allowInput: true }}
      theme='alternative'
      onChange={handleChange}
    />
  );
};
