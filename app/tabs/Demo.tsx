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
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt utlabore et dolore magna aliqua.'
  },
  {
    id: '2',
    title: (
      <span className='flex items-center gap-2'>
        <HomeIcon /> Tab 2
      </span>
    ),
    content: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
    active: true
  },
  {
    id: '3',
    title: (
      <span className='flex items-center gap-2'>
        <HomeIcon /> Tab 3
      </span>
    ),
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt utlabore et dolore magna aliqua.'
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
      <Tabs data={mockTabs} direction='horizontal' className='mt-8 flex flex-col gap-4' />
      <Tabs data={mockTabs} direction='vertical' className='mt-8 flex flex-col gap-4' />
    </>
  );
};

export const DemoAccentTabs = (props: Props) => {
  return (
    <>
      <Tabs data={mockTabs} direction='horizontal' color='accent' className='mt-8 flex flex-col gap-4' />
      <Tabs data={mockTabs} direction='vertical' color='accent' className='mt-8 flex flex-col gap-4' />
    </>
  );
};
