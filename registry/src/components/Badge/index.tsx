import React from 'react';
import classNames from 'classnames';
import './variables.css';
import './index.css';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  children?: string | React.ReactNode;
  className?: string;
  color?: 'gray' | 'orange' | 'violet' | 'green' | 'red' | 'yellow' | 'blue' | 'lime' | 'cyan' | '';
  size?: 'md' | 'sm' | 'xs';
  dot?: boolean;
  variant?: 'filled' | 'outlined' | 'glass' | '';
}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, children, color = 'gray', size = 'md', variant = 'outlined', dot = false, ...props }, ref) => {
    return (
      <span className={classNames('badge', { dotted: dot }, className, variant, color, size)} ref={ref} {...props}>
        {children}
      </span>
    );
  }
);

Badge.displayName = 'Badge';

export { Badge };
