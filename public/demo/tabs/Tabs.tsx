'use client';
import { TabButton, TabContent, Tabs as ParityTabs } from 'beta-parity-react/ui/Tabs';
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

export const Tabs = (props: Props) => {
  return (
    <>
      <ParityTabs
        data={Array(40)
          .fill(1)
          .map((_, i) => ({
            value: `Tab-${i + 1}`,
            title: (
              <span className='flex items-center gap-2'>
                <HomeIcon /> {`Tab ${i + 1}`}
              </span>
            ),
            content: `Content for tab ${i + 1}`
          }))}
        side='top'
        className='mt-8'
        {...props}
      />
      <ParityTabs data={mockTabs} side='bottom' className='mt-8' {...props} />
      <ParityTabs data={mockTabs} side='left' className='mt-8' {...props} />
      <ParityTabs data={mockTabs} side='right' className='mt-8' {...props} />
    </>
  );
};
