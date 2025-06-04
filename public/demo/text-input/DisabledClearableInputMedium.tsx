'use client';
import React from 'react';
import { TextInput } from 'beta-parity-react/ui/TextInput';

export const DisabledClearableInputMedium = () => {
  return (
    <TextInput
      value=''
      wrapperProps={{ className: '!w-96' }}
      isClearable
      disabled
      inputSize='md'
      placeholder='Placeholder'
      onClear={() => {}}
    />
  );
};
