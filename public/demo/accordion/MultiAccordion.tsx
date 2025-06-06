'use client';

import { Accordion } from 'beta-parity-react/ui/Accordion';
import React from 'react';

type Props = {};

export const accordionItems = [
  {
    value: 'item-1',
    title: 'Is it accessible?',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt utlabore et dolore magna aliqua.'
  },
  {
    value: 'item-2',
    title: 'Is it unstyled?',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt utlabore et dolore magna aliqua.'
  },
  {
    value: 'item-3',
    title: 'Can it be animated?',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt utlabore et dolore magna aliqua.',
    itemProps: {
      onClick: () => console.log('click')
    }
  }
];

export const MultiAccordion = (props: Props) => {
  return (
    <div className='flex flex-col gap-8'>
      <Accordion
        items={accordionItems}
        defaultValue='item-2'
        type='multiple'
        onChange={(value) => console.log(value)}
        {...props}
      />

      <Accordion
        items={accordionItems}
        defaultValue='item-2'
        type='multiple'
        kind='flush'
        onChange={(value) => console.log(value)}
        {...props}
      />
    </div>
  );
};
