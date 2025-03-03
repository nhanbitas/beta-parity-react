import React from 'react';
import classNames from 'classnames';
import Base, { BaseProps } from '@ui/Base';
import { PolymorphicComponentProps, createPolymorphicComponent } from '@ui/Base/factory';

export interface BoxProps extends BaseProps {}

export const Box = createPolymorphicComponent<'div', BoxProps>(
  <C extends React.ElementType = 'div'>(
    { component, className, children, ...props }: PolymorphicComponentProps<C, BoxProps>,
    ref: React.Ref<any>
  ) => {
    const Component = component || ('div' as C);
    return (
      <Base component={Component} className={classNames('box', className)} ref={ref} {...props}>
        {children}
      </Base>
    );
  }
);

Box.displayName = 'Box';
