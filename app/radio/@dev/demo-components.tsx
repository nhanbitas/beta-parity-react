'use client';

import React from 'react';
import { Radio, RadioGroup } from '@libComponents/Radio';
import { Button } from '@libComponents/Button';

type Props = {};

export const DemoBasicRadio = (props: Props) => {
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

export const DemoGroupRadio = (props: any) => {
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

export const DemoControlledRadio = (props: Props) => {
  const [groupValue, setGroupValue] = React.useState('radio-2');

  function getRandomNumber() {
    return Math.floor(Math.random() * 5) + 1;
  }

  const setRandomValue = () => {
    setGroupValue('radio-' + getRandomNumber());
  };

  return (
    <>
      <Button className='w-48' onClick={setRandomValue}>
        Random value
      </Button>
      <p>Group value: {groupValue}</p>
      <RadioGroup
        label='This is a controlled group'
        name='controlled-group'
        value={groupValue}
        onChange={(value: any) => setGroupValue(value)}
      >
        <Radio value='radio-1' label='Radio 1' />
        <Radio value='radio-2' label='Radio 2' />
        <Radio value='radio-3' label='Radio 3' />
        <Radio value='radio-4' label='Radio 4' />
        <Radio value='radio-5' label='Radio 5' />
      </RadioGroup>
    </>
  );
};

const items = [
  { label: 'Item 1', value: 'item-1' },
  { label: 'Item 2', value: 'item-2' },
  { label: 'Item 3', value: 'item-3' },
  { label: 'Item 4', value: 'item-4' },
  { label: 'Item 5', value: 'item-5', sublabel: 'Sublabel item 5' }
];

export const DemoRadioItems = (props: Props) => {
  return (
    <>
      <RadioGroup
        label='This is a group generated from items array'
        name='group-items'
        defaultValue='item-3'
        items={items}
        onChange={(value) => console.log(value)}
      />
    </>
  );
};
