'use client';

import { TextInput } from '@libComponents/TextInput';
import React from 'react';

type Props = any;

export const DemoBasicInput = (props: Props) => (
  <TextInput wrapperProps={{ className: '!w-96' }} {...props} clearBtnProps={{ onClick: () => console.log('clear') }} />
);
