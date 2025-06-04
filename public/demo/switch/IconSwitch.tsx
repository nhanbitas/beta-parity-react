'use client';
import { Switch } from 'beta-parity-react/ui/Switch';
import React from 'react';
type Props = any;
export const IconSwitch = (props: Props) => {
  return (
    <div className='flex flex-col gap-2'>
      <Switch {...props} switchSize='sm' icon onToggle={(isActive: boolean) => console.log(isActive)} />
      <Switch {...props} switchSize='md' icon onToggle={(isActive: boolean) => console.log(isActive)} />
      <Switch {...props} switchSize='lg' defaultActive icon onToggle={(isActive: boolean) => console.log(isActive)} />
    </div>
  );
};
