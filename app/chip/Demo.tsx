'use client';

import React from 'react';
import { Chip } from '@libComponents/Chip';
import { CarFront, Container } from 'lucide-react';
import Image from 'next/image';
import { Dropdown, DropdownContent, DropdownItem, DropdownTrigger } from '@libComponents/Dropdown';

type Props = {};

const colorMap = {
  gray: 'gray',
  orange: 'orange',
  sky: 'sky',
  violet: 'violet',
  green: 'green',
  red: 'red',
  yellow: 'yellow',
  blue: 'blue'
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
          <Chip key={color} color={color} label={color} onClick={() => alert(`${color} chip is clicked`)} />
        ))}
      </div>
      {/* outline */}
      <div className='not-prose flex flex-wrap gap-2'>
        {Object.keys(colorMap).map((color: any) => (
          <Chip
            key={color}
            type='button'
            kind='outline'
            icon={<Container />}
            color={color}
            label={color}
            onClick={() => alert(`${color} outline chip is clicked`)}
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
                className='rounded-full'
                width={20}
                height={20}
                src='https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
              />
            }
            color={color}
            label='John Smith'
            onClick={() => alert(`${color} chip with avatar is clicked`)}
          />
        ))}
      </div>
      {/* sizes */}
      <div className='not-prose flex flex-wrap gap-2'>
        {Object.keys(sizeMap).map((size: any) => (
          <Chip
            key={size}
            type='button'
            kind='outline'
            size={size}
            label={sizeMap[size as keyof typeof sizeMap]}
            onClick={() => alert(`${sizeMap[size as keyof typeof sizeMap]} chip is clicked`)}
          />
        ))}
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
    </>
  );
};
export const DemoCheckbox = () => {
  return (
    <>
      {/* uncontrol */}
      <div className='not-prose flex flex-wrap gap-2'>
        {Object.keys(colorMap).map((color: any) => (
          <Chip
            type='checkbox'
            key={color}
            value={color}
            color={color}
            label={color}
            onChange={(e) => console.log(e)}
          />
        ))}
      </div>

      {/* control */}
      <div className='not-prose flex flex-wrap gap-2'>
        {Object.keys(colorMap).map((color: any) => (
          <Chip type='checkbox' key={color} value={color} color={color} label={color} icon={<Container />} checked />
        ))}
      </div>

      {/* sizes */}
      <div className='not-prose flex flex-wrap gap-2'>
        {Object.keys(sizeMap).map((size: any) => (
          <Chip
            key={size}
            value={size}
            type='checkbox'
            kind='outline'
            size={size}
            checked
            label={sizeMap[size as keyof typeof sizeMap]}
          />
        ))}
      </div>
    </>
  );
};

export const DemoDropdown = () => {
  return (
    <>
      {/* uncontrol */}
      <div className='not-prose flex flex-wrap gap-2'>
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
      {/* control */}
      <div className='not-prose flex flex-wrap gap-2'>
        {Object.keys(colorMap).map((color: any) => (
          <Chip type='dropdown' key={color} value={color} color={color} label={color} icon={<Container />} isActive />
        ))}
      </div>
      {/* sizes */}
      <div className='not-prose flex flex-wrap gap-2'>
        {Object.keys(sizeMap).map((size: any) => (
          <Chip
            key={size}
            value={size}
            type='dropdown'
            kind='outline'
            size={size}
            isActive={false}
            label={sizeMap[size as keyof typeof sizeMap]}
          />
        ))}
      </div>
    </>
  );
};

export const DemoInput = () => {
  return (
    <>
      {/* input */}
      <div className='not-prose flex flex-wrap gap-2'>
        {Object.keys(colorMap).map((color: any) => (
          <Chip
            type='input'
            key={color}
            value={color}
            color={color}
            label={color}
            onClick={() => console.log('click')}
            onRemove={() => console.log('remove')}
          />
        ))}
      </div>
      {/* input with icon*/}
      <div className='not-prose flex flex-wrap gap-2'>
        {Object.keys(colorMap).map((color: any) => (
          <Chip
            type='input'
            key={color}
            icon={<Container />}
            value={color}
            color={color}
            label={color}
            onClick={() => console.log('click')}
            onRemove={() => console.log('remove')}
          />
        ))}
      </div>
      {/* sizes */}
      <div className='not-prose flex flex-wrap gap-2'>
        {Object.keys(sizeMap).map((size: any) => (
          <Chip
            key={size}
            value={size}
            type='input'
            kind='outline'
            size={size}
            label={sizeMap[size as keyof typeof sizeMap]}
            onClick={() => console.log('click')}
            onRemove={() => console.log('remove')}
          />
        ))}
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
            color='sky'
            icon={<CarFront />}
            key={item}
            value={item}
            label={item}
            checked={value == item || false}
            onChange={(e) => setValue(e.value as string)}
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
            color='red'
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
    </>
  );
};

export const DemoRemoveChip = () => {
  const [value, setValue] = React.useState(values);
  console.log(value);
  return (
    <>
      <div className='not-prose flex min-h-8 w-[300px] flex-wrap gap-2 rounded-md bg-gray-100 p-1'>
        {value.map((item) => (
          <Chip
            type='input'
            color='green'
            size='sm'
            key={item}
            value={item}
            label={item}
            onClick={() => console.log('click')}
            onRemove={() => setValue((pre) => pre.filter((i) => i !== item))}
          />
        ))}
      </div>
    </>
  );
};

export const DemoSelectDropdown = (props: Props) => {
  const [value, setValue] = React.useState('Ford');
  const [active, setActive] = React.useState(false);
  const handleClick = (e: any) => {
    setValue(e);
    setActive(false);
  };
  const activeClick = (e: any) => {
    setActive(true);
  };
  console.log(active);
  return (
    <Dropdown className='not-prose w-64 bg-white'>
      <DropdownTrigger onClick={activeClick}>
        <Chip type='dropdown' value={value} icon={<CarFront />} label={value} isActive={active} color='violet' />
      </DropdownTrigger>
      <DropdownContent clickToClose={true}>
        {values.map((item) => (
          <DropdownItem
            key={item}
            onClick={() => handleClick(item)}
            style={{ color: item === value ? 'violet' : 'black' }}
          >
            {item}
          </DropdownItem>
        ))}
      </DropdownContent>
    </Dropdown>
  );
};
