'use Client';

import React from 'react';
import '../theme/alias/border.variables.css';
import './index.css';
import classNames from 'classnames';

const sizeMap = {
  sm: 'small',
  md: 'medium',
  lg: 'large'
} as const;

const colorMap = {
  primary: 'primary',
  neutral: 'neutral',
  danger: 'danger',
  success: 'success',
  info: 'info'
} as const;

const kindMap = {
  filled: 'filled',
  outline: 'outlined',
  ghost: 'ghost',
  glass: 'glass'
} as const;

export interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  /**
   * The size of the button. It can be one of the keys from the sizeMap.
   *
   * @type {keyof typeof sizeMap}
   * @memberof ButtonProps
   */
  size?: keyof typeof sizeMap;

  /**
   * The color of the button. It can be one of the keys from the colorMap.
   *
   * @type {keyof typeof colorMap}
   * @memberof ButtonProps
   */
  color?: keyof typeof colorMap;

  /**
   * The kind of button style. It can be one of the keys from the kindMap.
   *
   * @type {keyof typeof kindMap}
   * @memberof ButtonProps
   */
  kind?: keyof typeof kindMap;

  /**
   * Indicates whether the button is in a loading state.
   *
   * @type {boolean}
   * @memberof ButtonProps
   */
  isPending?: boolean;

  /**
   * Indicates whether the button is icon-only, without any text.
   *
   * @type {boolean}
   * @memberof ButtonProps
   */
  iconOnly?: boolean;

  /**
   * Indicates whether the button is disabled.
   *
   * @type {boolean}
   * @memberof ButtonProps
   */
  disabled?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className = '',
      children,
      size = 'md',
      color = 'neutral',
      kind = 'filled',
      disabled = false,
      iconOnly = false,
      isPending = false,
      onClick,
      ...props
    },
    ref
  ) => {
    const classes = classNames('btn', colorMap[color], kindMap[kind], sizeMap[size], className, {
      'icon-only': iconOnly,
      loading: isPending
    });

    const parsedChildren = React.Children.map(children, (child) => {
      if (typeof child === 'string' || typeof child === 'number') {
        return <span className='btn-text'>{child}</span>;
      }
      return child;
    });

    return (
      <button
        type='button'
        className={classes}
        onClick={!disabled && !isPending ? onClick : undefined}
        ref={ref}
        {...(isPending ? { 'data-loading': 'true' } : {})}
        disabled={disabled || isPending}
        {...props}
      >
        {parsedChildren}
      </button>
    );
  }
);

Button.displayName = 'Button';
