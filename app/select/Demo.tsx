'use client';

import React from 'react';
import { CustomSelect, NativeSelect } from '@libComponents/Select';

type Props = {};

const options = [
  { label: 'Choose option', value: '' },
  { label: 'Option 1', value: '1' },
  { label: 'Option 2', value: '2' },
  { label: 'Option 3', value: '3' },
  { label: 'Option 4', value: '4' },
  { label: 'Option 5', value: '5' }
];

export const DemoNativeSelect = (props: Props) => {
  return (
    <div className='not-prose flex flex-col gap-2'>
      <NativeSelect options={options} selectSize='sm' onChange={(e) => console.log(e.target.value)} />
      <NativeSelect options={options} selectSize='md' onChange={(e) => console.log(e.target.value)} />
      <NativeSelect options={options} selectSize='lg' onChange={(e) => console.log(e.target.value)} />

      <NativeSelect selectSize='lg' onChange={(e) => console.log(e.target.value)}>
        <option value=''>Choose option</option>
        <option value='1'>Option 1</option>
        <option value='2'>Option 2</option>
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
  return <CustomSelect options={options} labelSelect='Choose option' floatingLabel='Choose option' />;
};
