'use client';
import React from 'react';
import { TextInput } from 'beta-parity-react/ui/TextInput';
import { Box } from 'lucide-react';

export const DisabledClearableInputWithLeftIconAlternative = () => {
  return (
    <TextInput
      value='This is disabled text input'
      wrapperProps={{ className: '!w-96' }}
      isClearable
      disabled
      leftIcon={<Box />}
      placeholder='Placeholder'
      theme='alternative'
      onClear={() => {}}
    />
  );
};
