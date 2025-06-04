'use client';
import React from 'react';
import { Slider } from 'beta-parity-react/ui/Slider';

const marks = [{ value: 0 }, { value: 25 }, { value: 50 }, { value: 75 }, { value: 100 }];

const ReverseSlider = (props: any) => {
  const handleChange = (event: any) => {
    console.log(event);
  };
  return (
    <div className='not-prose mb-4 flex gap-20'>
      <Slider step={5} min={0} max={100} marks={marks} onValueChange={handleChange} indicatorSide='reverse' />
      <Slider
        mode='range'
        step={5}
        marks={marks}
        onValueChange={handleChange}
        orientation='vertical'
        indicatorSide='reverse'
      />
    </div>
  );
};
export { ReverseSlider };
