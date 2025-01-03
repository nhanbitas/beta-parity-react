import * as React from 'react';
import './index.css';
import { Input } from '../BaseInput';

export interface ProgressProps extends React.ComponentPropsWithoutRef<typeof Input> {}

export const Progress = React.forwardRef<React.ElementRef<typeof Input>, ProgressProps>(
  ({ type = 'file', ...props }, ref) => {
    return <Input ref={ref} type={type} {...props} />;
  }
);

Progress.displayName = 'Progress';
