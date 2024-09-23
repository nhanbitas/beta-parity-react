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
  pulse?: boolean;
  inset?: number;
  disable?: boolean;
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
      pulse = false,
      outline = false,
      disable = false,
      inset = 0,
      position = 'top-right',
      color = 'gray',
      size = 'md',
      variant = 'filled',
      ...props
    },
    ref
  ) => {
    const insetStyle = { '--par-inset-offset': `${inset}px` } as React.CSSProperties;

    if (disable) return children;

    return (
      <div
        className={classNames('corner-indicator-container', { 'with-border': outline }, className, position)}
        ref={ref}
        style={{ ...insetStyle }}
        {...props}
      >
        {!label ? (
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
