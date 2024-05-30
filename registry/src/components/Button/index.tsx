import React from 'react';
import classNames from 'classnames';
import './index.css';
import { Spinner } from '../Spinner';

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
      ...props
    },
    ref
  ) => {
    return (
      <button
        className={classNames('btn', className, variant, size, {
          'icon-only': iconOnly,
          loading: isLoading,
          disabled: disabled || isLoading
        })}
        onClick={!disabled && !isLoading ? onClick : undefined}
        ref={ref}
        {...props}
      >
        {isLoading ? (
          <>
            <Spinner variant='circle-01' /> {text || children}
          </>
        ) : (
          text || children
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button };
