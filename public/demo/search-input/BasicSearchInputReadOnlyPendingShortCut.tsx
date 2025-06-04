'use client';
import React from 'react';
import { SearchInput } from 'beta-parity-react/ui/SearchInput';

export const BasicSearchInputReadOnlyPendingShortCut = () => (
  <SearchInput
    readOnly
    isPending
    shortCut='Shift + K'
    value='This is read only search input'
    placeholder='Placeholder'
    wrapperProps={{ className: '!w-96' }}
    onSearch={() => {}}
  />
);
