import React from 'react';
import classNames from 'classnames';
import './index.css';
import { sizeMap } from '../constant';

export interface SpinnerProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant: 'circle-01' | 'circle-02' | 'logo-01' | 'logo-02' | 'logo-03' | 'logo-04';
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const Spinner = React.forwardRef<HTMLSpanElement, SpinnerProps>(
  ({ className, variant = 'circle-01', size = 'md', ...props }, ref) => {
    const classType = `spinner-${variant}`;
    return (
      <span
        className={classNames('spinner-svg', className, classType, size && sizeMap[size])}
        ref={ref}
        {...props}
      ></span>
    );
  }
);

Spinner.displayName = 'Spinner';

export { Spinner };
