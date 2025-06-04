'use client';
import React from 'react';
import { SearchInput } from 'beta-parity-react/ui/SearchInput';

export const BasicSearchInputClearableDisabledFloatingLabel = () => (
  <SearchInput
    isClearable
    disabled
    floatingLabel='Floating Label'
    placeholder='Placeholder'
    wrapperProps={{ className: '!w-96' }}
    onSearch={() => {}}
  />
);
