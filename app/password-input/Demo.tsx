'use client';

import React from 'react';
import { PasswordInput } from '@libComponents/PasswordInput';

type Props = {};

export const DemoBasicPasswordInput = (props: any) => {
  const [password, setPassword] = React.useState('');
  console.log('password', password);
  return (
    <PasswordInput
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      wrapperProps={{ className: '!w-64' }}
      {...props}
    />
  );
};
