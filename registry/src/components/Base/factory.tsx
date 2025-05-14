import React, { ElementType, forwardRef } from 'react';

export type PolymorphicComponentProps<C extends ElementType, Props = {}> = Props &
  Omit<React.ComponentPropsWithRef<C>, keyof Props> & {
    component?: C;
  };

export type PolymorphicRef<C> = C extends React.ElementType ? React.ComponentPropsWithRef<C>['ref'] : never;

export function createPolymorphicComponent<
  ComponentDefaultType extends React.ElementType,
  Props extends {},
  StaticComponents = Record<string, never>
>(
  ui: React.ForwardRefRenderFunction<
    PolymorphicRef<ComponentDefaultType>,
    React.PropsWithoutRef<Props & { component?: ComponentDefaultType }>
  >
) {
  type ComponentProps<C extends React.ElementType = ComponentDefaultType> = PolymorphicComponentProps<C, Props>;

  type _PolymorphicComponent = <C extends React.ElementType = ComponentDefaultType>(
    props: ComponentProps<C>
  ) => React.ReactElement;

  type ComponentProperties = Omit<React.FunctionComponent<ComponentProps<any>>, never>;

  type PolymorphicComponent = _PolymorphicComponent & ComponentProperties & StaticComponents;

  return forwardRef(ui) as unknown as PolymorphicComponent;
}
