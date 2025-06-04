'use client';
import { Tabs as ParityTabs } from 'beta-parity-react/ui/Tabs';
import { HomeIcon } from 'lucide-react';
import React from 'react';

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

export const TabsAlternative = () => {
  return (
    <>
      <ParityTabs data={mockTabs} side='top' theme='alternative' className='mt-8' />
      <ParityTabs data={mockTabs} side='bottom' theme='alternative' className='mt-8' />
      <ParityTabs data={mockTabs} side='left' theme='alternative' className='mt-8' />
      <ParityTabs data={mockTabs} side='right' theme='alternative' className='mt-8' />
    </>
  );
};
