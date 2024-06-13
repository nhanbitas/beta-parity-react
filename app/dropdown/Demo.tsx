'use client';

import React from 'react';
import { Dropdown, DropdownTringger, DropdownContent, DropdownItem, DropdownDivider } from '@libComponents/Dropdown';
import { Input } from '@libComponents/Input';

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

const searchItems = ['Item 1', 'Item 2', 'Item 3', 'Item 4'] as const;

export const DemoInputDropdown = (props: Props) => {
  const [value, setvalue] = React.useState<string[]>([]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setvalue(value === '' ? [] : searchItems.filter((item) => item.toLowerCase().includes(value.toLowerCase())));
  };

  return (
    <Dropdown className='not-prose w-64 bg-white' isOpen={Boolean(value)} isToggle={false}>
      <DropdownTringger className='!p-0'>
        <Input floatingLabel='Search' type='text' onChange={handleSearch} />
      </DropdownTringger>
      <DropdownContent>
        {value.map((item) => (
          <DropdownItem key={item}>{item}</DropdownItem>
        ))}
      </DropdownContent>
    </Dropdown>
  );
};

export const DemoSelectDropdown = (props: Props) => {
  return (
    <Dropdown className='not-prose w-64 bg-white'>
      <DropdownTringger>Select</DropdownTringger>
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
