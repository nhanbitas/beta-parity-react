'use client';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@libComponents/Accordion';
import { Plus } from 'lucide-react';
import React from 'react';

type Props = {};

export const DemoSingle = (props: Props) => (
  <>
    <Accordion defaultValue='item-2' onValueChange={(value) => console.log(value)}>
      <AccordionItem value='item-1'>
        <AccordionTrigger>Is it accessible?</AccordionTrigger>
        <AccordionContent>Yes. It adheres to the WAI-ARIA design pattern.</AccordionContent>
      </AccordionItem>
      <AccordionItem value='item-2'>
        <AccordionTrigger>Is it unstyled?</AccordionTrigger>
        <AccordionContent>Yes. Its unstyled by default, giving you freedom over the look and feel.</AccordionContent>
      </AccordionItem>
      <AccordionItem value='item-3'>
        <AccordionTrigger>Can it be animated?</AccordionTrigger>
        <AccordionContent>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt utlabore et dolore
          magna aliqua.
        </AccordionContent>
      </AccordionItem>
    </Accordion>

    <Accordion kind='flush' defaultValue='item-2' onValueChange={(value) => console.log(value)}>
      <AccordionItem value='item-1'>
        <AccordionTrigger>Is it accessible?</AccordionTrigger>
        <AccordionContent>Yes. It adheres to the WAI-ARIA design pattern.</AccordionContent>
      </AccordionItem>
      <AccordionItem value='item-2'>
        <AccordionTrigger>Is it unstyled?</AccordionTrigger>
        <AccordionContent>Yes. Its unstyled by default, giving you freedom over the look and feel.</AccordionContent>
      </AccordionItem>
      <AccordionItem value='item-3'>
        <AccordionTrigger>Can it be animated?</AccordionTrigger>
        <AccordionContent>Yes! You can animate the Accordion with CSS or JavaScript.</AccordionContent>
      </AccordionItem>
    </Accordion>
  </>
);

export const DemoMulti = (props: Props) => {
  const [items, setItems] = React.useState(['item-3', 'item-2', 'item-1']);
  return (
    <>
      <Accordion defaultValue={['item-2']} type='multiple' onValueChange={(value) => console.log(value)}>
        <AccordionItem value='item-1'>
          <AccordionTrigger>Is it accessible?</AccordionTrigger>
          <AccordionContent>Yes. It adheres to the WAI-ARIA design pattern.</AccordionContent>
        </AccordionItem>
        <AccordionItem value='item-2'>
          <AccordionTrigger>Is it unstyled?</AccordionTrigger>
          <AccordionContent>Yes. Its unstyled by default, giving you freedom over the look and feel.</AccordionContent>
        </AccordionItem>
        <AccordionItem value='item-3'>
          <AccordionTrigger>Can it be animated?</AccordionTrigger>
          <AccordionContent>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt utlabore et dolore
            magna aliqua.
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <Accordion kind='flush' value={items} type='multiple' onValueChange={(value) => console.log(value)}>
        <AccordionItem value='item-1'>
          <AccordionTrigger>Is it accessible?</AccordionTrigger>
          <AccordionContent>Yes. It adheres to the WAI-ARIA design pattern.</AccordionContent>
        </AccordionItem>
        <AccordionItem value='item-2'>
          <AccordionTrigger>Is it unstyled?</AccordionTrigger>
          <AccordionContent>Yes. Its unstyled by default, giving you freedom over the look and feel.</AccordionContent>
        </AccordionItem>
        <AccordionItem value='item-3'>
          <AccordionTrigger>Can it be animated?</AccordionTrigger>
          <AccordionContent>Yes! You can animate the Accordion with CSS or JavaScript.</AccordionContent>
        </AccordionItem>
      </Accordion>
    </>
  );
};

export const DemoIconLeft = (props: Props) => {
  const [items, setItems] = React.useState(['item-3', 'item-2', 'item-1']);
  return (
    <>
      <Accordion iconSide='left' defaultValue={['item-2']} onValueChange={(value) => console.log(value)}>
        <AccordionItem value='item-1'>
          <AccordionTrigger>Is it accessible?</AccordionTrigger>
          <AccordionContent>Yes. It adheres to the WAI-ARIA design pattern.</AccordionContent>
        </AccordionItem>
        <AccordionItem value='item-2'>
          <AccordionTrigger>Is it unstyled?</AccordionTrigger>
          <AccordionContent>Yes. Its unstyled by default, giving you freedom over the look and feel.</AccordionContent>
        </AccordionItem>
        <AccordionItem value='item-3'>
          <AccordionTrigger>Can it be animated?</AccordionTrigger>
          <AccordionContent>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt utlabore et dolore
            magna aliqua.
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <Accordion
        kind='flush'
        iconSide='left'
        triggerIcon={<Plus />}
        value={items}
        onValueChange={(value) => console.log(value)}
      >
        <AccordionItem value='item-1'>
          <AccordionTrigger>Is it accessible?</AccordionTrigger>
          <AccordionContent>Yes. It adheres to the WAI-ARIA design pattern.</AccordionContent>
        </AccordionItem>
        <AccordionItem value='item-2'>
          <AccordionTrigger>Is it unstyled?</AccordionTrigger>
          <AccordionContent>Yes. Its unstyled by default, giving you freedom over the look and feel.</AccordionContent>
        </AccordionItem>
        <AccordionItem value='item-3'>
          <AccordionTrigger>Can it be animated?</AccordionTrigger>
          <AccordionContent>Yes! You can animate the Accordion with CSS or JavaScript.</AccordionContent>
        </AccordionItem>
      </Accordion>
    </>
  );
};

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
