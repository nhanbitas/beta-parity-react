import React, { forwardRef } from 'react';

export interface BaseProps<T extends React.ElementType> {
  component?: T;
  // Extend additional props
  [key: string]: any;
}

const Base = forwardRef(
  <T extends React.ElementType = 'div'>(
    { component: Component = 'div' as T, ...props }: BaseProps<T> & React.ComponentPropsWithoutRef<T>,
    ref: React.Ref<Element>
  ) => {
    return <Component ref={ref} {...(props as any)} />;
  }
);

Base.displayName = 'Base';

export default Base;
