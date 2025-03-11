import * as React from 'react';
import './index.css';
import { Input } from '../BaseInput';

export interface FileInputProps extends React.ComponentPropsWithoutRef<typeof Input> {}

export const FileInput = React.forwardRef<React.ElementRef<typeof Input>, FileInputProps>(
  ({ type = 'file', ...props }, ref) => {
    return <Input ref={ref} type={type} {...props} />;
  }
);

FileInput.displayName = 'FileInput';
