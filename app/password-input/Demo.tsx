import React from 'react';
import { PasswordInput } from '@libComponents/PasswordInput';

type Props = {};

export const DemoBasicPasswordInput = (props: any) => (
  <PasswordInput wrapperProps={{ className: '!w-64' }} {...props} />
);
