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
          <MenuItem>Item 1</MenuItem>
          <MenuItem>Item 2</MenuItem>
          <MenuItem>Item 3</MenuItem>
          <MenuItem>Item 4</MenuItem>
        </Menu>
      </div>

      <div className='not-prose relative w-64 bg-white'>
        <Menu searchable={true} size='md' isOpen={isOpen} searchPlaceholder='Search...'>
          <MenuItem icon={<CarFront />} value={'Item 1'}>
            Item 1
          </MenuItem>
          <MenuItem icon={<CarFront />} value={'Item 2'}>
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
          <MenuItem checkmarkSide='left'>Item 1</MenuItem>
          <MenuItem checkmarkSide='left'>Item 2</MenuItem>
          <MenuItem checkmarkSide='left'>Item 3</MenuItem>
          <MenuItem checkmarkSide='left'>Item 4</MenuItem>
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
