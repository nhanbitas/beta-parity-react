'use client';

import React from 'react';
import { DatePicker } from '@libComponents/DatePicker';

type Props = any;

export const DemoDatePicker = (props: Props) => {
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
        static: true,
        allowInput: true,
        ...props.options
      }}
      {...props}
    />
  );
};

export const DemoDatePickerWithOptions = (props: Props) => {
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
      {...props}
    />
  );
};

export const DemoLabelDatePicker = (props: Props) => {
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
