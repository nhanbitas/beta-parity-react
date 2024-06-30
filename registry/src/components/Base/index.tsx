import React, { forwardRef } from 'react';

export interface BaseProps {
  component?: any;
}

const Base = forwardRef(
  <T extends React.ElementType = 'div'>(
    { component: Component = 'div' as T, ...props }: BaseProps & React.ComponentPropsWithoutRef<T>,
    ref: React.Ref<Element>
  ) => {
    return <Component ref={ref} {...(props as any)} />;
  }
);

Base.displayName = 'Base';

export default Base;
