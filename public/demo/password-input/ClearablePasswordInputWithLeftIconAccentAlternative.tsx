'use client';
import React from 'react';
import { PasswordInput } from 'beta-parity-react/ui/PasswordInput';
import { KeyRound } from 'lucide-react';

export const ClearablePasswordInputWithLeftIconAccentAlternative = () => {
  const [password, setPassword] = React.useState('');
  return (
    <PasswordInput
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      wrapperProps={{ className: '!w-64' }}
      isClearable
      leftIcon={<KeyRound />}
      color='accent'
      placeholder='Placeholder'
      theme='alternative'
    />
  );
};
