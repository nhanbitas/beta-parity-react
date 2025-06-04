'use client';
import React from 'react';
import { Select } from 'beta-parity-react/ui/Select';

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

export const NativeSelectLabel = (props: any) => {
  return (
    <Select native options={options} onChange={(e: any) => console.log(e.target.value)} floatingLabel='Choose option' />
  );
};
