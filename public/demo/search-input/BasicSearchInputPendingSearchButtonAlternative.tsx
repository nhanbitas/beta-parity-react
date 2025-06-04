'use client';
import React from 'react';
import { SearchInput } from 'beta-parity-react/ui/SearchInput';

export const BasicSearchInputPendingSearchButtonAlternative = () => {
  const [value, setValue] = React.useState('');
  return (
    <SearchInput
      isPending
      searchButton
      theme='alternative'
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onSearch={() => {}}
      wrapperProps={{ className: '!w-96' }}
      placeholder='Enter your search'
    />
  );
};
