'use client';

import React from 'react';
import { Menu, MenuItem, MenuDivider, MenuGroup, MenuHeader, MenuFooter } from '@libComponents/Menu';
import { FlagTriangleRightIcon } from 'lucide-react';
import { Chip } from '@libComponents/Chip';
import { MenuTrigger } from '@libComponents/Menu';

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

type Props = {};

export const DemoBasicMenu = (props: Props) => {
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
        color='sky'
        value={value}
        isActive={isOpen}
        onClick={() => setIsOpen(!isOpen)}
      />

      <Menu
        anchor={ref.current}
        isOpen={isOpen}
        size='md'
        overflowLimit={5}
        scrollIndicator={true}
        className='max-w-[300px]'
      >
        <MenuHeader>
          <div className='flex h-full items-center gap-1'>
            <FlagTriangleRightIcon style={{ color: 'red' }} /> This is a header
          </div>
        </MenuHeader>
        {searchItems.map((item) => (
          <MenuItem key={item} onClick={() => handleClick(item)} checked={value === item}>
            {item}
          </MenuItem>
        ))}
        <MenuFooter>
          <div className='flex h-full items-center gap-1'>
            <FlagTriangleRightIcon style={{ color: 'skyblue' }} /> This is a footer
          </div>
        </MenuFooter>
      </Menu>
    </>
  );
};

export const DemoScrollableMenu = (props: Props) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isOpenCheckbox, setIsOpenCheckbox] = React.useState(false);
  const [isOpenRadio, setIsOpenRadio] = React.useState(false);

  return (
    <div className='mb-96 flex gap-4'>
      <div className='not-prose relative w-64 bg-white'>
        <MenuTrigger id='scroll-menu' onClick={() => setIsOpen(!isOpen)}>
          Click
        </MenuTrigger>
        <Menu
          position='top-start'
          anchor='scroll-menu'
          className='max-h-[200px] max-w-[300px]'
          size='sm'
          isOpen={isOpen}
          scrollIndicator={true}
          searchable
        >
          {searchItems.map((item) => (
            <MenuItem
              onClick={() => setIsOpen(false)}
              onChange={(e: any) => console.log(e)}
              key={item}
              label={item}
              value={item}
            />
          ))}
        </Menu>
      </div>

      <div className='not-prose relative w-64 bg-white'>
        <MenuTrigger id='scroll-menu-checkbox' onClick={() => setIsOpenCheckbox(!isOpenCheckbox)}>
          Click
        </MenuTrigger>
        <Menu
          anchor='scroll-menu-checkbox'
          className='max-w-[300px]'
          size='md'
          isOpen={isOpenCheckbox}
          overflowLimit={5}
          scrollIndicator={true}
        >
          {searchItems.map((item) => (
            <MenuItem
              onClick={() => setIsOpenCheckbox(false)}
              onChange={(e: any) => console.log(e)}
              key={item}
              label={item}
              value={item}
              useInput
              multiselect
            />
          ))}
        </Menu>
      </div>

      <div className='not-prose relative w-64 bg-white'>
        <MenuTrigger id='scroll-menu-radio' onClick={() => setIsOpenRadio(!isOpenRadio)}>
          Click
        </MenuTrigger>
        <Menu
          anchor='scroll-menu-radio'
          className='max-w-[300px]'
          size='lg'
          isOpen={isOpenRadio}
          overflowLimit={5}
          scrollIndicator={true}
          searchable
        >
          {searchItems.map((item) => (
            <MenuItem
              onClick={() => setIsOpenRadio(false)}
              // onChange={(e: React.ChangeEvent<HTMLInputElement>) => console.log(e.target.value)}
              key={item}
              label={item}
              value={item}
              onChange={(e: any) => console.log(e)}
              name='radio-dropdown'
              useInput
            />
          ))}
        </Menu>
      </div>
    </div>
  );
};

export const DemoMenuGroup = (props: Props) => {
  const [isOpenGroup, setIsOpenGroup] = React.useState(false);
  const [isOpenCheckboxGroup, setIsOpenCheckboxGroup] = React.useState(false);
  const [isOpenRadioGroup, setIsOpenRadioGroup] = React.useState(false);
  return (
    <div className='mb-96 flex gap-4'>
      <div className='not-prose relative w-64 bg-white'>
        <MenuTrigger id='group-menu' onClick={() => setIsOpenGroup(!isOpenGroup)}>
          Click
        </MenuTrigger>
        <Menu
          anchor='group-menu'
          size='sm'
          className='max-w-[300px]'
          isOpen={isOpenGroup}
          overflowLimit={5}
          scrollIndicator={true}
          searchable
          style={{ maxHeight: '300px' }}
        >
          <MenuGroup groupLabel='Group 1'>
            {searchItems.map((item) => (
              <MenuItem key={item} label={item} value={item} checkmarkSide='left' />
            ))}
          </MenuGroup>
          <MenuDivider />
          <MenuGroup groupLabel='Group 2'>
            {searchItems.map((item) => (
              <MenuItem key={item} label={item} value={item} checkmarkSide='right' />
            ))}
          </MenuGroup>
        </Menu>
      </div>

      <div className='not-prose relative w-64 bg-white'>
        <MenuTrigger id='group-checkbox-menu' onClick={() => setIsOpenCheckboxGroup(!isOpenCheckboxGroup)}>
          Click
        </MenuTrigger>
        <Menu
          anchor='group-checkbox-menu'
          size='md'
          className='max-w-[300px]'
          isOpen={isOpenCheckboxGroup}
          overflowLimit={5}
          scrollIndicator={true}
          searchable
        >
          <MenuGroup groupLabel='Group 1'>
            {searchItems.map((item) => (
              <MenuItem key={item} label={item} value={item} name='Group 1' useInput multiselect />
            ))}
          </MenuGroup>
          <MenuDivider />
          <MenuGroup groupLabel='Group 2'>
            {searchItems.map((item) => (
              <MenuItem key={item} label={item} value={item} name='Group 2' useInput multiselect />
            ))}
          </MenuGroup>
        </Menu>
      </div>

      <div className='not-prose relative w-64 bg-white'>
        <MenuTrigger id='group-radio-menu' onClick={() => setIsOpenRadioGroup(!isOpenRadioGroup)}>
          Click
        </MenuTrigger>
        <Menu
          anchor='group-radio-menu'
          size='lg'
          className='max-w-[300px]'
          isOpen={isOpenRadioGroup}
          overflowLimit={7}
          scrollIndicator={true}
          searchable
        >
          <MenuGroup groupLabel='Group 1'>
            {searchItems.map((item) => (
              <MenuItem key={item} label={item} value={item} name='Group 1' useInput />
            ))}
          </MenuGroup>
          <MenuDivider />
          <MenuGroup groupLabel='Group 2'>
            {searchItems.map((item) => (
              <MenuItem key={item} label={item} value={item} name='Group 2' useInput />
            ))}
          </MenuGroup>
        </Menu>
      </div>
    </div>
  );
};
