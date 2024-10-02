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

export const DemoButtonChip = (props: Props) => {
  return (
    <>
      {/* filled */}
      <div className='not-prose flex flex-wrap gap-2'>
        {Object.keys(colorMap).map((color: any) => (
          <Chip key={color} color={color} label={color} onClick={() => console.log('click')} />
        ))}
      </div>
      {/* outline */}
      <div className='not-prose flex flex-wrap gap-2'>
        {Object.keys(colorMap).map((color: any) => (
          <Chip
            key={color}
            type='button'
            kind='glass'
            icon={<Container />}
            color={color}
            label={color}
            onClick={() => console.log('click')}
          />
        ))}
      </div>
      {/* outline */}
      <div className='not-prose flex flex-wrap gap-2'>
        {Object.keys(colorMap).map((color: any) => (
          <Chip
            key={color}
            type='button'
            icon={
              <Image
                alt='chip-avatar'
                width={20}
                height={20}
                src='https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
              />
            }
            color={color}
            label='John Smith'
            onClick={() => console.log('click')}
          />
        ))}
      </div>
      {/* sizes */}
      <div className='not-prose flex flex-wrap gap-2'>
        {Object.keys(sizeMap).map((size: any) => (
          <Chip
            key={size}
            type='button'
            kind='glass'
            size={size}
            label={sizeMap[size as keyof typeof sizeMap]}
            icon={
              <Image
                alt='chip-avatar'
                width={20}
                height={20}
                src='https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
              />
            }
            onClick={() => console.log('click')}
          />
        ))}
      </div>
      {/* disabled */}
      <div className='not-prose flex flex-wrap gap-2'>
        <Chip disabled kind='glass' label='Disabled' onClick={() => console.log('click')} />
        <Chip
          disabled
          label='Disabled'
          icon={
            <Image
              alt='chip-avatar'
              width={20}
              height={20}
              src='https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
            />
          }
          onClick={() => console.log('click')}
        />
      </div>
    </>
  );
};

export const DemoRadio = () => {
  return (
    <>
      <div className='not-prose flex flex-wrap gap-2'>
        {Object.keys(colorMap).map((color: any) => (
          <Chip type='radio' key={color} value={color} color={color} label={color} onChange={(e) => console.log(e)} />
        ))}
      </div>
      <div className='not-prose flex flex-wrap gap-2'>
        {Object.keys(colorMap).map((color: any) => (
          <Chip
            type='radio'
            key={color}
            kind='glass'
            value={color}
            color={color}
            label={color}
            defaultChecked={true}
            onChange={(e) => console.log(e)}
          />
        ))}
      </div>
      <div className='not-prose flex flex-wrap gap-2'>
        <Chip disabled label='Disabled' type='radio' />
        <Chip disabled label='Disabled' kind='glass' type='radio' />
        <Chip disabled label='Disabled' type='radio' checked />
        <Chip disabled label='Disabled' kind='glass' type='radio' checked />
      </div>
    </>
  );
};

export const DemoCheckbox = () => {
  return (
    <>
      <div className='not-prose flex flex-wrap gap-2'>
        {Object.keys(colorMap).map((color: any) => (
          <Chip
            type='checkbox'
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
          <Chip
            type='checkbox'
            kind='glass'
            key={color}
            value={color}
            color={color}
            label={color}
            onChange={(e) => console.log(e)}
          />
        ))}
      </div>

      <div className='not-prose flex flex-wrap gap-2'>
        {Object.keys(colorMap).map((color: any) => (
          <Chip type='checkbox' key={color} value={color} color={color} label={color} icon={<Container />} />
        ))}
      </div>

      <div className='not-prose flex flex-wrap gap-2'>
        {Object.keys(sizeMap).map((size: any) => (
          <Chip
            key={size}
            value={size}
            type='checkbox'
            kind='glass'
            size={size}
            defaultChecked={true}
            label={sizeMap[size as keyof typeof sizeMap]}
            icon={<Container />}
          />
        ))}
      </div>
      <div className='not-prose flex flex-wrap gap-2'>
        <Chip disabled label='Disabled' type='checkbox' checked />
        <Chip disabled label='Disabled' kind='glass' type='checkbox' checked />
        <Chip disabled label='Disabled' type='checkbox' />
        <Chip disabled label='Disabled' kind='glass' type='checkbox' />
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
            isActive={false}
            label={sizeMap[size as keyof typeof sizeMap]}
          />
        ))}
      </div>
      <div className='not-prose flex flex-wrap gap-2'>
        <Chip disabled label='Disabled' type='dropdown' />
      </div>
    </>
  );
};

const values = ['Toyota', 'Ford', 'Mazda', 'Vinfast', 'Mercedes', 'BMW'];

export const DemoSingleFilter = () => {
  const [value, setValue] = React.useState('Toyota');
  console.log(value);
  return (
    <>
      <div className='not-prose flex flex-wrap gap-2'>
        {values.map((item) => (
          <Chip
            type='radio'
            icon={<CarFront />}
            key={item}
            value={item}
            label={item}
            checked={value == item || false}
            onChange={(e) => {
              setValue(e.value as string);
              console.log(e);
            }}
          />
        ))}
      </div>
      <div className='not-prose flex flex-wrap gap-2'>
        {values.map((item) => (
          <Chip
            type='radio'
            icon={<CarFront />}
            key={item}
            value={item}
            label={item}
            checked={value == item || false}
            kind='glass'
            color='accent'
            onChange={(e) => {
              setValue(e.value as string);
              console.log(e);
            }}
          />
        ))}
      </div>
    </>
  );
};

export const DemoMultiFilter = () => {
  const [value, setValue] = React.useState(['Toyota', 'Ford']);
  console.log(value);
  return (
    <>
      <div className='not-prose flex flex-wrap gap-2'>
        {values.map((item) => (
          <Chip
            type='checkbox'
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
            type='checkbox'
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
  const { kind = 'outline' } = props;
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
            checked={item === value}
          />
        ))}
      </Menu>
    </div>
  );
};
