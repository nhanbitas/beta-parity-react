import React, { ElementType, forwardRef } from 'react';

/**
 * Utility type cho props của component có khả năng đa hình.
 * @template C Loại component chính.
 * @template Props Các props của component.
 */
export type PolymorphicComponentProps<C extends ElementType, Props = {}> = Props &
  Omit<React.ComponentPropsWithRef<C>, keyof Props> & {
    component?: C;
  };

/**
 * Utility type cho ref của component có khả năng đa hình.
 * @template C Loại component chính.
 */
export type PolymorphicRef<C> = C extends React.ElementType ? React.ComponentPropsWithRef<C>['ref'] : never;

/**
 * Hàm factory tạo ra một component có khả năng đa hình.
 * @param ui Function component sẽ được sử dụng để tạo ra component có khả năng đa hình.
 * @returns Component có khả năng đa hình.
 */
export function createPolymorphicComponent<
  ComponentDefaultType extends React.ElementType,
  Props extends {},
  StaticComponents = Record<string, never>
>(
  ui: React.ForwardRefRenderFunction<PolymorphicRef<ComponentDefaultType>, Props & { component?: ComponentDefaultType }>
) {
  type ComponentProps<C extends React.ElementType = ComponentDefaultType> = PolymorphicComponentProps<C, Props>;

  type _PolymorphicComponent = <C extends React.ElementType = ComponentDefaultType>(
    props: ComponentProps<C>
  ) => React.ReactElement;

  type ComponentProperties = Omit<React.FunctionComponent<ComponentProps<any>>, never>;

  type PolymorphicComponent = _PolymorphicComponent & ComponentProperties & StaticComponents;

  const Component = forwardRef(ui) as unknown as PolymorphicComponent;

  return Component;
}
