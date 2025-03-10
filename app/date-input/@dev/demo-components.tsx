'use client';

import { Textarea } from 'beta-parity-react/ui/Textarea';
import React from 'react';

type Props = any;

export const DemoBasicTextArea = (props: Props) => (
  <Textarea wrapperProps={{ className: '!w-96', ...props.wrapperProps }} {...props} placeholder='Enter your message' />
);
