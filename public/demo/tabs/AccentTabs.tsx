'use client';
import { Tabs as ParityTabs } from 'beta-parity-react/ui/Tabs';
import { HomeIcon } from 'lucide-react';
import React from 'react';

type Props = {};

const mockTabs = [
  {
    value: 'tab-1',
    title: (
      <span className='flex items-center gap-2'>
        <HomeIcon /> Tab 1
      </span>
    ),
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt utlabore et dolore magna aliqua. ',
    active: true
  },
  {
    value: 'tab-2',
    title: (
      <span className='flex items-center gap-2'>
        <HomeIcon /> Tab 2
      </span>
    ),
    content: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.'
  },
  {
    value: 'tab-3',
    title: (
      <span className='flex items-center gap-2'>
        <HomeIcon /> Tab 3
      </span>
    ),
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt utlabore et dolore magna aliqua.',
    disabled: true
  },
  {
    value: 'tab-4',
    title: (
      <span className='flex items-center gap-2'>
        <HomeIcon /> Tab 4
      </span>
    ),
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt utlabore et dolore magna aliqua.'
  }
];

export const AccentTabs = (props: Props) => {
  return (
    <>
      <ParityTabs data={mockTabs} flipped color='accent' size='sm' side='top' className='mt-8' {...props} />
      <ParityTabs data={mockTabs} flipped color='accent' size='sm' side='bottom' className='mt-8' {...props} />
      <ParityTabs data={mockTabs} flipped color='accent' size='sm' side='left' className='mt-8' {...props} />
      <ParityTabs
        data={mockTabs}
        indicatorSide='opposite'
        flipped
        color='accent'
        size='sm'
        side='right'
        className='mt-8'
        {...props}
      />
    </>
  );
};
