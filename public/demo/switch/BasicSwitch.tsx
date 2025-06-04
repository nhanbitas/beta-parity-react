'use client';
import { Switch } from 'beta-parity-react/ui/Switch';
import React from 'react';
type Props = any;
export const BasicSwitch = (props: Props) => {
  return (
    <div className='flex flex-col gap-2'>
      <Switch {...props} switchSize='sm' onToggle={(isActive: boolean) => console.log(isActive)} />
      <Switch {...props} switchSize='md' onToggle={(isActive: boolean) => console.log(isActive)} />
      <Switch {...props} switchSize='lg' defaultActive onToggle={(isActive: boolean) => console.log(isActive)} />
    </div>
  );
};
