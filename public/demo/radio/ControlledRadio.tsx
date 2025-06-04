'use client';

import React from 'react';
import { Radio, RadioGroup } from 'beta-parity-react/ui/Radio';
import { Button } from 'beta-parity-react/ui/Button';

type Props = {};

export const ControlledRadio = (props: Props) => {
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
