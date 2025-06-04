'use client';
import React from 'react';
import { Textarea } from 'beta-parity-react/ui/Textarea';

type Props = any;

export const BasicTextArea = (props: Props) => (
  <Textarea
    wrapperProps={{ className: '!max-w-96', ...props.wrapperProps }}
    {...props}
    placeholder='Enter your message'
  />
);
