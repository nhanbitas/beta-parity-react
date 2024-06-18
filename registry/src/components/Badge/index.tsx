import React from 'react';
import classNames from 'classnames';
import './index.css';

export interface BadgeProps extends React.HTMLAttributes<HTMLElement> {
  asChild?: boolean;
  children?: string | React.ReactNode;
  className?: string;
  color?: 'gray' | 'orange' | 'sky' | 'violet' | 'green' | 'red' | 'yellow' | 'blue';
  size?: 'small' | 'medium' | 'large';
  variant?: 'strong' | '';
}

const Badge = React.forwardRef<HTMLElement, BadgeProps>(
  ({ className, children, color = 'gray', size = 'medium', variant = '', ...props }, ref) => {
    return (
      <span className={classNames('badge', className, variant, color, size)} ref={ref} {...props}>
        {children}
      </span>
    );
  }
);

Badge.displayName = 'Badge';

export { Badge };
