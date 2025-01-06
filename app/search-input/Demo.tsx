'use client';

import { SearchInput } from '@libComponents/SearchInput';
import React from 'react';

type Props = any;

export const DemoBasicSearchInput = (props: Props) => (
  <SearchInput
    wrapperProps={{ className: '!w-96', ...props.wrapperProps }}
    placeholder='Enter your search'
    {...props}
  />
);
