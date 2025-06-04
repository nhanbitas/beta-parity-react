'use client';
import React from 'react';
import { PasswordInput } from 'beta-parity-react/ui/PasswordInput';
import { KeyRound } from 'lucide-react';

export const BasicPasswordInputWithLeftIconAlternative = () => {
  const [password, setPassword] = React.useState('');
  return (
    <PasswordInput
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      wrapperProps={{ className: '!w-64' }}
      leftIcon={<KeyRound />}
      placeholder='Placeholder'
      theme='alternative'
    />
  );
};
