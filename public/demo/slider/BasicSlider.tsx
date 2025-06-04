'use client';
import React from 'react';
import { Slider } from 'beta-parity-react/ui/Slider';

const BasicSlider = (props: any) => {
  const handleChange = (event: any) => {
    console.log(event);
  };
  return (
    <div className='not-prose mb-4'>
      <Slider step={25} min={0} max={100} onValueChange={handleChange} />
    </div>
  );
};
export { BasicSlider };
