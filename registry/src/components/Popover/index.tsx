import React from 'react';
import classNames from 'classnames';
import './index.css';
import './variables.css';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  children?: string | React.ReactNode;
  className?: string;
  label?: string;
  icon?: React.ReactNode;
  color?: 'gray' | 'orange' | 'violet' | 'green' | 'red' | 'yellow' | 'blue' | 'lime' | 'cyan' | '';
  size?: 'md' | 'sm' | 'xs';
  dot?: boolean;
  variant?: 'filled' | 'outlined' | 'glass' | '';
}

export const Popover = React.forwardRef<HTMLSpanElement, BadgeProps>(
  (
    { className, children, label, icon, color = 'gray', size = 'md', variant = 'outlined', dot = false, ...props },
    ref
  ) => {
    return (
      <span className={classNames('badge', { dotted: dot }, className, variant, color, size)} ref={ref} {...props}>
        Popover
      </span>
    );
  }
);

Popover.displayName = 'Popover';
