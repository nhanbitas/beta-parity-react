'use client';

import React from 'react';
import { DatePicker } from 'beta-parity-react/ui/DatePicker';

type Props = any;

export const LabelDatePicker = (props: Props) => {
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
      locale={props.locale || 'default'}
      options={{ dateFormat: 'd/m/Y', weekNumbers: true }}
      floatingLabel='Select date'
      {...props}
    />
  );
};
