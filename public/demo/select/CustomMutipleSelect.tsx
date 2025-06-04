'use client';
import React from 'react';
import { Select, SelectItem, SelectGroup, SelectDivider } from 'beta-parity-react/ui/Select';
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

export const CustomMutipleSelect = (props: any) => {
  return (
    <div className='not-prose flex flex-col gap-2'>
      <Select
        onChange={(e) => console.log(e)}
        options={options}
        placeholder='Choose option'
        multiselect
        filterable
        menuItemsLimit={5}
        scrollIndicator
        tagProps={{ color: 'accent' }}
        theme='alternative'
        {...props}
      />
      <Select
        onChange={(e) => console.log(e)}
        placeholder='Choose option'
        multiselect
        filterable
        menuItemsLimit={5}
        scrollIndicator
        theme='alternative'
        {...props}
      >
        <SelectItem value='1' label='Option 1' />
        <SelectItem value='2' label='Option 2' />
        <SelectItem value='3' label='Option 3' />
      </Select>
      <Select
        onChange={(e) => console.log(e)}
        placeholder='Choose option'
        multiselect
        filterable
        menuItemsLimit={5}
        scrollIndicator
        {...props}
      >
        {options.map(
          (option) => !!option.value && <SelectItem key={option.value} value={option.value} label={option.label} />
        )}
      </Select>
      <Select
        onChange={(e) => console.log(e)}
        placeholder='Choose option'
        multiselect
        filterable
        menuItemsLimit={5}
        scrollIndicator
        {...props}
      >
        <SelectGroup groupLabel='Group 1'>
          {options.map(
            (item) =>
              !!item.value && (
                <SelectItem
                  key={item.value + ' - 1'}
                  label={item.label + ' - 1'}
                  value={item.value + ' - 1'}
                  checkmarkSide='left'
                />
              )
          )}
        </SelectGroup>
        <SelectDivider />
        <SelectGroup groupLabel='Group 2'>
          {options.map(
            (item) =>
              !!item.value && (
                <SelectItem
                  key={item.value + ' - 2'}
                  label={item.label + ' - 2'}
                  value={item.value + ' - 2'}
                  checkmarkSide='left'
                />
              )
          )}
        </SelectGroup>
      </Select>
      <Select
        onChange={(e) => console.log(e)}
        options={options}
        placeholder='Choose option'
        floatingLabel='Choose option'
        countDescription='option(s) selected'
        menuItemsLimit={5}
        leftIcon={<Car />}
        keepOpen={false}
        deselectable={false}
        scrollIndicator
        multiselect
        clearButton
        {...props}
      />
    </div>
  );
};
