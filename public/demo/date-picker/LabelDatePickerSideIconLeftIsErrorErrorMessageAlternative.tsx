'use client';

import React from 'react';
import { DatePicker } from 'beta-parity-react/ui/DatePicker';

export const LabelDatePickerSideIconLeftIsErrorErrorMessageAlternative = () => {
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
      onChange={handleChange}
      locale='default'
      options={{ dateFormat: 'd/m/Y', weekNumbers: true }}
      floatingLabel='Select date'
      sideIcon='left'
      isError
      errorMessage='This is a required field'
      theme='alternative'
    />
  );
};
