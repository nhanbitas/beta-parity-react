'use client';

import { Switch } from 'beta-parity-react/ui/Switch';
import React from 'react';

type Props = any;

export const DemoBasicSwitch = (props: Props) => {
  return (
    <div className='flex flex-col gap-2'>
      <Switch {...props} switchSize='sm' onToggle={(isActive: boolean) => console.log(isActive)} />
      <Switch {...props} switchSize='md' onToggle={(isActive: boolean) => console.log(isActive)} />
      <Switch {...props} switchSize='lg' defaultActive onToggle={(isActive: boolean) => console.log(isActive)} />
    </div>
  );
};

export const DemoIconSwitch = (props: Props) => {
  return (
    <div className='flex flex-col gap-2'>
      <Switch {...props} switchSize='sm' icon onToggle={(isActive: boolean) => console.log(isActive)} />
      <Switch {...props} switchSize='md' icon onToggle={(isActive: boolean) => console.log(isActive)} />
      <Switch {...props} switchSize='lg' defaultActive icon onToggle={(isActive: boolean) => console.log(isActive)} />
    </div>
  );
};
