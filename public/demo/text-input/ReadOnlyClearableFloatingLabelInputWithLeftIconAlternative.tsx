'use client';
import React from 'react';
import { TextInput } from 'beta-parity-react/ui/TextInput';
import { Box } from 'lucide-react';

export const ReadOnlyClearableFloatingLabelInputWithLeftIconAlternative = () => {
  return (
    <TextInput
      value='Text'
      wrapperProps={{ className: '!w-96' }}
      isClearable
      readOnly
      floatingLabel='Floating Label'
      leftIcon={<Box />}
      placeholder='Placeholder'
      theme='alternative'
      onClear={() => {}}
    />
  );
};
