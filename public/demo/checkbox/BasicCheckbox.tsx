'use client';

import React from 'react';
import { Checkbox } from 'beta-parity-react/ui/Checkbox';

export const BasicCheckbox = (props: {}) => {
  return (
    <div className='flex flex-col gap-4'>
      <Checkbox
        onChange={(e: any) => {
          console.log(e.target.checked);
        }}
      />
      <Checkbox label='With Label' />
      <Checkbox label='With Sublabel' sublabel='This is accent color' color='accent' />
      <Checkbox checked={true} label='Controlled Checkbox' sublabel='This is a Checkbox with checked = true' />
      <Checkbox label='Disabled Checkbox' sublabel='This is a disabled Checkbox' disabled />
      <Checkbox checked label='Disabled Checkbox' sublabel='This is a disabled Checkbox' disabled />
      <Checkbox
        checked
        label='Disabled Checkbox'
        sublabel='This is a disabled accent Checkbox'
        disabled
        color='accent'
      />
      <Checkbox
        label='Indeterminate Checkbox'
        sublabel='This is a Checkbox with indeterminate = true'
        indeterminate={true}
      />
    </div>
  );
};
