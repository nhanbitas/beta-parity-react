'use client';

import React from 'react';
import { DatePicker } from '@libComponents/DatePicker';
import { Button } from '@libComponents/Button';

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

export const DemoControlledDatePicker = (props: Props) => {
  const [value, setValue] = React.useState<any[]>(['25/02/2025']);

  const handleChange = (...args: any) => {
    setValue([args[1]]);
  };

  const hanldeReset = () => {
    setValue(['25/02/2025']);
  };

  return (
    <div>
      <DatePicker
        value={value}
        defaultValue={value}
        wrapperProps={{
          style: {
            width: '626px'
          }
        }}
        placeholder='Select date'
        locale={props.locale || 'default'}
        options={{
          dateFormat: 'd/m/Y',
          onChange: handleChange,
          static: true,
          allowInput: true,
          ...props.options
        }}
        {...props}
      />
      <Button className='mt-2' onClick={hanldeReset}>
        Reset
      </Button>
    </div>
  );
};
