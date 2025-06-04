'use client';
import React from 'react';
import { TextInput } from 'beta-parity-react/ui/TextInput';
import { Box } from 'lucide-react';

export const DisabledClearableInputWithLeftIconMedium = () => {
  return (
    <TextInput
      value='This is disabled text input'
      wrapperProps={{ className: '!w-96' }}
      isClearable
      disabled
      inputSize='md'
      leftIcon={<Box />}
      placeholder='Placeholder'
      onClear={() => {}}
    />
  );
};
