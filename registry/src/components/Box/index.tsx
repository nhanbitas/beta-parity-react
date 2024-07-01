import React from 'react';
import classNames from 'classnames';
import Base from '../Base';
import { PolymorphicComponentProps, createPolymorphicComponent } from '../Base/factory';

export interface BoxProps {}

const Box = createPolymorphicComponent<'div', BoxProps>(
  <C extends React.ElementType = 'div'>(
    { component, className, children, ...props }: PolymorphicComponentProps<C, BoxProps>,
    ref: React.Ref<any>
  ) => {
    const Component = component || ('div' as C);
    return (
      <Base component={Component} className={classNames('Box', className)} ref={ref} {...props}>
        {children}
      </Base>
    );
  }
);

Box.displayName = 'Box';

export { Box };
