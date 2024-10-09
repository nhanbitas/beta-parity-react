'use client';

import * as React from 'react';
import './index.css';
import { Input } from '../Input';

export interface TextInputProps extends React.ComponentPropsWithoutRef<typeof Input> {}

const TextInput = React.forwardRef<
  React.ElementRef<typeof Input>,
  React.ComponentPropsWithoutRef<typeof Input> & TextInputProps
>(({ type = 'text', ...props }, ref) => {
  return <Input ref={ref} type={type} {...props} />;
});

TextInput.displayName = 'TextInput';

export { TextInput };
