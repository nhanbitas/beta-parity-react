'use Client';

import React from 'react';
import { createPolymorphicComponent, PolymorphicComponentProps } from '../Base/factory';
import './index.css';
import classNames from 'classnames';
import Base, { BaseProps } from '../Base';

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

export interface ButtonProps extends BaseProps {
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
  isLoading?: boolean;

  /**
   * Indicates whether the button is icon-only, without any text.
   *
   * @type {boolean}
   * @memberof ButtonProps
   */
  iconOnly?: boolean;
}

export const Button = createPolymorphicComponent<'button', ButtonProps>(
  <C extends React.ElementType = 'button'>(
    {
      component,
      className = '',
      children,
      size = 'md',
      color = 'neutral',
      kind = 'filled',
      disabled = false,
      iconOnly = false,
      isLoading = false,
      onClick,
      ...props
    }: PolymorphicComponentProps<C, ButtonProps>,
    ref: React.Ref<any>
  ) => {
    const Component = component || ('button' as C);

    const btnText = children;

    const classes = classNames('btn', colorMap[color], kindMap[kind], sizeMap[size], className, {
      'icon-only': iconOnly,
      loading: isLoading
    });

    const parsedChildren = React.Children.map(children, (child) => {
      if (typeof child === 'string' || typeof child === 'number') {
        return <span>{child}</span>;
      }
      return child;
    });

    return (
      <Base
        component={Component}
        type='button'
        className={classes}
        onClick={!disabled && !isLoading ? onClick : undefined}
        ref={ref}
        {...(isLoading ? { 'data-loading': 'true' } : {})}
        disabled={disabled || isLoading}
        {...props}
      >
        {parsedChildren}
      </Base>
    );
  }
);
