'use client';
import React from 'react';
import { SearchInput } from 'beta-parity-react/ui/SearchInput';

export const BasicSearchInputErrorShortCut = () => {
  const [value, setValue] = React.useState('');
  return (
    <SearchInput
      isError={true}
      errorMessage='Error message'
      shortCut='Shift + K'
      placeholder='Placeholder'
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onSearch={() => {}}
      wrapperProps={{ className: '!w-96' }}
    />
  );
};
