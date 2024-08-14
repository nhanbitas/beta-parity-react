'use client';

import React from 'react';
import { CustomSelect, NativeSelect, SelectDivider, SelectItem, SelectGroup } from '@libComponents/Select';

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
      <NativeSelect disabled options={options} selectSize='sm' onChange={(e) => console.log(e.target.value)} />
      <NativeSelect options={options} selectSize='md' onChange={(e) => console.log(e.target.value)} />
      <NativeSelect options={options} selectSize='lg' onChange={(e) => console.log(e.target.value)} />

      <NativeSelect selectSize='lg' onChange={(e) => console.log(e.target.value)}>
        <option value=''>Choose option</option>
        <option value='1'>Option 1</option>
        <option value='2' disabled>
          Option 2
        </option>
        <option value='3'>Option 3</option>
        <option value='4'>Option 4</option>
        <option value='5'>Option 5</option>
      </NativeSelect>
    </div>
  );
};

export const DemoNativeSelectLabel = (props: Props) => {
  return <NativeSelect options={options} onChange={(e) => console.log(e.target.value)} floatingLabel='Choose option' />;
};

export const DemoCustomSelect = (props: Props) => {
  return (
    <>
      <CustomSelect
        onChange={(e) => console.log(e)}
        options={options}
        placeHolder='Choose option'
        overflowLimit={5}
        scrollIndicator
      />
      <CustomSelect
        onChange={(e) => console.log(e)}
        placeHolder='Choose option'
        filterable
        overflowLimit={5}
        scrollIndicator
      >
        <SelectItem value='' label='Choose option' />
        <SelectItem value='1' label='Option 1' />
        <SelectItem value='2' label='Option 2' />
        <SelectItem value='3' label='Option 3' />
      </CustomSelect>

      <CustomSelect
        disabled
        onChange={(e) => console.log(e)}
        placeHolder='Choose option'
        filterable
        overflowLimit={5}
        scrollIndicator
      >
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value} label={option.label} />
        ))}
      </CustomSelect>
      <CustomSelect
        onChange={(e) => console.log(e)}
        options={options}
        placeHolder='Choose option'
        floatingLabel='Choose option'
        filterable
        overflowLimit={5}
        scrollIndicator
      />
    </>
  );
};

export const DemoCustomMutipleSelect = (props: Props) => {
  return (
    <>
      <CustomSelect
        onChange={(e) => console.log(e)}
        options={options}
        placeHolder='Choose option'
        multiSelect
        filterable
        overflowLimit={5}
        scrollIndicator
      />

      <CustomSelect
        onChange={(e) => console.log(e)}
        placeHolder='Choose option'
        multiSelect
        filterable
        overflowLimit={5}
        scrollIndicator
      >
        <SelectItem value='' label='Choose option' />
        <SelectItem value='1' label='Option 1' />
        <SelectItem value='2' label='Option 2' />
        <SelectItem value='3' label='Option 3' />
      </CustomSelect>

      <CustomSelect
        onChange={(e) => console.log(e)}
        placeHolder='Choose option'
        multiSelect
        filterable
        overflowLimit={5}
        scrollIndicator
      >
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value} label={option.label} />
        ))}
      </CustomSelect>

      <CustomSelect
        onChange={(e) => console.log(e)}
        placeHolder='Choose option'
        multiSelect
        filterable
        overflowLimit={5}
        scrollIndicator
      >
        <SelectGroup groupValue='Group 1'>
          {options.map(
            (item) =>
              !!item.value && (
                <SelectItem
                  key={item.value + ' - 1'}
                  label={item.label + ' - 1'}
                  value={item.value + ' - 1'}
                  checkmarkSide='left'
                  name='Group 1'
                  useInput='checkbox'
                />
              )
          )}
        </SelectGroup>
        <SelectDivider />
        <SelectGroup groupValue='Group 2'>
          {options.map(
            (item: any) =>
              !!item.value && (
                <SelectItem
                  key={item.value + ' - 2'}
                  label={item.label + ' - 2'}
                  value={item.value + ' - 2'}
                  checkmarkSide='left'
                  name='Group 2'
                  useInput='checkbox'
                />
              )
          )}
        </SelectGroup>
      </CustomSelect>

      <CustomSelect
        onChange={(e) => console.log(e)}
        options={options}
        placeHolder='Choose option'
        floatingLabel='Choose option'
        countDescription='option(s) selected'
        overflowLimit={5}
        isStatic
        deselectable
        scrollIndicator
        multiSelect
        filterable
        clearButton
      />
    </>
  );
};
