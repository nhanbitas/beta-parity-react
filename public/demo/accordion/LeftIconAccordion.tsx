'use client';

import { Accordion } from 'beta-parity-react/ui/Accordion';
import React from 'react';

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

export const LeftIconAccordion = (props: any) => {
  return (
    <>
      <Accordion
        items={accordionItems}
        iconSide='left'
        defaultValue={['item-2']}
        onChange={(value) => console.log(value)}
        {...props}
      />

      <Accordion
        items={accordionItems}
        kind='flush'
        iconSide='left'
        icon='cross'
        onChange={(value) => console.log(value)}
        {...props}
      />
    </>
  );
};
