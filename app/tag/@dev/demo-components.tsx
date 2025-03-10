'use client';

import React from 'react';
import { Tag } from 'beta-parity-react/ui/Tag';
import { Container } from 'lucide-react';
import Image from 'next/image';

type Props = {
  theme?: 'light' | 'dark';
};

const colorMap = {
  neutral: 'gray',
  accent: 'blue'
} as const;

const sizeMap = {
  sm: 'small',
  md: 'medium',
  lg: 'large'
};

export const DemoButtonTag = (props: Props) => {
  const { theme = 'light' } = props;
  return (
    <div className={`flex flex-col gap-4 rounded-md p-4 ${theme === 'dark' ? 'bg-gray-950' : ''}`} data-scheme={theme}>
      {/* filled */}
      <div className='not-prose flex flex-wrap gap-2'>
        {Object.keys(colorMap).map((color: any) => (
          <Tag
            key={color}
            color={color}
            label={color.charAt(0).toUpperCase() + color.slice(1)}
            onRemove={() => console.log(color)}
          />
        ))}
      </div>
      {/* outline */}
      <div className='not-prose flex flex-wrap gap-2'>
        {Object.keys(colorMap).map((color: any) => (
          <Tag
            key={color}
            type='button'
            kind='glass'
            icon={<Container />}
            color={color}
            label={color.charAt(0).toUpperCase() + color.slice(1)}
            onRemove={() => console.log(color)}
          />
        ))}
      </div>
      {/* outline */}
      <div className='not-prose flex flex-wrap gap-2'>
        {Object.keys(colorMap).map((color: any) => (
          <Tag
            key={color}
            type='button'
            icon={
              <Image
                alt='Tag-avatar'
                width={20}
                height={20}
                src='https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
              />
            }
            color={color}
            label='John Smith'
            onRemove={() => console.log(color)}
          />
        ))}
      </div>
      {/* sizes */}
      <div className='not-prose flex flex-wrap gap-2'>
        {Object.keys(sizeMap).map((size: any) => (
          <Tag
            key={size}
            type='button'
            kind='glass'
            size={size}
            color='accent'
            label={
              sizeMap[size as keyof typeof sizeMap].charAt(0).toUpperCase() +
              sizeMap[size as keyof typeof sizeMap].slice(1)
            }
            onRemove={() => console.log(size)}
          />
        ))}
      </div>
      {/* disabled */}
      <div className='not-prose flex flex-wrap gap-2'>
        <Tag disabled kind='glass' label='Disabled' onRemove={() => console.log('disabled')} />
        <Tag
          disabled
          label='Disabled'
          icon={
            <Image
              alt='Tag-avatar'
              width={20}
              height={20}
              src='https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
            />
          }
          onRemove={() => console.log('image')}
        />
        <Tag disabled kind='glass' label='Disabled' color='accent' onRemove={() => console.log('disabled')} />
        <Tag
          disabled
          label='Disabled'
          color='accent'
          icon={
            <Image
              alt='Tag-avatar'
              width={20}
              height={20}
              src='https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
            />
          }
          onRemove={() => console.log('image')}
        />
      </div>
    </div>
  );
};
