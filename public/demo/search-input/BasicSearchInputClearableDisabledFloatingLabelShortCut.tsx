'use client';
import React from 'react';
import { SearchInput } from 'beta-parity-react/ui/SearchInput';

export const BasicSearchInputClearableDisabledFloatingLabelShortCut = () => (
  <SearchInput
    isClearable
    disabled
    floatingLabel='Floating Label'
    placeholder='Placeholder'
    shortCut='Shift + K'
    value='This is disabled search input'
    wrapperProps={{ className: '!w-96' }}
    onSearch={() => {}}
  />
);
