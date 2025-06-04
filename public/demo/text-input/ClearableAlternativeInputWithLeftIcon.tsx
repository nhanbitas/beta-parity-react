'use client';
import React from 'react';
import { TextInput } from 'beta-parity-react/ui/TextInput';
import { Box } from 'lucide-react';

export const ClearableAlternativeInputWithLeftIcon = () => {
  const [textInput, setTextInput] = React.useState('');
  return (
    <TextInput
      value={textInput}
      onChange={(e) => setTextInput(e.target.value)}
      wrapperProps={{ className: '!w-96' }}
      isClearable
      leftIcon={<Box />}
      placeholder='Placeholder'
      theme='alternative'
      onClear={() => setTextInput('')}
    />
  );
};
