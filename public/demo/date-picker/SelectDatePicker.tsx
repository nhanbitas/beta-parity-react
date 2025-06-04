'use client';

import React from 'react';
import { DatePicker } from 'beta-parity-react/ui/DatePicker';
import { Select } from 'beta-parity-react/ui/Select';

type Props = any;

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

export const SelectDatePicker = (props: Props) => {
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
