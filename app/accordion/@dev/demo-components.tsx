'use client';

import { Accordion, AccordionItemContent, AccordionItem, AccordionItemTrigger } from '@libComponents/Accordion';
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

export const BasicAccordion = (props: Props) => <Accordion items={accordionItems} />;

export const DemoSingle = (props: Props) => {
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

export const DemoMulti = (props: Props) => {
  return (
    <>
      <Accordion
        items={accordionItems}
        defaultValue='item-2'
        type='multiple'
        onChange={(value) => console.log(value)}
      />
      <Accordion
        items={accordionItems}
        defaultValue='item-2'
        type='multiple'
        kind='flush'
        onChange={(value) => console.log(value)}
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
        onChange={(value) => console.log(value)}
      />
      <Accordion
        items={accordionItems}
        kind='flush'
        iconSide='left'
        icon='cross'
        onChange={(value) => console.log(value)}
      />
    </>
  );
};

export const NestedAccordion = (props: Props) => {
  return (
    <>
      <Accordion defaultValue='item-2' type='multiple' onChange={(value) => console.log(value)}>
        <AccordionItem value='item-1'>
          <AccordionItemTrigger>Is it Nested?</AccordionItemTrigger>
          <AccordionItemContent>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt utlabore et dolore
            magna aliqua.
            <Accordion defaultValue='item-2' type='multiple' onChange={(value) => console.log(value)}>
              <AccordionItem value='item-1'>
                <AccordionItemTrigger>Is it accessible?</AccordionItemTrigger>
                <AccordionItemContent>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt utlabore et
                  dolore magna aliqua.
                </AccordionItemContent>
              </AccordionItem>
              <AccordionItem value='item-2'>
                <AccordionItemTrigger>Is it unstyled?</AccordionItemTrigger>
                <AccordionItemContent>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt utlabore et
                  dolore magna aliqua.
                </AccordionItemContent>
              </AccordionItem>
              <AccordionItem value='item-3'>
                <AccordionItemTrigger>Can it be animated?</AccordionItemTrigger>
                <AccordionItemContent>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt utlabore et
                  dolore magna aliqua.
                </AccordionItemContent>
              </AccordionItem>
            </Accordion>
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
                onChange={(value) => console.log(value)}
              />
            </>
          )
        }))}
        kind='flush'
        iconSide='left'
        icon='cross'
        onChange={(value) => console.log(value)}
      />
    </>
  );
};

export const DemoControlled = (props: Props) => {
  const [singleValue, setSingleValue] = React.useState('item-1');
  const [multiValue, setMultiValue] = React.useState<string[]>([]);
  return (
    <>
      <Accordion value={singleValue} onChange={(value) => console.log(value)}>
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

      <Accordion value={multiValue} type='multiple' onChange={(value) => console.log(value)}>
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
