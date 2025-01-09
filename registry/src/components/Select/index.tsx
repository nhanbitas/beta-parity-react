import React from 'react';
import { CustomSelect } from './Custom';
import { NativeSelect } from './Native';

// =========================
// Select
// =========================
// Declare and export select type and select component

type SelectProps = React.ComponentProps<typeof CustomSelect> &
  React.ComponentProps<typeof NativeSelect> & {
    /**
     * Indicates whether the select component is native or custom.
     *
     * @default false
     * @memberof SelectProps
     */
    native?: boolean;
  };

export const Select = React.forwardRef<HTMLDivElement | HTMLSelectElement, SelectProps>((props, ref: any) => {
  const { native = false, children, ...rest } = props;
  let Component = native ? NativeSelect : CustomSelect;
  return (
    <Component {...rest} ref={ref}>
      {children}
    </Component>
  );
});

Select.displayName = 'Select';

export * from './Native';
export * from './Custom';
