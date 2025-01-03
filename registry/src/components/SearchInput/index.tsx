import * as React from 'react';
import './index.css';
import { Input } from '../BaseInput';

export interface SearchInputProps extends React.ComponentPropsWithoutRef<typeof Input> {}

export const SearchInput = React.forwardRef<React.ElementRef<typeof Input>, SearchInputProps>(
  ({ type = 'search', ...props }, ref) => {
    return <Input ref={ref} type={type} {...props} />;
  }
);

SearchInput.displayName = 'SearchInput';
