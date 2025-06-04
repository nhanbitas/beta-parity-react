'use client';

import React from 'react';
import { PINField } from 'beta-parity-react/ui/PINField';

export const GroupsPINField = (props: any) => {
  const [value, setValue] = React.useState('');

  return (
    <PINField
      groups={[2, 2, 2]}
      value={value}
      onChange={(val) => setValue(val)}
      onComplete={(val) => console.log(`PIN complete: ${val}`)}
      {...props}
    />
  );
};
