'use client';

import React from 'react';
import { Menu, MenuItem, MenuDivider, MenuGroup } from '@libComponents/Menu';
import { CarFront, FlagTriangleRightIcon } from 'lucide-react';

type Props = {};

export const DemoBasicMenu = (props: Props) => {
  const [isOpen, setIsOpen] = React.useState(true);
  return (
    <div className='mb-96 flex gap-4'>
      <div className='not-prose relative  w-64 bg-white'>
        <Menu
          size='sm'
          isOpen={isOpen}
          header={
            <div className='flex h-full items-center gap-1'>
              <FlagTriangleRightIcon style={{ color: 'red' }} /> This is a header
            </div>
          }
          footer={
            <div className='flex h-full items-center gap-1'>
              <FlagTriangleRightIcon style={{ color: 'skyblue' }} /> This is a footer
            </div>
          }
        >
          <MenuItem checkmarkSide='right' selected={true}>
            Item 1
          </MenuItem>
          <MenuItem checkmarkSide='left' selected={true}>
            Item 2
          </MenuItem>
          <MenuItem>Item 3</MenuItem>
          <MenuItem>Item 4</MenuItem>
        </Menu>
      </div>

      <div className='not-prose relative w-64 bg-white'>
        <Menu searchable={true} size='md' isOpen={isOpen} searchPlaceholder='Search...'>
          <MenuItem checkmarkSide='right' selected={true} icon={<CarFront />} value={'Item 1'}>
            Item 1
          </MenuItem>
          <MenuItem checkmarkSide='left' selected={true} icon={<CarFront />} value={'Item 2'}>
            Item 2
          </MenuItem>
          <MenuItem icon={<CarFront />} value={'Item 3'}>
            Item 3
          </MenuItem>
          <MenuItem icon={<CarFront />} value={'Item 4'}>
            Item 4
          </MenuItem>
        </Menu>
      </div>

      <div className='not-prose relative w-64 bg-white'>
        <Menu size='lg' isOpen={isOpen}>
          <MenuItem checkmarkSide='right' selected>
            Item 1
          </MenuItem>
          <MenuItem checkmarkSide='left' selected>
            Item 2
          </MenuItem>
          <MenuItem>Item 3</MenuItem>
          <MenuItem>Item 4</MenuItem>
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
            <MenuItem key={item} label={item} value={item} />
          ))}
        </Menu>
      </div>
      <div className='not-prose relative w-64 bg-white'>
        <Menu size='md' isOpen={isOpen} overflowLimit={5} scrollIndicator={true} useInput={true} type='multi-select'>
          {searchItems.map((item) => (
            <MenuItem key={item} label={item} value={item} />
          ))}
        </Menu>
      </div>
      <div className='not-prose relative w-64 bg-white'>
        <Menu size='lg' isOpen={isOpen} overflowLimit={5} scrollIndicator={true} searchable useInput={true}>
          {searchItems.map((item) => (
            <MenuItem key={item} label={item} value={item} name='radio-dropdown' />
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
              <MenuItem key={item} label={item} value={item} checkmarkSide='left' selected />
            ))}
          </MenuGroup>
          <MenuDivider />
          <MenuGroup groupValue='Group 2'>
            {searchItems.map((item) => (
              <MenuItem key={item} label={item} value={item} checkmarkSide='right' selected />
            ))}
          </MenuGroup>
        </Menu>
      </div>

      <div className='not-prose relative w-64 bg-white'>
        <Menu size='md' isOpen={isOpen} overflowLimit={5} scrollIndicator={true} searchable useInput={true}>
          <MenuGroup groupValue='Group 1'>
            {searchItems.map((item) => (
              <MenuItem key={item} label={item} value={item} name='Group 1' />
            ))}
          </MenuGroup>
          <MenuDivider />
          <MenuGroup groupValue='Group 2'>
            {searchItems.map((item) => (
              <MenuItem key={item} label={item} value={item} name='Group 2' />
            ))}
          </MenuGroup>
        </Menu>
      </div>

      <div className='not-prose relative w-64 bg-white'>
        <Menu
          size='lg'
          isOpen={isOpen}
          overflowLimit={7}
          scrollIndicator={true}
          searchable
          useInput={true}
          type='multi-select'
        >
          <MenuGroup groupValue='Group 1'>
            {searchItems.map((item) => (
              <MenuItem key={item} label={item} value={item} name='Group 1' />
            ))}
          </MenuGroup>
          <MenuDivider />
          <MenuGroup groupValue='Group 2'>
            {searchItems.map((item) => (
              <MenuItem key={item} label={item} value={item} name='Group 2' />
            ))}
          </MenuGroup>
        </Menu>
      </div>
    </div>
  );
};
