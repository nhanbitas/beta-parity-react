'use client';

import React from 'react';
import { Slider } from 'beta-parity-react/ui/Slider';

type Props = {};

const marks = [{ value: 0 }, { value: 25 }, { value: 50 }, { value: 75 }, { value: 100 }];

export const BasicSlider = (props: Props) => {
  const handleChange = (event: any) => {
    console.log(event);
  };

  return (
    <div className='not-prose mb-4'>
      <Slider step={25} min={0} max={100} onValueChange={handleChange} />
    </div>
  );
};

export const RangeSlider = (props: Props) => {
  const handleChange = (event: any) => {
    console.log(event);
  };

  return (
    <div className='not-prose mb-4'>
      <Slider mode='range' step={1} onValueChange={handleChange} />
    </div>
  );
};

export const VerticalSlider = (props: Props) => {
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

export const ReverseSlider = (props: Props) => {
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

export const TooltipSlider = (props: Props) => {
  const handleChange = (event: any) => {
    console.log(event);
  };

  return (
    <div className='not-prose mb-4 flex gap-20'>
      <Slider step={25} min={0} max={100} marks={marks} onValueChange={handleChange} indicator='tooltip' />
      <Slider
        mode='range'
        step={1}
        marks={marks}
        onValueChange={handleChange}
        orientation='vertical'
        indicator='tooltip'
      />
    </div>
  );
};

export const AccentSlider = (props: Props) => {
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

export const DisabledSlider = (props: Props) => {
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
        defaultValue={25}
        marks={marks}
        color='accent'
        disabled={true}
      />
      <Slider mode='range' step={1} onValueChange={handleChange} orientation='vertical' disabled={true} />
    </div>
  );
};
