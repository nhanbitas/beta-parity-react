'use client';
import React from 'react';
import { Slider } from 'beta-parity-react/ui/Slider';

const RangeSlider = (props: any) => {
  const handleChange = (event: any) => {
    console.log(event);
  };
  return (
    <div className='not-prose mb-4'>
      <Slider mode='range' step={1} onValueChange={handleChange} />
    </div>
  );
};
export { RangeSlider };
