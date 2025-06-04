'use client';

import React from 'react';
import { DatePicker } from 'beta-parity-react/ui/DatePicker';

export const DatePickerWithOptionsPlaceholderLocaleOptionsRangeAlternative = () => {
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
      placeholder='Chọn ngày'
      locale='vn'
      options={{ defaultDate: ['22/02/2025', '28/02/2025'], mode: 'range' }}
      theme='alternative'
      onChange={handleChange}
    />
  );
};
