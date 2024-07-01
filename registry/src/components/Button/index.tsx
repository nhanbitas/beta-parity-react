'use Client';

import React, { ElementType } from 'react';
import { createPolymorphicComponent, PolymorphicComponentProps } from '../Base/factory';
import './index.css';
import classNames from 'classnames';
import Base, { BaseProps } from '../Base';

interface ButtonProps extends BaseProps {
  text?: string;
  size?: 'small' | 'medium' | 'large';
  variant?: 'primary' | 'secondary' | 'tertiary' | 'ghost' | 'danger' | 'success' | 'system';
  children?: React.ReactNode;
  className?: string;
  isLoading?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  iconOnly?: boolean;
}

export const Button = createPolymorphicComponent<'button', ButtonProps>(
  <C extends React.ElementType = 'button'>(
    {
      component,
      className = '',
      children,
      size = 'medium',
      variant = 'primary',
      text,
      onClick,
      disabled = false,
      iconOnly = false,
      isLoading = false,
      ...props
    }: PolymorphicComponentProps<C, ButtonProps>,
    ref: React.Ref<any>
  ) => {
    const Component = component || ('button' as C);

    const classes = classNames('btn', className, variant, size, {
      'icon-only': iconOnly,
      loading: isLoading,
      disabled: disabled || isLoading
    });

    return (
      <Base
        component={Component}
        type='button'
        className={classes}
        onClick={!disabled && !isLoading ? onClick : undefined}
        ref={ref}
        {...(isLoading ? { 'data-loading': 'true' } : {})}
        disabled={disabled}
        {...props}
      >
        {isLoading ? 'Loading...' : children}
      </Base>
    );
  }
);
