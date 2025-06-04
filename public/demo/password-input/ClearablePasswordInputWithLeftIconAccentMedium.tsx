'use client';
import React from 'react';
import { PasswordInput } from 'beta-parity-react/ui/PasswordInput';
import { KeyRound } from 'lucide-react';

export const ClearablePasswordInputWithLeftIconAccentMedium = () => {
  const [password, setPassword] = React.useState('');
  return (
    <PasswordInput
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      wrapperProps={{ className: '!w-64' }}
      isClearable
      leftIcon={<KeyRound />}
      color='accent'
      inputSize='md'
      placeholder='Placeholder'
    />
  );
};
