'use client';

import React from 'react';
import { Dropdown, DropdownTringger, DropdownContent, DropdownItem, DropdownDivider } from '@libComponents/Dropdown';

type Props = {};

export const DemoBasicDropdown = (props: Props) => {
  return (
    <Dropdown className='not-prose w-64 bg-white'>
      <DropdownTringger>Dropdown</DropdownTringger>
      <DropdownContent>
        <DropdownItem>Item 1</DropdownItem>
        <DropdownItem>Item 2</DropdownItem>
        <DropdownItem>Item 3</DropdownItem>
        <DropdownDivider />
        <DropdownItem>Item 4</DropdownItem>
      </DropdownContent>
    </Dropdown>
  );
};
