'use client';

import React from 'react';
import { Menu, MenuItem, MenuDivider, MenuGroup, MenuHeader, MenuFooter } from 'beta-parity-react/ui/Menu';
import { Chip } from 'beta-parity-react/ui/Chip';

const searchItems = [
  'Item 1',
  'Item 2',
  'Item 3',
  'Item 4',
  'Item 5',
  'Item 6',
  'Item 7',
  'Item 8',
  'Item 9',
  'Item 10'
] as const;

export const BasicMenu = (props: any) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [value, setValue] = React.useState('');
  const ref = React.useRef<any>(null);

  const handleClick = (value: any) => {
    setIsOpen(!isOpen);
    setValue(value);
  };

  return (
    <>
      <Chip
        ref={ref}
        label={value || 'Menu'}
        type='dropdown'
        color='accent'
        value={value}
        isActive={isOpen}
        onClick={() => setIsOpen(!isOpen)}
      />

      <Menu
        anchor={ref.current}
        isOpen={isOpen}
        size='md'
        menuItemsLimit={5}
        scrollIndicator={true}
        prominence='pronounced'
        theme='alternative'
        menuColor='accent'
        className='max-w-[300px]'
        {...props}
      >
        <MenuHeader>
          <span className='flex h-full items-center gap-1 px-4 font-semibold text-[var(--par-color-text-surface-item-enabled)]'>
            This is a header
          </span>
        </MenuHeader>
        {searchItems.map((item, i) => (
          <MenuItem
            key={item}
            onClick={() => handleClick(item)}
            checked={value === item}
            disabled={i % 2 === 0 ? true : false}
          >
            {item}
          </MenuItem>
        ))}
        <MenuFooter>
          <span className='flex h-full items-center gap-1 px-4 font-semibold  text-[var(--par-color-text-surface-item-enabled)]'>
            This is a footer
          </span>
        </MenuFooter>
      </Menu>
    </>
  );
};
