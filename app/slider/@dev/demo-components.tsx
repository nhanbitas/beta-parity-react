'use client';

import React from 'react';
import { Slider } from 'beta-parity-react/ui/Slider';

type Props = {};

const marks = [
  { value: 0, label: '0' },
  { value: 25, label: '25' },
  { value: 50, label: '50' },
  { value: 75, label: '75' },
  { value: 100, label: '100' }
];

export const BasicSlider = (props: Props) => {
  const handleChange = (event: any) => {
    console.log(event);
  };

  return (
    <div className='not-prose mb-4'>
      <Slider step={25} min={0} max={100} marks={marks} onValueChange={handleChange} />
    </div>
  );
};

export const RangeSlider = (props: Props) => {
  const handleChange = (event: any) => {
    console.log(event);
  };

  return (
    <div className='not-prose mb-4'>
      <Slider mode='range' step={1} marks={marks} onValueChange={handleChange} />
    </div>
  );
};
