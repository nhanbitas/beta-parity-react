'use client';

import { Switch } from '@libComponents/Switch';
import React from 'react';

type Props = {};

export const DemoBasicSwitch = () => {
  return (
    <div className='flex flex-row gap-2'>
      <Switch switchSize='sm' onToggle={(isActive: boolean) => console.log(isActive)} />
      <Switch switchSize='md' onToggle={(isActive: boolean) => console.log(isActive)} />
      <Switch switchSize='lg' onToggle={(isActive: boolean) => console.log(isActive)} />
    </div>
  );
};

export const DemoIconSwitch = () => {
  return (
    <div className='flex flex-row gap-2'>
      <Switch switchSize='sm' icon onToggle={(isActive: boolean) => console.log(isActive)} />
      <Switch switchSize='md' icon onToggle={(isActive: boolean) => console.log(isActive)} />
      <Switch switchSize='lg' icon onToggle={(isActive: boolean) => console.log(isActive)} />
    </div>
  );
};
