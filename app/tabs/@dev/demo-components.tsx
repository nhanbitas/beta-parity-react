'use client';

import { TabButton, TabContent, Tabs } from '@libComponents/Tabs';
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

export const DemoTabs = (props: Props) => {
  return (
    <>
      <Tabs
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
      <Tabs data={mockTabs} side='bottom' className='mt-8' {...props} />
      <Tabs data={mockTabs} side='left' className='mt-8' {...props} />
      <Tabs data={mockTabs} side='right' className='mt-8' {...props} />
    </>
  );
};

export const DemoAccentTabs = (props: Props) => {
  return (
    <>
      <Tabs data={mockTabs} flipped color='accent' size='sm' side='top' className='mt-8' {...props} />
      <Tabs data={mockTabs} flipped color='accent' size='sm' side='bottom' className='mt-8' {...props} />
      <Tabs data={mockTabs} flipped color='accent' size='sm' side='left' className='mt-8' {...props} />
      <Tabs
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

export const DemoTabsWithChildren = (props: Props) => {
  return (
    <Tabs>
      <TabButton value='tab-1'>Tab 1</TabButton>
      <TabButton value='tab-2'>Tab 2</TabButton>
      <TabButton value='tab-3' disabled>
        Tab 3
      </TabButton>
      <TabButton value='tab-4'>Tab 4</TabButton>

      <TabContent value='tab-1'>
        <p>Content 1</p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt utlabore et dolore
          magna aliqua.
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt utlabore et dolore
          magna aliqua.
        </p>
      </TabContent>
      <TabContent value='tab-2'>
        <p>Content 2</p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt utlabore et dolore
          magna aliqua.
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt utlabore et dolore
          magna aliqua.
        </p>
      </TabContent>
      <TabContent value='tab-3'>
        <p>Content 2</p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt utlabore et dolore
          magna aliqua.
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt utlabore et dolore
          magna aliqua.
        </p>
      </TabContent>
      <TabContent value='tab-4'>
        <p>Content 2</p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt utlabore et dolore
          magna aliqua.
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt utlabore et dolore
          magna aliqua.
        </p>
      </TabContent>
    </Tabs>
  );
};
