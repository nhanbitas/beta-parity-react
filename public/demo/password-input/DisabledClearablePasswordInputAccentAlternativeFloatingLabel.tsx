'use client';
import React from 'react';
import { PasswordInput } from 'beta-parity-react/ui/PasswordInput';

export const DisabledClearablePasswordInputAccentAlternativeFloatingLabel = () => {
  const [password, setPassword] = React.useState('Password');
  return (
    <PasswordInput
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      wrapperProps={{ className: '!w-64' }}
      disabled
      isClearable
      color='accent'
      floatingLabel='Floating Label'
      theme='alternative'
    />
  );
};
