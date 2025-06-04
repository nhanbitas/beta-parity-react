'use client';

import React from 'react';
import { SearchInput } from 'beta-parity-react/ui/SearchInput';

export const ShortCutsSearchInput = (props: any) => {
  const [value, setValue] = React.useState('');

  const handleChange = (e: any) => {
    setValue(e.target.value);
  };

  const handleSearch = () => console.log('Search ' + value + ' ...');

  return (
    <SearchInput
      wrapperProps={{ className: '!w-96', ...props.wrapperProps }}
      placeholder='Enter your search'
      onChange={handleChange}
      onSearch={handleSearch}
      {...props}
    />
  );
};
