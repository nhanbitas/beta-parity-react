'use client';
import React from 'react';
import { SearchInput } from 'beta-parity-react/ui/SearchInput';

export const BasicSearchInputDisabledSearchButton = () => (
  <SearchInput
    disabled
    searchButton
    value='This is disabled search input'
    placeholder='Placeholder'
    wrapperProps={{ className: '!w-96' }}
    onSearch={() => {}}
  />
);
