'use client';

import { Settings2 } from 'lucide-react';
import { SearchInput } from '@libComponents/SearchInput';
import React from 'react';
import { Menu, MenuItem } from '@libComponents/Menu';

type Props = any;

const searchItems = [
  'Filter 1',
  'Filter 2',
  'Filter 3',
  'Filter 4',
  'Filter 5',
  'Filter 6',
  'Filter 7',
  'Filter 8',
  'Filter 9',
  'Filter 10'
] as const;

export const DemoBasicSearchInput = (props: Props) => {
  const [value, setValue] = React.useState('');

  const handleChange = (e: any) => {
    setValue(e.target.value);
  };

  const handleSearch = () => console.log('Search ' + value + ' ...');

  return (
    <SearchInput
      wrapperProps={{ className: '!w-96', ...props.wrapperProps }}
      placeholder='Enter your search'
      onChange={handleChange}
      onSearch={handleSearch}
      {...props}
    />
  );
};

export const DemoAuxiliarySearchInput = (props: Props) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [values, setValues] = React.useState<string[]>([]);
  const ref = React.useRef<any>(null);

  const handleChange = (value: any) => {
    if (!value) return;

    if (values.includes(value)) {
      setValues(values.filter((item) => item !== value));
    } else {
      setValues([...values, value]);
    }

    setIsOpen(!isOpen);
    console.log(values);
  };

  return (
    <>
      <SearchInput
        ref={ref}
        auxiliaryActive={isOpen || (values && values.length > 0)}
        wrapperProps={{ className: '!w-96', ...props.wrapperProps }}
        placeholder='Enter your search'
        onSearch={() => console.log('Search')}
        onAuxiliaryAction={() => setIsOpen(!isOpen)}
        auxiliaryIcon={<Settings2 />}
        {...props}
      />

      <Menu
        anchor={ref.current}
        className='max-h-[200px] max-w-96'
        size='sm'
        isOpen={isOpen}
        scrollIndicator={true}
        prominence='pronounced'
      >
        {searchItems.map((item) => (
          <MenuItem onChange={(e: any) => handleChange(e.target.value)} key={item} label={item} value={item} />
        ))}
      </Menu>
    </>
  );
};

export const DemoShortCutsSearchInput = (props: Props) => {
  const [value, setValue] = React.useState('');

  const handleChange = (e: any) => {
    setValue(e.target.value);
  };

  const handleSearch = () => console.log('Search ' + value + ' ...');

  return (
    <SearchInput
      wrapperProps={{ className: '!w-96', ...props.wrapperProps }}
      placeholder='Enter your search'
      onChange={handleChange}
      onSearch={handleSearch}
      {...props}
    />
  );
};
