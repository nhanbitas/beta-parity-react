'use client';
import React from 'react';
import { SearchInput } from 'beta-parity-react/ui/SearchInput';

export const BasicSearchInputErrorClearable = () => {
  const [value, setValue] = React.useState('');
  return (
    <SearchInput
      isError={true}
      errorMessage='Error message'
      isClearable
      placeholder='Placeholder'
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onSearch={() => {}}
      wrapperProps={{ className: '!w-96' }}
    />
  );
};
