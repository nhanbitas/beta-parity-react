'use Client';

import React from 'react';
import { createPolymorphicComponent, PolymorphicComponentProps } from '../Base/factory';
import './index.css';
import classNames from 'classnames';
import Base, { BaseProps } from '../Base';
import { Loader } from 'lucide-react';

const sizeMap = {
  sm: 'small',
  md: 'medium',
  lg: 'large'
} as const;

const colorMap = {
  accent: 'accent',
  neutral: 'neutral',
  adverse: 'adverse'
} as const;

const kindMap = {
  solid: 'solid',
  outlined: 'outlined',
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
  isPending?: boolean;

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
      kind = 'solid',
      disabled = false,
      iconOnly = false,
      isPending = false,
      onClick,
      ...props
    }: PolymorphicComponentProps<C, ButtonProps>,
    ref: React.Ref<any>
  ) => {
    const Component = component || ('button' as C);

    const btnText = children;

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
      <Base
        component={Component}
        type='button'
        className={classes}
        onClick={!disabled && !isPending ? onClick : undefined}
        ref={ref}
        disabled={disabled || isPending}
        {...props}
      >
        {isPending && <Loader className='loading-animation' />}
        {parsedChildren}
      </Base>
    );
  }
);
