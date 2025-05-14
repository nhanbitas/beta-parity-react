import React, { ElementType, ReactElement, forwardRef } from 'react';
import { PolymorphicComponentProps, PolymorphicRef } from './factory';
import { styleMap } from './style.map';

type StyleProps = {
  [key in keyof typeof styleMap]?: React.CSSProperties[keyof React.CSSProperties];
};

export interface BaseProps extends StyleProps {}

type BaseComponentProps<C extends ElementType> = PolymorphicComponentProps<C>;

export const Base = forwardRef(
  <C extends ElementType = 'div'>(
    { component: Component = 'div' as C, children, style, ...props }: BaseComponentProps<C>,
    ref: React.Ref<C>
  ): ReactElement => {
    const ComponentElement = Component as ElementType;
    return (
      <ComponentElement ref={ref} {...props} style={{ ...convertPropsToStyle(props), ...style }}>
        {children}
      </ComponentElement>
    );
  }
);

Base.displayName = 'Base';

export const convertPropsToStyle = (props: any) => {
  const styles: { [key: string]: string | number } = {};
  Object.keys(props).forEach((key) => {
    const cssProperty = styleMap[key as keyof typeof styleMap] as string;
    if (cssProperty) {
      if (cssProperty === 'marginX') {
        styles.marginLeft = props[key];
        styles.marginRight = props[key];
      } else if (cssProperty === 'marginY') {
        styles.marginTop = props[key];
        styles.marginBottom = props[key];
      } else if (cssProperty === 'paddingX') {
        styles.paddingLeft = props[key];
        styles.paddingRight = props[key];
      } else if (cssProperty === 'paddingY') {
        styles.paddingTop = props[key];
        styles.paddingBottom = props[key];
      } else {
        styles[cssProperty as keyof React.CSSProperties] = props[key];
      }
    }
  });
  return styles;
};
