'use client';
import React from 'react';
import { TextInput } from 'beta-parity-react/ui/TextInput';

export const ClearableAlternativeInput = () => {
  const [textInput, setTextInput] = React.useState('');
  return (
    <TextInput
      value={textInput}
      onChange={(e) => setTextInput(e.target.value)}
      wrapperProps={{ className: '!w-96' }}
      isClearable
      placeholder='Placeholder'
      theme='alternative'
      onClear={() => setTextInput('')}
    />
  );
};
