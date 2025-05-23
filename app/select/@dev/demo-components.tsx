'use client';

import React from 'react';
import { SelectDivider, SelectItem, SelectGroup, Select } from 'beta-parity-react/ui/Select';
import { Car } from 'lucide-react';

type Props = {};

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

export const DemoNativeSelect = (props: Props) => {
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

export const DemoNativeSelectLabel = (props: any) => {
  return (
    <Select native options={options} onChange={(e: any) => console.log(e.target.value)} floatingLabel='Choose option' />
  );
};

export const DemoCustomSelect = (props: any) => {
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

export const DemoCustomMutipleSelect = (props: any) => {
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
        tagProps={{
          color: 'accent'
        }}
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
            (item: any) =>
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
