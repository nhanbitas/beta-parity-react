'use client';

import React from 'react';
import { DatePicker } from 'beta-parity-react/ui/DatePicker';
import { Button } from 'beta-parity-react/ui/Button';

type Props = any;

export const ControlledDatePicker = (props: Props) => {
  const [value, setValue] = React.useState<any[]>(['']);
  const [error, setError] = React.useState<string>('');

  const handleChange = (...args: any) => {
    const date = args[0] || null;
    setValue(date);
    setError(date ? '' : 'Date is required');
  };

  const handleReset = () => {
    setValue(['']);
    setError('');
  };

  const handleInputValidation = (e: React.ChangeEvent<HTMLInputElement>, intance: any) => {
    const inputValue = e.target.value;
    const [day, month, year] = inputValue.split('-');
    const isValidDate = day && month && year && !isNaN(+day) && !isNaN(+month) && !isNaN(+year);
    if (!isValidDate || day.length < 2 || month.length < 2 || year.length < 4) return;

    const inputDate = new Date(+year, +month - 1, +day);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (inputDate < today) {
      setValue([new Date()]); // minDate = 'today'
      setError(`Date must be in the future, ${inputValue} is not valid date`);
      intance.close();
    }
  };

  return (
    <div>
      <DatePicker
        value={value}
        wrapperProps={{
          style: {
            width: '626px'
          }
        }}
        isError={Boolean(error)}
        errorMessage={error}
        placeholder='Select date'
        onInputChange={handleInputValidation}
        options={{
          dateFormat: 'd-m-Y',
          minDate: 'today',
          onChange: handleChange,
          static: true,
          allowInput: true,
          mode: 'single',
          ...props.options
        }}
        {...props}
      />
      <Button className='mt-2' onClick={handleReset}>
        Reset
      </Button>
    </div>
  );
};
