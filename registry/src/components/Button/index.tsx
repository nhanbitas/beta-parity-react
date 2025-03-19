import React from 'react';
import classNames from 'classnames';

import './index.css';
import './variables.css';

import { Spinner } from '../Spinner';

// =========================
// Button
// =========================
// Declare and export select type and Button component

const sizeMap: Record<'sm' | 'md' | 'lg', string> = {
  sm: 'small',
  md: 'medium',
  lg: 'large'
} as const;

const colorMap: Record<'accent' | 'neutral' | 'adverse', string> = {
  accent: 'accent',
  neutral: 'neutral',
  adverse: 'adverse'
} as const;

const kindMap: Record<'solid' | 'outlined' | 'ghost' | 'glass', string> = {
  solid: 'solid',
  outlined: 'outlined',
  ghost: 'ghost',
  glass: 'glass'
} as const;

/**
 * Props for the Button component.
 *
 * Extends properties from the `button` element.
 */
export interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  /**
   * The size of the button. It can be one of the keys from the sizeMap.
   *
   * @default 'md'
   * @memberof ButtonProps
   */
  size?: keyof typeof sizeMap;

  /**
   * The color of the button. It can be one of the keys from the colorMap.
   *
   * @default 'neutral'
   * @memberof ButtonProps
   */
  color?: keyof typeof colorMap;

  /**
   * The kind of button style. It can be one of the keys from the kindMap.
   *
   * @default 'solid'
   * @memberof ButtonProps
   */
  kind?: keyof typeof kindMap;

  /**
   * Indicates whether the button is in a loading state.
   *
   * @default false
   * @memberof ButtonProps
   */
  isPending?: boolean;

  /**
   * Indicates whether the button is icon-only, without any text.
   *
   * @default false
   * @memberof ButtonProps
   */
  iconOnly?: boolean;

  /**
   * Indicates whether the button is disabled.
   *
   * @default false
   * @memberof ButtonProps
   */
  disabled?: boolean;
}

/**
 * **Parity Button**.
 *
 *  @see {@link http://localhost:3005/button Parity Button}
 */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className = '',
      children,
      size = 'md',
      color = 'neutral',
      kind = 'solid',
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
        disabled={disabled || isPending}
        {...props}
      >
        {isPending && <Spinner variant='sunburst' color='neutral' size='sm' />}
        {parsedChildren}
      </button>
    );
  }
);

Button.displayName = 'Button';
