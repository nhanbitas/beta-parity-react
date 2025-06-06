import React from 'react';
import './index.css';
import { Input } from '../BaseInput';

export interface DateInputProps extends React.ComponentPropsWithoutRef<typeof Input> {}

export const DateInput = React.forwardRef<React.ElementRef<typeof Input>, DateInputProps>(
  ({ type = 'date', ...props }, ref) => {
    return <Input ref={ref} type={type} {...props} />;
  }
);

DateInput.displayName = 'DateInput';
