'use client';

import React from 'react';
import { Radio } from 'beta-parity-react/ui/Radio';

type Props = {};

export const BasicRadio = (props: Props) => {
  return (
    <div className='flex flex-col gap-4'>
      <Radio value='radio-1' onChange={(e) => console.log(e.target.value)} />
      <Radio value='radio-2' label='Label' onChange={(e) => console.log(e.target.value)} />
      <Radio
        value='radio-3'
        label='Label'
        sublabel='This is a sublabel'
        onChange={(e) => console.log(e.target.checked)}
      />
      <Radio
        value='radio-4'
        label='Label'
        sublabel='This is a sublabel'
        disabled
        onChange={(value) => console.log(value)}
      />
      <Radio
        value='radio-5'
        label='Label'
        sublabel='This is a sublabel'
        checked
        disabled
        onChange={(value) => console.log(value)}
      />
    </div>
  );
};
