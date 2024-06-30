import React, { forwardRef, ElementType, ReactElement } from 'react';

export type PolymorphicComponentProps<C extends React.ElementType, Props> = Props &
  Omit<React.ComponentPropsWithRef<C>, keyof Props> & { component?: C };

export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
}

const BaseComponent = forwardRef(
  <C extends ElementType = 'div'>(
    { component, className, children, ...props }: PolymorphicComponentProps<C, BaseComponentProps>,
    ref: React.Ref<Element>
  ): ReactElement => {
    const Component = component || 'div';
    return (
      <Component ref={ref as any} className={className} {...props}>
        {children}
      </Component>
    );
  }
) as <C extends ElementType = 'div'>(props: PolymorphicComponentProps<C, BaseComponentProps>) => ReactElement;

export default BaseComponent;
