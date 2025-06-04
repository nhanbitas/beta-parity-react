'use client';
import React from 'react';
import { PasswordInput } from 'beta-parity-react/ui/PasswordInput';

export const DisabledClearablePasswordInputAccent = () => {
  const [password, setPassword] = React.useState('');
  return (
    <PasswordInput
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      wrapperProps={{ className: '!w-64' }}
      disabled
      isClearable
      color='accent'
      placeholder='Placeholder'
    />
  );
};
