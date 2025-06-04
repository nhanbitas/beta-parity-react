'use client';
import React from 'react';
import { Settings2 } from 'lucide-react';
import { SearchInput } from 'beta-parity-react/ui/SearchInput';
import { Menu, MenuItem } from 'beta-parity-react/ui/Menu';

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

export const AuxiliarySearchInputDisabledSearchButton = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [values, setValues] = React.useState<string[]>([]);
  const ref = React.useRef<any>(null);
  const handleChange = (value: any) => {
    if (!value) return;
    if (values.includes(value)) setValues(values.filter((item) => item !== value));
    else setValues([...values, value]);
    setIsOpen(!isOpen);
  };
  return (
    <>
      <SearchInput
        ref={ref}
        auxiliaryActive={isOpen || (values && values.length > 0)}
        disabled
        searchButton
        value='This is disabled search input'
        placeholder='Placeholder'
        onSearch={() => {}}
        onAuxiliaryAction={() => setIsOpen(!isOpen)}
        auxiliaryIcon={<Settings2 />}
        wrapperProps={{ className: '!w-96' }}
      />
      <Menu
        anchor={ref.current}
        className='max-h-[200px] max-w-96'
        size='sm'
        isOpen={isOpen}
        scrollIndicator
        prominence='pronounced'
      >
        {searchItems.map((item) => (
          <MenuItem onChange={(e: any) => handleChange(e.target.value)} key={item} label={item} value={item} />
        ))}
      </Menu>
    </>
  );
};
