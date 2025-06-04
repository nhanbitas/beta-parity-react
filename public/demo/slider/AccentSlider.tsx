'use client';
import React from 'react';
import { Slider } from 'beta-parity-react/ui/Slider';

const marks = [{ value: 0 }, { value: 25 }, { value: 50 }, { value: 75 }, { value: 100 }];

const AccentSlider = (props: any) => {
  const handleChange = (event: any) => {
    console.log(event);
  };
  return (
    <div className='not-prose mb-4 flex gap-20'>
      <Slider
        step={25}
        min={0}
        max={100}
        onValueChange={handleChange}
        orientation='vertical'
        marks={marks}
        color='accent'
      />
      <Slider mode='range' step={1} onValueChange={handleChange} orientation='vertical' color='accent' />
    </div>
  );
};
export { AccentSlider };
