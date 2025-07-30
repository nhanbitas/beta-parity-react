import React from 'react';
import { CustomSelect } from './Custom';
import { NativeSelect } from './Native';

// =========================
// Select
// =========================
// Declare and export select type and select component

type NativeProps = React.ComponentProps<typeof NativeSelect> & {
  /**
   * Indicates whether the select component is native or custom.
   *
   * @default false
   * @memberof SelectProps
   */
  native: true;
};

type CustomProps = React.ComponentProps<typeof CustomSelect> & {
  /**
   * Indicates whether the select component is native or custom.
   *
   * @default false
   * @memberof SelectProps
   */
  native?: false; // hoặc undefined => default là custom
};

type SelectProps = NativeProps | CustomProps;

export const Select = React.forwardRef<HTMLDivElement | HTMLSelectElement, SelectProps>((props, ref) => {
  const { native = false, children, ...rest } = props;

  if (native) {
    const nativeProps = rest as React.ComponentProps<typeof NativeSelect>;
    return (
      <NativeSelect {...nativeProps} ref={ref as React.Ref<HTMLSelectElement>}>
        {children}
      </NativeSelect>
    );
  } else {
    const customProps = rest as React.ComponentProps<typeof CustomSelect>;
    return (
      <CustomSelect {...customProps} ref={ref as React.Ref<HTMLDivElement>}>
        {children}
      </CustomSelect>
    );
  }
});

Select.displayName = 'Select';

export * from './Native';
export * from './Custom';
