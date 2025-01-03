'use client';

import { TextArea } from '@libComponents/TextArea';
import React from 'react';

type Props = any;

export const DemoBasicTextArea = (props: Props) => (
  <TextArea wrapperProps={{ className: '!w-96', ...props.wrapperProps }} {...props} placeholder='Enter your message' />
);
