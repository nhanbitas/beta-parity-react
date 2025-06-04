'use client';

import React from 'react';
import { Chip } from 'beta-parity-react/ui/Chip';
import { CarFront } from 'lucide-react';
import { Menu, MenuItem } from 'beta-parity-react/ui/Menu';

const values = ['Toyota', 'Ford', 'Mazda', 'Vinfast', 'Mercedes', 'BMW'];

export const SelectMenu = (props: any) => {
  const { kind = 'outlined' } = props;
  const [value, setValue] = React.useState('');
  const [active, setActive] = React.useState(false);
  const ref = React.useRef<any>(null);

  const handleClick = (e: any) => {
    setValue(e);
    setActive(false);
  };

  return (
    <div className='relative w-56'>
      <Chip
        ref={ref}
        type='dropdown'
        value={value}
        label={value || 'Select'}
        color='accent'
        kind={kind}
        icon={<CarFront />}
        isActive={active}
        onChange={(e: any) => setActive(e.active)}
      />
      <Menu anchor={ref.current} className='not-prose !w-fit bg-white' isOpen={active}>
        {['', ...values].map((item) => (
          <MenuItem
            icon={item && <CarFront />}
            key={item}
            label={item || '-- All --'}
            onClick={() => handleClick(item)}
            checked={item === value && value !== ''}
          />
        ))}
      </Menu>
    </div>
  );
};
