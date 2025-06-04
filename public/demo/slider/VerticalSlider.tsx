'use client';
import React from 'react';
import { Slider } from 'beta-parity-react/ui/Slider';

const VerticalSlider = (props: any) => {
  const handleChange = (event: any) => {
    console.log(event);
  };
  return (
    <div className='not-prose mb-4 flex gap-20'>
      <Slider step={25} min={0} max={100} onValueChange={handleChange} orientation='vertical' />
      <Slider mode='range' step={1} onValueChange={handleChange} orientation='vertical' />
    </div>
  );
};
export { VerticalSlider };
