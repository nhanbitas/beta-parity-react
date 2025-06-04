'use client';

import React from 'react';
import { Menu, MenuItem, MenuDivider, MenuGroup } from 'beta-parity-react/ui/Menu';
import { Button } from 'beta-parity-react/ui/Button';

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

export const MenuGroupDemo = (props: any) => {
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
