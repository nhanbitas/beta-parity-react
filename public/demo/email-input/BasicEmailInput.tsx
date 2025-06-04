'use client';

import { MailOpen } from 'lucide-react';
import { EmailInput } from 'beta-parity-react/ui/EmailInput';
import React from 'react';

type Props = any;

export const BasicEmailInput = (props: Props) => (
  <EmailInput
    placeholder='example@domain.com'
    leftIcon={<MailOpen />}
    wrapperProps={{ className: '!max-w-96', ...props.wrapperProps }}
    {...props}
  />
);
