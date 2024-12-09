'use client';

import React from 'react';
import { Menu, MenuItem, MenuDivider, MenuGroup, MenuHeader, MenuFooter } from '@libComponents/Menu';
import { Chip } from '@libComponents/Chip';
import { Button } from '@libComponents/Button';

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

export const DemoBasicMenu = (props: any) => {
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

export const DemoScrollableMenu = (props: any) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isOpenCheckbox, setIsOpenCheckbox] = React.useState(false);
  const [isOpenRadio, setIsOpenRadio] = React.useState(false);

  return (
    <div className='mb-96 flex gap-4'>
      <div className='not-prose relative w-64'>
        <Button id={'scroll-menu-' + (props.flag ?? '')} onClick={() => setIsOpen(!isOpen)}>
          Open
        </Button>

        <Menu
          position='top-start'
          anchor={'scroll-menu-' + (props.flag ?? '')}
          className='max-h-[200px] max-w-[300px]'
          size='sm'
          {...props}
          isOpen={isOpen}
          scrollIndicator={true}
          prominence='pronounced'
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

      <div className='not-prose relative w-64'>
        <Button id={'scroll-menu-checkbox-' + (props.flag ?? '')} onClick={() => setIsOpenCheckbox(!isOpenCheckbox)}>
          Open
        </Button>
        <Menu
          anchor={'scroll-menu-checkbox-' + (props.flag ?? '')}
          className='max-w-[300px]'
          size='md'
          isOpen={isOpenCheckbox}
          prominence='pronounced'
          menuItemsLimit={5}
          scrollIndicator={true}
          {...props}
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

      <div className='not-prose relative w-64'>
        <Button id={'scroll-menu-radio-' + (props.flag ?? '')} onClick={() => setIsOpenRadio(!isOpenRadio)}>
          Open
        </Button>
        <Menu
          anchor={'scroll-menu-radio-' + (props.flag ?? '')}
          className='max-w-[300px]'
          isOpen={isOpenRadio}
          prominence='pronounced'
          menuItemsLimit={5}
          scrollIndicator={true}
          searchable
          {...props}
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

export const DemoMenuGroup = (props: any) => {
  const [isOpenGroup, setIsOpenGroup] = React.useState(false);
  const [isOpenCheckboxGroup, setIsOpenCheckboxGroup] = React.useState(false);
  const [isOpenRadioGroup, setIsOpenRadioGroup] = React.useState(false);
  return (
    <div className='mb-96 flex gap-4'>
      <div className='not-prose relative w-64'>
        <Button id={'group-menu-' + (props.flag ?? '')} onClick={() => setIsOpenGroup(!isOpenGroup)}>
          Open
        </Button>
        <Menu
          anchor={'group-menu-' + (props.flag ?? '')}
          size='sm'
          className='max-w-[300px]'
          isOpen={isOpenGroup}
          menuItemsLimit={5}
          scrollIndicator={true}
          menuColor='accent'
          searchable
          style={{ maxHeight: '300px' }}
          {...props}
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

      <div className='not-prose relative w-64'>
        <Button
          id={'group-checkbox-menu-' + (props.flag ?? '')}
          onClick={() => setIsOpenCheckboxGroup(!isOpenCheckboxGroup)}
        >
          Open
        </Button>
        <Menu
          anchor={'group-checkbox-menu-' + (props.flag ?? '')}
          size='md'
          className='max-w-[300px]'
          isOpen={isOpenCheckboxGroup}
          menuColor='accent'
          menuItemsLimit={5}
          scrollIndicator={true}
          searchable
          {...props}
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

      <div className='not-prose relative w-64'>
        <Button id={'group-radio-menu-' + (props.flag ?? '')} onClick={() => setIsOpenRadioGroup(!isOpenRadioGroup)}>
          Open
        </Button>
        <Menu
          anchor={'group-radio-menu-' + (props.flag ?? '')}
          menuColor='accent'
          className='max-w-[300px]'
          isOpen={isOpenRadioGroup}
          menuItemsLimit={7}
          scrollIndicator={true}
          searchable
          {...props}
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
