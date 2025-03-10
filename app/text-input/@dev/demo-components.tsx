'use client';

import { TextInput } from 'beta-parity-react/ui/TextInput';
import React from 'react';

type Props = any;

export const DemoBasicInput = (props: Props) => {
  const [textInput, setTextInput] = React.useState('');
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
