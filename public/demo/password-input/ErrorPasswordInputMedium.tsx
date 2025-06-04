'use client';
import React from 'react';
import { PasswordInput } from 'beta-parity-react/ui/PasswordInput';

export const ErrorPasswordInputMedium = () => {
  const [password, setPassword] = React.useState('');
  return (
    <PasswordInput
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      wrapperProps={{ className: '!w-64' }}
      isError={true}
      errorMessage='Error message'
      isClearable
      inputSize='md'
      placeholder='Placeholder'
    />
  );
};
