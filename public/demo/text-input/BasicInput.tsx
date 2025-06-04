'use client';
import React from 'react';
import { TextInput } from 'beta-parity-react/ui/TextInput';

type Props = any;

export const BasicInput = (props: Props) => {
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
