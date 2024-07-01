import React, { ElementType, ReactElement, forwardRef } from 'react';
import { PolymorphicComponentProps, PolymorphicRef } from './factory';

type BaseComponentProps<C extends ElementType> = PolymorphicComponentProps<C>;

const Base = forwardRef(
  <C extends ElementType = 'div'>(
    { component: Component = 'div' as C, children, ...props }: BaseComponentProps<C>,
    ref: PolymorphicRef<C>
  ): ReactElement => {
    const ComponentElement = Component as ElementType;
    return (
      <ComponentElement ref={ref} {...props}>
        {children}
      </ComponentElement>
    );
  }
);

Base.displayName = 'Base';

export default Base;
