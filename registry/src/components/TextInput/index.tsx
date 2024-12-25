import * as React from 'react';
import './index.css';
import { Input } from '../BaseInput';

export interface TextInputProps extends React.ComponentPropsWithoutRef<typeof Input> {}

export const TextInput = React.forwardRef<React.ElementRef<typeof Input>, TextInputProps>(
  ({ type = 'text', ...props }, ref) => {
    return <Input ref={ref} type={type} {...props} />;
  }
);

TextInput.displayName = 'TextInput';
