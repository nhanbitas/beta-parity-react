'use client';

import React from 'react';
import { DatePicker } from 'beta-parity-react/ui/DatePicker';

export const DatePickerLocaleVnPlaceholderChonNgayAlternative = () => {
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
      theme='alternative'
      onChange={handleChange}
    />
  );
};
