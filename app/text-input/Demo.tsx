'use client';

import { TextInput } from '@libComponents/TextInput';
import React from 'react';

type Props = any;

export const DemoBasicInput = (props: Props) => {
  const [textInput, setTextInput] = React.useState('');
  console.log('textInput', textInput);
  return (
    <TextInput
      value={textInput}
      onChange={(e) => setTextInput(e.target.value)}
      wrapperProps={{ className: '!w-96' }}
      onClear={() => console.log('clear')}
      {...props}
    />
  );
};
