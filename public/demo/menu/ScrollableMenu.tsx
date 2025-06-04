'use client';

import React from 'react';
import { Menu, MenuItem } from 'beta-parity-react/ui/Menu';
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

export const ScrollableMenu = (props: any) => {
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
