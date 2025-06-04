'use client';

import React from 'react';
import { Radio, RadioGroup } from 'beta-parity-react/ui/Radio';

type Props = {};

export const GroupRadio = (props: any) => {
  const [value, setValue] = React.useState('radio-2');
  return (
    <>
      <RadioGroup
        label='This is a group'
        name={'group-neutral' + (props.type ?? '')}
        value={value}
        onChange={(value: any) => setValue(value)}
      >
        <Radio value='radio-1' label='Radio 1' sublabel='Sublabel radio 1' />
        <Radio value='radio-2' label='Radio 2' sublabel='Sublabel radio 2' />
        <Radio value='radio-3' label='Radio 3' sublabel='Sublabel radio 3' />
        <Radio value='radio-4' label='Radio 4' sublabel='Sublabel radio 4' />
      </RadioGroup>

      <RadioGroup
        label='This is a group'
        color='accent'
        name={'group-accent' + (props.type ?? '')}
        defaultValue='radio-2'
        onChange={(value) => console.log(value)}
      >
        <Radio value='radio-1' label='Radio 1' sublabel='Sublabel radio 1' />
        <Radio value='radio-2' label='Radio 2' sublabel='Sublabel radio 2' />
        <Radio value='radio-3' label='Radio 3' sublabel='Sublabel radio 3' />
        <Radio value='radio-4' label='Radio 4' sublabel='Sublabel radio 4' />
      </RadioGroup>

      <RadioGroup
        label='This is a disabled group'
        name={'group-disabled' + props.type}
        defaultValue='radio-1'
        disabled
        onChange={(value) => console.log(value)}
      >
        <Radio value='radio-1' label='Radio 1' sublabel='Sublabel radio 1' />
        <Radio value='radio-2' label='Radio 2' sublabel='Sublabel radio 2' />
        <Radio value='radio-3' label='Radio 3' sublabel='Sublabel radio 3' />
        <Radio value='radio-4' label='Radio 4' sublabel='Sublabel radio 4' />
      </RadioGroup>
    </>
  );
};
