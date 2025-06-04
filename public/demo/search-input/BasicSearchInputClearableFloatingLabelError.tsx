'use client';
import React from 'react';
import { SearchInput } from 'beta-parity-react/ui/SearchInput';

export const BasicSearchInputClearableFloatingLabelError = () => {
  const [value, setValue] = React.useState('');
  return (
    <SearchInput
      isClearable
      isError={true}
      errorMessage='Error message'
      floatingLabel='Floating Label'
      placeholder='Placeholder'
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onSearch={() => {}}
      wrapperProps={{ className: '!w-96' }}
    />
  );
};
