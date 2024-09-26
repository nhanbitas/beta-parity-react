'use client';

import React from 'react';
import { Tag } from '@libComponents/Tag';
import { Container } from 'lucide-react';
import Image from 'next/image';

type Props = {};

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
  return (
    <>
      {/* filled */}
      <div className='not-prose flex flex-wrap gap-2'>
        {Object.keys(colorMap).map((color: any) => (
          <Tag key={color} color={color} label={color} onRemove={() => console.log(color)} />
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
            label={color}
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
            label={sizeMap[size as keyof typeof sizeMap]}
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
      </div>
    </>
  );
};
