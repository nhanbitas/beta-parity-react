import * as React from 'react';
import './index.css';
import { Input } from '../BaseInput';

export interface EmailInputProps extends React.ComponentPropsWithoutRef<typeof Input> {}

export const EmailInput = React.forwardRef<React.ElementRef<typeof Input>, EmailInputProps>(
  ({ type = 'email', ...props }, ref) => {
    return <Input ref={ref} type={type} {...props} />;
  }
);

EmailInput.displayName = 'EmailInput';
