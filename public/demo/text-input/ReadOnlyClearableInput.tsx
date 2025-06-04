'use client';
import React from 'react';
import { TextInput } from 'beta-parity-react/ui/TextInput';

export const ReadOnlyClearableInput = () => {
  return (
    <TextInput
      value='This is read only text input'
      wrapperProps={{ className: '!w-96' }}
      isClearable
      readOnly
      placeholder='Placeholder'
      onClear={() => {}}
    />
  );
};
