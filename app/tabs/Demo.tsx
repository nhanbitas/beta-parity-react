import { Tabs } from '@libComponents/Tabs';
import { HomeIcon } from 'lucide-react';
import React from 'react';

type Props = {};

const mockTabs = [
  {
    id: '1',
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
    id: '2',
    title: (
      <span className='flex items-center gap-2'>
        <HomeIcon /> Tab 2
      </span>
    ),
    content: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.'
  },
  {
    id: '3',
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
    id: '4',
    title: (
      <span className='flex items-center gap-2'>
        <HomeIcon /> Tab 4
      </span>
    ),
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt utlabore et dolore magna aliqua.'
  }
];

export const DemoTabs = (props: Props) => {
  return (
    <>
      <Tabs data={mockTabs} side='top' className='mt-8' {...props} />
      <Tabs data={mockTabs} side='bottom' flip className='mt-8' {...props} />
      <Tabs data={mockTabs} side='left' className='mt-8' {...props} />
      <Tabs data={mockTabs} side='right' flip className='mt-8' {...props} />
    </>
  );
};

export const DemoAccentTabs = (props: Props) => {
  return (
    <>
      <Tabs data={mockTabs} color='accent' size='sm' side='top' className='mt-8' {...props} />
      <Tabs data={mockTabs} color='accent' size='sm' side='bottom' className='mt-8' {...props} />
      <Tabs data={mockTabs} color='accent' size='sm' side='left' flip className='mt-8' {...props} />
      <Tabs data={mockTabs} color='accent' size='sm' side='right' flip className='mt-8' {...props} />
    </>
  );
};
