'use client';
import React from 'react';
import { PasswordInput } from 'beta-parity-react/ui/PasswordInput';

export const BasicPasswordInputAlternativeFloatingLabel = () => {
  const [password, setPassword] = React.useState('');
  return (
    <PasswordInput
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      wrapperProps={{ className: '!w-64' }}
      isClearable
      floatingLabel='Floating Label'
      theme='alternative'
    />
  );
};
