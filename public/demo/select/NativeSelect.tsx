'use client';
import React from 'react';
import { SelectDivider, SelectItem, SelectGroup, Select } from 'beta-parity-react/ui/Select';
import { Car } from 'lucide-react';

const options = [
  { label: 'Choose option', value: '' },
  { label: 'Option 1', value: '1' },
  { label: 'Option 2', value: '2' },
  { label: 'Option 3', value: '3' },
  { label: 'Option 4', value: '4' },
  { label: 'Option 5', value: '5' },
  { label: 'Option 6', value: '6' },
  { label: 'Option 7', value: '7' },
  { label: 'Option 8', value: '8' }
];

export const NativeSelect = (props: any) => {
  return (
    <div className='not-prose flex flex-col gap-2'>
      <Select native options={options} selectSize='sm' onChange={(e: any) => console.log(e.target.value)} />
      <Select
        native
        theme='alternative'
        options={options}
        selectSize='md'
        onChange={(e: any) => console.log(e.target.value)}
      />
      <Select native disabled options={options} onChange={(e: any) => console.log(e.target.value)} />
      <Select
        native
        theme='alternative'
        disabled
        options={options}
        onChange={(e: any) => console.log(e.target.value)}
      />
      <Select native onChange={(e: any) => console.log(e.target.value)}>
        <SelectItem value='1'>Option 1</SelectItem>
        <SelectItem value='2' disabled>
          Option 2
        </SelectItem>
        <SelectItem value='3'>Option 3</SelectItem>
        <SelectItem value='4'>Option 4</SelectItem>
        <SelectItem value='5'>Option 5</SelectItem>
      </Select>
    </div>
  );
};
