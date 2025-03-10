'use client';

import React from 'react';
import { DatePicker } from 'beta-parity-react/ui/DatePicker';
import { Button } from 'beta-parity-react/ui/Button';
import { Select } from 'beta-parity-react/ui/Select';

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
        dateFormat: 'd/m/Y',
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

const CustomSelect = (props: any) => {
  const [select, setSelect] = React.useState<string>('');
  const handleChange = (e: any) => {
    const value = e.target.value;
    setSelect(value);
  };

  React.useEffect(() => {
    if (select) {
      const [start, end] = select.split(' to ');
      props.setValue?.([start, end]);
    } else {
      props.setValue?.(['']);
    }
  }, [select]);
  return (
    <Select value={select} native onChange={handleChange} selectSize='sm' theme='alternative'>
      <option value=''>Select range</option>
      <option value='03-05-2025 to 06-05-2025'>03-05-2025 to 06-05-2025</option>
      <option value='06-05-2025 to 09-05-2025'>06-05-2025 to 09-05-2025</option>
      <option value='09-05-2025 to 12-05-2025'>09-05-2025 to 12-05-2025</option>
    </Select>
  );
};

export const DemoSelectDatePicker = (props: Props) => {
  const [value, setValue] = React.useState<any[]>(['']);

  return (
    <div>
      <DatePicker
        value={value}
        wrapperProps={{
          style: {
            width: '626px'
          }
        }}
        placeholder='Select date'
        calenderHeader={<CustomSelect setValue={setValue} />}
        options={{
          dateFormat: 'd-m-Y',
          mode: 'range',
          ...props.options
        }}
        {...props}
      />
    </div>
  );
};
