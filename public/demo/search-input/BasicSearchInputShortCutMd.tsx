'use client';
import React from 'react';
import { SearchInput } from 'beta-parity-react/ui/SearchInput';

export const BasicSearchInputShortCutMd = () => {
  const [value, setValue] = React.useState('');
  return (
    <SearchInput
      shortCut='Shift + K'
      inputSize='md'
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onSearch={() => {}}
      wrapperProps={{ className: '!w-96' }}
      placeholder='Enter your search'
    />
  );
};
