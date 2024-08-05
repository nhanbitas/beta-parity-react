'use client';

import React from 'react';
import { Menu, MenuItem, MenuDivider, MenuGroup, MenuHeader, MenuFooter } from '@libComponents/Menu';
import { CarFront, FlagTriangleRightIcon } from 'lucide-react';
import { MenuTrigger } from '@libComponents/Menu/index';
import { Chip } from '@libComponents/Chip';

type Props = {};

export const DemoBasicMenu = (props: Props) => {
  const [isOpen, setIsOpen] = React.useState(true);
  const [value, setValue] = React.useState('');

  const handleClick = (e: any) => {
    setValue(e);
    setIsOpen(false);
  };

  return (
    <div className='mb-96 flex gap-4'>
      <MenuTrigger menuTarget='demo-menu' onClick={() => setIsOpen(!isOpen)}>
        <Chip label={value || 'Select'} type='dropdown' color='sky' value={value} isActive={isOpen} />
      </MenuTrigger>

      <div className='not-prose relative w-64 bg-white'>
        <Menu id='demo-menu' size='md' isOpen={isOpen} overflowLimit={4} scrollIndicator={true}>
          <MenuHeader>
            <div className='flex h-full items-center gap-1'>
              <FlagTriangleRightIcon style={{ color: 'red' }} /> This is a header
            </div>
          </MenuHeader>

          <MenuItem value={'item-1'} onClick={() => handleClick('item-1')} checked={value === 'item-1'}>
            Item 1
          </MenuItem>
          <MenuItem value={'item-2'} onClick={() => handleClick('item-2')} checked={value === 'item-2'}>
            Item 2
          </MenuItem>
          <MenuItem value={'item-3'} onClick={() => handleClick('item-3')} checked={value === 'item-3'}>
            Item 3
          </MenuItem>
          <MenuItem value={'item-4'} onClick={() => handleClick('item-4')} checked={value === 'item-4'}>
            Item 4
          </MenuItem>
          <MenuItem value={'item-5'} onClick={() => handleClick('item-5')} checked={value === 'item-5'}>
            Item 5
          </MenuItem>

          <MenuFooter>
            <div className='flex h-full items-center gap-1'>
              <FlagTriangleRightIcon style={{ color: 'skyblue' }} /> This is a footer
            </div>
          </MenuFooter>
        </Menu>
      </div>
    </div>
  );
};

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

export const DemoScrollableMenu = (props: Props) => {
  const [isOpen, setIsOpen] = React.useState(true);

  return (
    <div className='mb-96 flex gap-4'>
      <div className='not-prose relative w-64 bg-white'>
        <Menu size='sm' isOpen={isOpen} overflowLimit={5} scrollIndicator={true}>
          {searchItems.map((item) => (
            <MenuItem key={item} label={item} value={item} onChange={(e) => console.log(e)} />
          ))}
        </Menu>
      </div>
      <div className='not-prose relative w-64 bg-white'>
        <Menu size='md' isOpen={isOpen} overflowLimit={5} scrollIndicator={true}>
          {searchItems.map((item) => (
            <MenuItem key={item} label={item} value={item} useInput='checkbox' />
          ))}
        </Menu>
      </div>
      <div className='not-prose relative w-64 bg-white'>
        <Menu size='lg' isOpen={isOpen} overflowLimit={5} scrollIndicator={true} searchable>
          {searchItems.map((item) => (
            <MenuItem key={item} label={item} value={item} name='radio-dropdown' useInput='radio' />
          ))}
        </Menu>
      </div>
    </div>
  );
};

export const DemoMenuGroup = (props: Props) => {
  const [isOpen, setIsOpen] = React.useState(true);
  return (
    <div className='mb-96 flex gap-4'>
      <div className='not-prose relative w-64 bg-white'>
        <Menu
          size='sm'
          isOpen={isOpen}
          overflowLimit={5}
          scrollIndicator={true}
          searchable
          style={{ maxHeight: '300px' }}
        >
          <MenuGroup groupValue='Group 1'>
            {searchItems.map((item) => (
              <MenuItem key={item} label={item} value={item} checkmarkSide='left' />
            ))}
          </MenuGroup>
          <MenuDivider />
          <MenuGroup groupValue='Group 2'>
            {searchItems.map((item) => (
              <MenuItem key={item} label={item} value={item} checkmarkSide='right' />
            ))}
          </MenuGroup>
        </Menu>
      </div>

      <div className='not-prose relative w-64 bg-white'>
        <Menu size='md' isOpen={isOpen} overflowLimit={5} scrollIndicator={true} searchable>
          <MenuGroup groupValue='Group 1'>
            {searchItems.map((item) => (
              <MenuItem key={item} label={item} value={item} name='Group 1' useInput='radio' />
            ))}
          </MenuGroup>
          <MenuDivider />
          <MenuGroup groupValue='Group 2'>
            {searchItems.map((item) => (
              <MenuItem key={item} label={item} value={item} name='Group 2' useInput='radio' />
            ))}
          </MenuGroup>
        </Menu>
      </div>

      <div className='not-prose relative w-64 bg-white'>
        <Menu size='lg' isOpen={isOpen} overflowLimit={7} scrollIndicator={true} searchable>
          <MenuGroup groupValue='Group 1'>
            {searchItems.map((item) => (
              <MenuItem key={item} label={item} value={item} name='Group 1' useInput='checkbox' />
            ))}
          </MenuGroup>
          <MenuDivider />
          <MenuGroup groupValue='Group 2'>
            {searchItems.map((item) => (
              <MenuItem key={item} label={item} value={item} name='Group 2' useInput='checkbox' />
            ))}
          </MenuGroup>
        </Menu>
      </div>
    </div>
  );
};

export const DemoTriggerMenu = (props: Props) => {
  const [isOpen, setIsOpen] = React.useState(true);
  return (
    <div className='mb-96 flex gap-4'>
      <div className='not-prose relative w-64 bg-white'>
        <Menu size='sm' isOpen={isOpen} overflowLimit={5} scrollIndicator={true} trigger={<button>Trigger</button>}>
          {searchItems.map((item) => (
            <MenuItem key={item} label={item} value={item} onChange={(e) => console.log(e)} />
          ))}
        </Menu>
      </div>
    </div>
  );
};
