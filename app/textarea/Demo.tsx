'use client';

import { Textarea } from '@libComponents/TextArea';
import React from 'react';

type Props = any;

export const DemoBasicTextArea = (props: Props) => (
  <Textarea
    wrapperProps={{ className: '!max-w-96', ...props.wrapperProps }}
    {...props}
    placeholder='Enter your message'
  />
);
