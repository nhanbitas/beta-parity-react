'use client';
import React from 'react';
import { SearchInput } from 'beta-parity-react/ui/SearchInput';

export const BasicSearchInputDisabledShortCut = () => (
  <SearchInput
    disabled
    shortCut='Shift + K'
    value='This is disabled search input'
    placeholder='Placeholder'
    wrapperProps={{ className: '!w-96' }}
    onSearch={() => {}}
  />
);
