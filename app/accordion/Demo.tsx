'use client';

import { Accordion } from '@libComponents/Accordion';
import React from 'react';

type Props = {};

export const DemoSingle = (props: Props) => (
  <Accordion type='single' collapsible onValueChange={(value) => console.log(value)} items={accordionItems} />
);

export const DemoMulti = (props: Props) => (
  <Accordion type='multiple' onValueChange={(value) => console.log(value)} items={accordionItems} />
);
export const accordionItems = [
  {
    value: 'item-1',
    title: 'Is it accessible?',
    content: 'Yes. It adheres to the WAI-ARIA design pattern.',
    key: 'item-1'
  },
  {
    value: 'item-2',
    title: 'Is it unstyled?',
    content: 'Yes. Its unstyled by default, giving you freedom over the look and feel.',
    key: 'item-2'
  },
  {
    value: 'item-3',
    title: 'Can it be animated?',
    content: 'Yes! You can animate the Accordion with CSS or JavaScript.',
    key: 'item-3'
  }
];
