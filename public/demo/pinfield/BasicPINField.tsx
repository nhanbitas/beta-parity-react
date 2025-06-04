'use client';

import React from 'react';
import { PINField } from 'beta-parity-react/ui/PINField';

export const BasicPINField = (props: any) => {
  const [value, setValue] = React.useState('');

  return (
    <PINField
      {...props}
      value={value}
      onChange={(val) => setValue(val)}
      onComplete={(val) => console.log(`PIN complete: ${val}`)}
    />
  );
};
