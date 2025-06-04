'use client';
import React from 'react';
import { TextInput } from 'beta-parity-react/ui/TextInput';

export const ReadOnlyClearableFloatingLabelInput = () => {
  return (
    <TextInput
      value='Text'
      wrapperProps={{ className: '!w-96' }}
      isClearable
      readOnly
      floatingLabel='Floating Label'
      placeholder='Placeholder'
      onClear={() => {}}
    />
  );
};
