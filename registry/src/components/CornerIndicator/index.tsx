import React from 'react';
import classNames from 'classnames';
import './index.css';
import Badge from '../Badge';
import Dot from '../Dot';

export interface CornerIndicatorProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: string | React.ReactNode;
  className?: string;
  label?: string;
  icon?: React.ReactNode;
  outline?: boolean;
  dot?: boolean;
  pulse?: boolean;
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  color?: 'gray' | 'orange' | 'violet' | 'green' | 'red' | 'yellow' | 'blue' | 'lime' | 'cyan' | '';
  size?: 'md' | 'sm' | 'xs' | 'lg';
  variant?: 'filled' | 'outlined' | 'glass' | '';
}

export const CornerIndicator = React.forwardRef<HTMLDivElement, CornerIndicatorProps>(
  (
    {
      className,
      children,
      label,
      icon,
      dot = false,
      pulse = false,
      outline = false,
      position = 'top-right',
      color = 'gray',
      size = 'md',
      variant = 'filled',
      ...props
    },
    ref
  ) => {
    return (
      <div
        className={classNames('corner-indicator-container', { 'with-border': outline }, className, position)}
        ref={ref}
        {...props}
      >
        {dot ? (
          <Dot pulse={pulse} size={size} color={color as any} />
        ) : (
          <Badge label={label} icon={icon} color={color} size={size as any} variant={variant} />
        )}
        {children}
      </div>
    );
  }
);

CornerIndicator.displayName = 'CornerIndicator';
