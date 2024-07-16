'use client';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@libComponents/Accordion';
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

export const DemoSingle = (props: Props) => {
  return (
    <>
      <Accordion items={accordionItems} />

      <Accordion items={accordionItems} kind='flush' icon='cross' />

      <Accordion defaultValue='item-2' onValueChange={(value) => console.log(value)}>
        <AccordionItem value='item-1'>
          <AccordionTrigger>Is it accessible?</AccordionTrigger>
          <AccordionContent>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt utlabore et dolore
            magna aliqua.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value='item-2'>
          <AccordionTrigger>Is it unstyled?</AccordionTrigger>
          <AccordionContent>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt utlabore et dolore
            magna aliqua.
          </AccordionContent>
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
          <AccordionContent>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt utlabore et dolore
            magna aliqua.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value='item-2'>
          <AccordionTrigger>Is it unstyled?</AccordionTrigger>
          <AccordionContent>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt utlabore et dolore
            magna aliqua.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value='item-3'>
          <AccordionTrigger>Can it be animated?</AccordionTrigger>
          <AccordionContent>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt utlabore et dolore
            magna aliqua.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </>
  );
};

export const DemoMulti = (props: Props) => {
  return (
    <>
      <Accordion
        items={accordionItems}
        defaultValue='item-2'
        type='multiple'
        onValueChange={(value) => console.log(value)}
      />
      <Accordion
        items={accordionItems}
        defaultValue='item-2'
        type='multiple'
        kind='flush'
        onValueChange={(value) => console.log(value)}
      />
    </>
  );
};

export const DemoIconLeft = (props: Props) => {
  return (
    <>
      <Accordion
        items={accordionItems}
        iconSide='left'
        defaultValue={['item-2']}
        onValueChange={(value) => console.log(value)}
      />
      <Accordion
        items={accordionItems}
        kind='flush'
        iconSide='left'
        icon='cross'
        onValueChange={(value) => console.log(value)}
      />
    </>
  );
};

export const NestedAccordion = (props: Props) => {
  return (
    <>
      <Accordion defaultValue='item-2' type='multiple' onValueChange={(value) => console.log(value)}>
        <AccordionItem value='item-1'>
          <AccordionTrigger>Is it Nested?</AccordionTrigger>
          <AccordionContent>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt utlabore et dolore
            magna aliqua.
            <Accordion defaultValue='item-2' type='multiple' onValueChange={(value) => console.log(value)}>
              <AccordionItem value='item-1'>
                <AccordionTrigger>Is it accessible?</AccordionTrigger>
                <AccordionContent>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt utlabore et
                  dolore magna aliqua.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value='item-2'>
                <AccordionTrigger>Is it unstyled?</AccordionTrigger>
                <AccordionContent>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt utlabore et
                  dolore magna aliqua.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value='item-3'>
                <AccordionTrigger>Can it be animated?</AccordionTrigger>
                <AccordionContent>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt utlabore et
                  dolore magna aliqua.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value='item-2'>
          <AccordionTrigger>Is it unstyled?</AccordionTrigger>
          <AccordionContent>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt utlabore et dolore
            magna aliqua.
          </AccordionContent>
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
        items={accordionItems.map((item) => ({
          ...item,
          content: (
            <>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt utlabore et
              dolore
              <Accordion
                items={accordionItems}
                kind='flush'
                iconSide='left'
                icon='cross'
                type='multiple'
                onValueChange={(value) => console.log(value)}
              />
            </>
          )
        }))}
        kind='flush'
        iconSide='left'
        icon='cross'
        onValueChange={(value) => console.log(value)}
      />
    </>
  );
};

export const DemoControlled = (props: Props) => {
  const [singleValue, setSingleValue] = React.useState('item-1');
  const [multiValue, setMultiValue] = React.useState<string[]>([]);
  return (
    <>
      <Accordion value={singleValue} onValueChange={(value) => console.log(value)}>
        <AccordionItem value='item-1' onClick={() => setSingleValue('item-1')}>
          <AccordionTrigger>Can set value 1</AccordionTrigger>
          <AccordionContent>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt utlabore et dolore
            magna aliqua.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value='item-2' onClick={() => setSingleValue('item-2')}>
          <AccordionTrigger>Can set value 2</AccordionTrigger>
          <AccordionContent>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt utlabore et dolore
            magna aliqua.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value='item-3'>
          <AccordionTrigger>Can not set value 3</AccordionTrigger>
          <AccordionContent>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt utlabore et dolore
            magna aliqua.
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <Accordion value={multiValue} type='multiple' onValueChange={(value) => console.log(value)}>
        <AccordionItem value='item-1' onClick={() => setMultiValue(Array.from(new Set([...multiValue, 'item-1'])))}>
          <AccordionTrigger>Append value 1</AccordionTrigger>
          <AccordionContent>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt utlabore et dolore
            magna aliqua.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value='item-2' onClick={() => setMultiValue(Array.from(new Set([...multiValue, 'item-2'])))}>
          <AccordionTrigger>Append value 2</AccordionTrigger>
          <AccordionContent>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt utlabore et dolore
            magna aliqua.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value='item-3' onClick={() => setMultiValue(['item-3'])}>
          <AccordionTrigger>Only value 3</AccordionTrigger>
          <AccordionContent>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt utlabore et dolore
            magna aliqua.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </>
  );
};
