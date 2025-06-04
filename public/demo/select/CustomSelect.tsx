'use client';
import React from 'react';
import { Select, SelectItem } from 'beta-parity-react/ui/Select';
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

export const CustomSelect = (props: any) => {
  return (
    <div className='not-prose flex flex-col gap-2'>
      <Select
        onChange={(e) => console.log(e)}
        options={options}
        selectSize='sm'
        placeholder='Choose option'
        menuItemsLimit={5}
        scrollIndicator
        deselectable={true}
        leftIcon={<Car />}
        {...props}
      />
      <Select
        onChange={(e) => console.log(e)}
        placeholder='Choose option'
        filterable
        menuItemsLimit={5}
        scrollIndicator
        {...props}
      >
        <SelectItem value='1' label='Option 1' />
        <SelectItem value='2' label='Option 2' />
        <SelectItem value='3' label='Option 3' />
      </Select>
      <Select
        disabled
        onChange={(e) => console.log(e)}
        placeholder='Choose option'
        filterable
        menuItemsLimit={5}
        scrollIndicator
        {...props}
      >
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value} label={option.label} />
        ))}
      </Select>
      <Select
        onChange={(e) => console.log(e)}
        options={options}
        placeholder='Choose option'
        floatingLabel='Choose option'
        menuItemsLimit={5}
        scrollIndicator
        {...props}
      />
    </div>
  );
};
