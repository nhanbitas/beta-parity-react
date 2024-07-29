'use client';

import React from 'react';
import { Dropdown, DropdownItem, DropdownDivider, DropdownGroup } from '@libComponents/Dropdown';
import { CarFront } from 'lucide-react';
import { Checkbox, CheckboxGroup } from '@libComponents/Checkbox';
import { Radio } from '@libComponents/Radio';

type Props = {};

export const DemoBasicDropdown = (props: Props) => {
  const [isOpen, setIsOpen] = React.useState(true);
  return (
    <div className='mb-96 flex gap-4'>
      <div className='not-prose relative  w-64 bg-white'>
        <Dropdown size='sm' isOpen={isOpen}>
          <DropdownItem iconSide='right' selected={true}>
            Item 1
          </DropdownItem>
          <DropdownItem iconSide='left' selected={true}>
            Item 2
          </DropdownItem>
          <DropdownItem>Item 3</DropdownItem>
          <DropdownDivider />
          <DropdownItem>Item 4</DropdownItem>
        </Dropdown>
      </div>

      <div className='not-prose relative w-64 bg-white'>
        <Dropdown searchable={true} size='md' isOpen={isOpen} searchPlaceholder='Search...'>
          <DropdownItem iconSide='right' selected={true} icon={<CarFront />} value={'Item 1'}>
            Item 1
          </DropdownItem>
          <DropdownItem iconSide='left' selected={true} icon={<CarFront />} value={'Item 2'}>
            Item 2
          </DropdownItem>
          <DropdownItem icon={<CarFront />} value={'Item 3'}>
            Item 3
          </DropdownItem>
          <DropdownDivider />
          <DropdownItem icon={<CarFront />} value={'Item 4'}>
            Item 4
          </DropdownItem>
        </Dropdown>
      </div>

      <div className='not-prose relative w-64 bg-white'>
        <Dropdown size='lg' isOpen={isOpen}>
          <DropdownItem iconSide='right' selected>
            Item 1
          </DropdownItem>
          <DropdownItem iconSide='left' selected>
            Item 2
          </DropdownItem>
          <DropdownItem>Item 3</DropdownItem>
          <DropdownDivider />
          <DropdownItem>Item 4</DropdownItem>
        </Dropdown>
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

export const DemoScrollableDropdown = (props: Props) => {
  const [isOpen, setIsOpen] = React.useState(true);

  return (
    <div className='mb-96 flex gap-4'>
      <div className='not-prose relative w-64 bg-white'>
        <Dropdown size='sm' isOpen={isOpen} limit={5} scrollIndicator={true}>
          {searchItems.map((item) => (
            <DropdownItem key={item} label={item} value={item} />
          ))}
        </Dropdown>
      </div>
      <div className='not-prose relative w-64 bg-white'>
        <Dropdown size='md' isOpen={isOpen} limit={5} scrollIndicator={true}>
          {searchItems.map((item) => (
            <Checkbox key={item} label={item} value={item} />
          ))}
        </Dropdown>
      </div>
      <div className='not-prose relative w-64 bg-white'>
        <Dropdown size='lg' isOpen={isOpen} limit={5} scrollIndicator={true} searchable>
          {searchItems.map((item) => (
            <Radio key={item} label={item} value={item} name='radio-dropdown' />
          ))}
        </Dropdown>
      </div>
    </div>
  );
};

export const DemoDropdownGroup = (props: Props) => {
  const [isOpen, setIsOpen] = React.useState(true);
  return (
    <div className='mb-96 flex gap-4'>
      <div className='not-prose relative w-64 bg-white'>
        <Dropdown size='sm' isOpen={isOpen} limit={5} scrollIndicator={true} searchable style={{ maxHeight: '300px' }}>
          <DropdownGroup groupValue='Group 1'>
            {searchItems.map((item) => (
              <DropdownItem key={item} label={item} value={item} />
            ))}
          </DropdownGroup>

          <DropdownGroup groupValue='Group 2'>
            {searchItems.map((item) => (
              <DropdownItem key={item} label={item} value={item} />
            ))}
          </DropdownGroup>
        </Dropdown>
      </div>

      <div className='not-prose relative w-64 bg-white'>
        <Dropdown size='md' isOpen={isOpen} limit={5} scrollIndicator={true} searchable>
          <DropdownGroup groupValue='Group 1'>
            {searchItems.map((item) => (
              <Radio key={item} label={item} value={item} name='Group 1' />
            ))}
          </DropdownGroup>

          <DropdownGroup groupValue='Group 2'>
            {searchItems.map((item) => (
              <Radio key={item} label={item} value={item} name='Group 2' />
            ))}
          </DropdownGroup>
        </Dropdown>
      </div>

      <div className='not-prose relative w-64 bg-white'>
        <Dropdown size='lg' isOpen={isOpen} limit={9} scrollIndicator={true} searchable>
          <CheckboxGroup
            value='Group 1'
            label='Group 1'
            tree={searchItems.map((item) => {
              return { label: item, value: item };
            })}
          />

          <DropdownGroup groupValue='Group 2'>
            {searchItems.map((item) => (
              <Checkbox key={item} label={item} value={item} name='Group 2' />
            ))}
          </DropdownGroup>
        </Dropdown>
      </div>
    </div>
  );
};
