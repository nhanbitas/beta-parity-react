import * as React from 'react';
import './index.css';
import { Input } from '../BaseInput';

export interface PaginationProps extends React.ComponentPropsWithoutRef<typeof Input> {}

export const Pagination = React.forwardRef<React.ElementRef<typeof Input>, PaginationProps>(
  ({ type = 'file', ...props }, ref) => {
    return (
      <div ref={ref} {...props}>
        Pagination
      </div>
    );
  }
);

Pagination.displayName = 'Pagination';
