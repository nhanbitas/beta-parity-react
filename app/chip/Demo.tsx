'use client';

import React from 'react';
import { Chip } from '@libComponents/Chip';
import { CarFront, Container } from 'lucide-react';
import Image from 'next/image';
import { Menu, MenuItem } from '@libComponents/Menu';

type Props = {};

const colorMap = {
  neutral: 'neutral',
  accent: 'accent'
} as const;

const sizeMap = {
  sm: 'small',
  md: 'medium',
  lg: 'large'
};

export const DemoToggle = () => {
  return (
    <>
      <div className='not-prose flex flex-wrap gap-2'>
        {Object.keys(colorMap).map((color: any) => (
          <Chip
            key={color}
            value={color}
            color={color}
            label={color}
            onChange={(e) => console.log(e)}
            defaultChecked={true}
          />
        ))}
      </div>

      <div className='not-prose flex flex-wrap gap-2'>
        {Object.keys(colorMap).map((color: any) => (
          <Chip kind='glass' key={color} value={color} color={color} label={color} onChange={(e) => console.log(e)} />
        ))}
      </div>

      <div className='not-prose flex flex-wrap gap-2'>
        {Object.keys(colorMap).map((color: any) => (
          <Chip key={color} value={color} color={color} label={color} icon={<Container />} />
        ))}
      </div>

      <div className='not-prose flex flex-wrap gap-2'>
        {Object.keys(sizeMap).map((size: any) => (
          <Chip
            key={size}
            value={size}
            kind='glass'
            size={size}
            defaultChecked={true}
            label={sizeMap[size as keyof typeof sizeMap]}
            icon={<Container />}
          />
        ))}
      </div>
      <div className='not-prose flex flex-wrap gap-2'>
        <Chip disabled label='Disabled' checked />
        <Chip disabled label='Disabled' kind='glass' checked />
        <Chip disabled label='Disabled' />
        <Chip disabled label='Disabled' kind='glass' />
      </div>
    </>
  );
};

export const DemoMenu = () => {
  return (
    <>
      {/* unvalued */}
      <div className='not-prose flex flex-wrap gap-2'>
        <Chip type='dropdown' label='Options' onChange={(e) => console.log(e)} />
      </div>
      {/* valued */}
      <div className='not-prose flex flex-wrap gap-2'>
        {/* no icon */}
        {Object.keys(colorMap).map((color: any) => (
          <Chip
            type='dropdown'
            key={color}
            value={color}
            color={color}
            label={color}
            onChange={(e) => console.log(e)}
          />
        ))}
      </div>
      <div className='not-prose flex flex-wrap gap-2'>
        {/*  icon */}
        {Object.keys(colorMap).map((color: any) => (
          <Chip type='dropdown' key={color} value={color} color={color} label={color} icon={<Container />} />
        ))}
      </div>
      {/* sizes */}
      <div className='not-prose flex flex-wrap gap-2'>
        {Object.keys(sizeMap).map((size: any) => (
          <Chip
            key={size}
            value={size}
            type='dropdown'
            kind='glass'
            size={size}
            label={sizeMap[size as keyof typeof sizeMap]}
          />
        ))}
      </div>
      <div className='not-prose flex flex-wrap gap-2'>
        <Chip disabled label='Disabled' type='dropdown' />
        <Chip disabled kind='glass' label='Disabled' type='dropdown' />
        <Chip disabled label='Disabled' value={1} type='dropdown' color='accent' />
        <Chip disabled kind='glass' value={2} label='Disabled' type='dropdown' color='accent' />
      </div>
    </>
  );
};

const values = ['Toyota', 'Ford', 'Mazda', 'Vinfast', 'Mercedes', 'BMW'];

export const DemoMultiFilter = () => {
  const [value, setValue] = React.useState(['Toyota', 'Ford']);
  console.log(value);
  return (
    <>
      <div className='not-prose flex flex-wrap gap-2'>
        {values.map((item) => (
          <Chip
            color='accent'
            icon={<CarFront />}
            key={item}
            value={item}
            label={item}
            checked={value.includes(item)}
            onChange={(e) =>
              setValue(
                value.includes(e.value as string)
                  ? value.filter((i) => i !== e.value)
                  : ([...value, e.value] as string[])
              )
            }
          />
        ))}
      </div>
      <div className='not-prose flex flex-wrap gap-2'>
        {values.map((item) => (
          <Chip
            icon={<CarFront />}
            key={item}
            value={item}
            label={item}
            checked={value.includes(item)}
            kind='glass'
            color='neutral'
            onChange={(e) =>
              setValue(
                value.includes(e.value as string)
                  ? value.filter((i) => i !== e.value)
                  : ([...value, e.value] as string[])
              )
            }
          />
        ))}
      </div>
    </>
  );
};

export const DemoSelectMenu = (props: any) => {
  const { kind = 'outlined' } = props;
  const [value, setValue] = React.useState('');
  const [active, setActive] = React.useState(false);
  const ref = React.useRef<any>(null);

  const handleClick = (e: any) => {
    setValue(e);
    setActive(false);
  };

  console.group('Menu chip data');
  console.log('value =', value || undefined);
  console.log('active =', active);
  console.groupEnd();

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
