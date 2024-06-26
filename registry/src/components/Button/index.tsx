'use client';

import React from 'react';
import classNames from 'classnames';
import './index.css';
import Base, { BaseProps } from '../Base';

export interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  text?: string;
  size?: 'small' | 'medium' | 'large';
  variant?: 'primary' | 'secondary' | 'tertiary' | 'ghost' | 'danger' | 'success' | 'system';
  children?: React.ReactNode;
  className?: string;
  isLoading?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  iconOnly?: boolean;
  component?: any;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className = '',
      children,
      size = 'medium',
      variant = 'primary',
      text,
      onClick,
      disabled = false,
      iconOnly = false,
      isLoading = false,
      component = 'button',
      ...props
    },
    ref
  ) => {
    return (
      <Base
        component={component}
        type='button'
        className={classNames('btn', className, variant, size, {
          'icon-only': iconOnly,
          loading: isLoading,
          disabled: disabled || isLoading
        })}
        onClick={!disabled && !isLoading ? onClick : undefined}
        ref={ref}
        {...(isLoading ? { 'data-loading': 'true' } : {})}
        disabled={disabled}
        {...props}
      >
        {text || children}
      </Base>
    );
  }
);

Button.displayName = 'Button';

export { Button };
