import React from 'react';
import classNames from 'classnames';
import './index.css';
import Badge, { BadgeProps } from '../Badge';
import Dot, { DotProps } from '../Dot';

export interface CornerIndicatorProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: string | React.ReactNode;
  className?: string;
  label?: string;
  icon?: React.ReactNode;
  outline?: boolean;
  pulse?: boolean;
  offset?: number;
  disable?: boolean;
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  color?: 'gray' | 'orange' | 'violet' | 'green' | 'red' | 'yellow' | 'blue' | 'lime' | 'cyan' | '';
  size?: 'md' | 'sm' | 'xs' | 'lg';
  variant?: 'filled' | 'outlined' | 'glass' | '';
  indicatorProps?: Omit<BadgeProps, 'size' | 'color' | 'variant'> & Omit<DotProps, 'size' | 'color' | 'pulse'>;
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
      offset = 0,
      position = 'top-right',
      color = 'gray',
      size = 'md',
      variant = 'filled',
      indicatorProps,
      ...props
    },
    ref
  ) => {
    const offsetValue = { '--par-offset': `${offset}px` } as React.CSSProperties;

    if (disable) return children;

    return (
      <div
        className={classNames('corner-indicator-container', { 'with-border': outline }, className, position)}
        ref={ref}
        style={{ ...offsetValue }}
        {...props}
      >
        {!label ? (
          <Dot pulse={pulse} size={size} color={color as any} {...indicatorProps} />
        ) : (
          <Badge label={label} icon={icon} color={color} size={size as any} variant={variant} {...indicatorProps} />
        )}
        {children}
      </div>
    );
  }
);

CornerIndicator.displayName = 'CornerIndicator';
