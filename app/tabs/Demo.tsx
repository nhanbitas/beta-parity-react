import { Tabs } from '@libComponents/Tabs';
import React from 'react';

type Props = {};

const mockTabs = [
  {
    id: '1',
    title: 'Tab 1',
    content: 'Tab 1 content'
  },
  {
    id: '2',
    title: 'Tab 2',
    content: 'Tab 2 content',
    active: true
  },
  {
    id: '3',
    title: 'Tab 3',
    content: 'Tab 3 content'
  },
  {
    id: '4',
    title: 'Tab 4',
    content: 'Tab 4 content'
  }
];

export const DemoTabs = (props: Props) => {
  return <Tabs data={mockTabs} className='flex flex-col gap-4' />;
};
