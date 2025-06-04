'use client';

import React from 'react';
import { PINField } from 'beta-parity-react/ui/PINField';

export const MaskedPINField = (props: any) => {
  const [value, setValue] = React.useState('');

  return (
    <PINField
      masked={true}
      groups={[6]}
      value={value}
      onChange={(val) => setValue(val)}
      placeholder=' '
      onComplete={(val) => console.log(`PIN complete: ${val}`)}
      {...props}
    />
  );
};
