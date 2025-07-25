'use client';
import React from 'react';
import { PasswordInput } from 'beta-parity-react/ui/PasswordInput';
import { KeyRound } from 'lucide-react';

export const DisabledClearablePasswordInputWithLeftIconDefaultShownAlternativeFloatingLabel = () => {
  const [password, setPassword] = React.useState('Password');
  return (
    <PasswordInput
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      wrapperProps={{ className: '!w-64' }}
      disabled
      isClearable
      placeholder='Placeholder'
      leftIcon={<KeyRound />}
      defaultHidden={false}
      floatingLabel='Floating Label'
      theme='alternative'
    />
  );
};
