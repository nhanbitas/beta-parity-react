'use client';
import React from 'react';
import { SearchInput } from 'beta-parity-react/ui/SearchInput';

export const BasicSearchInputClearableFloatingLabel = () => {
  const [value, setValue] = React.useState('');
  return (
    <SearchInput
      isClearable
      floatingLabel='Floating Label'
      placeholder='Placeholder'
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onSearch={() => {}}
      wrapperProps={{ className: '!w-96' }}
    />
  );
};
