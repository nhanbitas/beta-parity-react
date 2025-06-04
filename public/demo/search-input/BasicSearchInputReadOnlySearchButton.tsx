'use client';
import React from 'react';
import { SearchInput } from 'beta-parity-react/ui/SearchInput';

export const BasicSearchInputReadOnlySearchButton = () => (
  <SearchInput
    readOnly
    searchButton
    value='This is read only search input'
    placeholder='Placeholder'
    wrapperProps={{ className: '!w-96' }}
    onSearch={() => {}}
  />
);
