'use client';

import React from 'react';
import { DatePicker } from 'beta-parity-react/ui/DatePicker';

type Props = any;

export const DatePicker_ = (props: Props) => {
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
      placeholder='Select date'
      locale={props.locale || 'default'}
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

export { DatePicker_ as DatePicker };
