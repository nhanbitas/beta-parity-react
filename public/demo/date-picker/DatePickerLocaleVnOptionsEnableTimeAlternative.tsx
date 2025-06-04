'use client';

import React from 'react';
import { DatePicker } from 'beta-parity-react/ui/DatePicker';

export const DatePickerLocaleVnOptionsEnableTimeAlternative = () => {
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
      locale='vn'
      options={{
        defaultDate: ['25/02/2025'],
        enableTime: true,
        enableSeconds: true,
        dateFormat: 'G:i K, \\ngà\\y d t\\há\\ng m \\nă\\m Y'
      }}
      theme='alternative'
      onChange={handleChange}
    />
  );
};
