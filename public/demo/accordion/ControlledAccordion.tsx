'use client';

import { Accordion, AccordionItemContent, AccordionItem, AccordionItemTrigger } from 'beta-parity-react/ui/Accordion';
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

export const ControlledAccordion = (props: any) => {
  const [singleValue, setSingleValue] = React.useState('item-1');
  const [multiValue, setMultiValue] = React.useState<string[]>([]);
  return (
    <>
      <Accordion value={singleValue} onChange={(value) => console.log(value)} {...props}>
        <AccordionItem value='item-1' onClick={() => setSingleValue('item-1')}>
          <AccordionItemTrigger>Can set value 1</AccordionItemTrigger>
          <AccordionItemContent>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt utlabore et dolore
            magna aliqua.
          </AccordionItemContent>
        </AccordionItem>
        <AccordionItem value='item-2' onClick={() => setSingleValue('item-2')}>
          <AccordionItemTrigger>Can set value 2</AccordionItemTrigger>
          <AccordionItemContent>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt utlabore et dolore
            magna aliqua.
          </AccordionItemContent>
        </AccordionItem>
        <AccordionItem value='item-3'>
          <AccordionItemTrigger>Can not set value 3</AccordionItemTrigger>
          <AccordionItemContent>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt utlabore et dolore
            magna aliqua.
          </AccordionItemContent>
        </AccordionItem>
      </Accordion>

      <Accordion value={multiValue} type='multiple' onChange={(value) => console.log(value)} {...props}>
        <AccordionItem value='item-1' onClick={() => setMultiValue(Array.from(new Set([...multiValue, 'item-1'])))}>
          <AccordionItemTrigger>Append value 1</AccordionItemTrigger>
          <AccordionItemContent>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt utlabore et dolore
            magna aliqua.
          </AccordionItemContent>
        </AccordionItem>
        <AccordionItem value='item-2' onClick={() => setMultiValue(Array.from(new Set([...multiValue, 'item-2'])))}>
          <AccordionItemTrigger>Append value 2</AccordionItemTrigger>
          <AccordionItemContent>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt utlabore et dolore
            magna aliqua.
          </AccordionItemContent>
        </AccordionItem>
        <AccordionItem value='item-3' onClick={() => setMultiValue(['item-3'])}>
          <AccordionItemTrigger>Only value 3</AccordionItemTrigger>
          <AccordionItemContent>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt utlabore et dolore
            magna aliqua.
          </AccordionItemContent>
        </AccordionItem>
      </Accordion>
    </>
  );
};
