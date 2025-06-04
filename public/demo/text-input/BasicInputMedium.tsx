'use client';
import React from 'react';
import { TextInput } from 'beta-parity-react/ui/TextInput';

export const BasicInputMedium = () => {
  const [textInput, setTextInput] = React.useState('');
  return (
    <TextInput
      value={textInput}
      onChange={(e) => setTextInput(e.target.value)}
      wrapperProps={{ className: '!w-96' }}
      inputSize='md'
      placeholder='Placeholder'
      onClear={() => setTextInput('')}
    />
  );
};
