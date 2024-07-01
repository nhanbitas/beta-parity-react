import React from 'react';
import classNames from 'classnames';
import './index.css';
import Base from '../Base';
import { PolymorphicComponentProps, createPolymorphicComponent } from '../Base/factory';

export interface BadgeProps {
  children?: string | React.ReactNode;
  className?: string;
  color?: 'gray' | 'orange' | 'sky' | 'violet' | 'green' | 'red' | 'yellow' | 'blue';
  size?: 'small' | 'medium' | 'large';
  variant?: 'strong' | '';
}

const Badge = createPolymorphicComponent<'span', BadgeProps>(
  <C extends React.ElementType = 'span'>(
    {
      component,
      className,
      children,
      color = 'gray',
      size = 'medium',
      variant = '',
      ...props
    }: PolymorphicComponentProps<C, BadgeProps>,
    ref: React.Ref<any>
  ) => {
    const Component = component || ('span' as C);
    return (
      <Base component={Component} className={classNames('badge', className, variant, color, size)} ref={ref} {...props}>
        {children}
      </Base>
    );
  }
);

Badge.displayName = 'Badge';

export { Badge };
