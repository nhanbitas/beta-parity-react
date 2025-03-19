'use client';

import { Accordion, AccordionItemContent, AccordionItem, AccordionItemTrigger } from 'beta-parity-react/ui/Accordion';
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

export const SingleAccordion = (props: Props) => {
  return (
    <>
      <Accordion items={accordionItems} />

      <Accordion items={accordionItems} kind='flush' icon='cross' />

      <Accordion defaultValue='item-2' onChange={(value) => console.log(value)}>
        <AccordionItem value='item-1' disabled>
          <AccordionItemTrigger>Is it accessible?</AccordionItemTrigger>
          <AccordionItemContent>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt utlabore et dolore
            magna aliqua.
          </AccordionItemContent>
        </AccordionItem>
        <AccordionItem value='item-2'>
          <AccordionItemTrigger>Is it unstyled?</AccordionItemTrigger>
          <AccordionItemContent>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt utlabore et dolore
            magna aliqua.
          </AccordionItemContent>
        </AccordionItem>
        <AccordionItem value='item-3'>
          <AccordionItemTrigger>Can it be animated?</AccordionItemTrigger>
          <AccordionItemContent>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt utlabore et dolore
            magna aliqua.
          </AccordionItemContent>
        </AccordionItem>
      </Accordion>

      <Accordion kind='flush' defaultValue='item-2' onChange={(value) => console.log(value)}>
        <AccordionItem value='item-1' disabled>
          <AccordionItemTrigger>Is it accessible?</AccordionItemTrigger>
          <AccordionItemContent>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt utlabore et dolore
            magna aliqua.
          </AccordionItemContent>
        </AccordionItem>
        <AccordionItem value='item-2'>
          <AccordionItemTrigger>Is it unstyled?</AccordionItemTrigger>
          <AccordionItemContent>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt utlabore et dolore
            magna aliqua.
          </AccordionItemContent>
        </AccordionItem>
        <AccordionItem value='item-3'>
          <AccordionItemTrigger>Can it be animated?</AccordionItemTrigger>
          <AccordionItemContent>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt utlabore et dolore
            magna aliqua.
          </AccordionItemContent>
        </AccordionItem>
      </Accordion>
    </>
  );
};
