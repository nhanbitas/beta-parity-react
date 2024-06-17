'use client';

import React from 'react';
import { NativeSelect } from '@libComponents/Select';

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
  return <NativeSelect options={options} />;
};

export const DemoNativeSelectLabel = (props: Props) => {
  return <NativeSelect floatingLabel='Choose option' options={options} />;
};
