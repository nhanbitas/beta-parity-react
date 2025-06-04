'use client';
import React from 'react';
import { TextInput } from 'beta-parity-react/ui/TextInput';

export const ClearableFloatingLabelInputAlternative = () => {
  const [textInput, setTextInput] = React.useState('');
  return (
    <TextInput
      value={textInput}
      onChange={(e) => setTextInput(e.target.value)}
      wrapperProps={{ className: '!w-96' }}
      isClearable
      floatingLabel='Floating Label'
      placeholder='Placeholder'
      theme='alternative'
      onClear={() => setTextInput('')}
    />
  );
};
