'use client';
import React from 'react';
import { TextInput } from 'beta-parity-react/ui/TextInput';

export const DisabledClearableInput = () => {
  return (
    <TextInput
      value=''
      wrapperProps={{ className: '!w-96' }}
      isClearable
      disabled
      placeholder='Placeholder'
      onClear={() => {}}
    />
  );
};
