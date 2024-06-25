import React from 'react';
import classNames from 'classnames';
import './index.css';
import Base from '../Base';

export interface BadgeProps extends React.HTMLAttributes<HTMLElement> {
  children?: string | React.ReactNode;
  className?: string;
  color?: 'gray' | 'orange' | 'sky' | 'violet' | 'green' | 'red' | 'yellow' | 'blue';
  size?: 'small' | 'medium' | 'large';
  variant?: 'strong' | '';
  component?: any;
}

const Badge = React.forwardRef<HTMLElement, BadgeProps>(
  ({ className, children, color = 'gray', size = 'medium', variant = '', component = 'span', ...props }, ref) => {
    return (
      <Base component={component} className={classNames('badge', className, variant, color, size)} ref={ref} {...props}>
        {children}
      </Base>
    );
  }
);

Badge.displayName = 'Badge';

export { Badge };
