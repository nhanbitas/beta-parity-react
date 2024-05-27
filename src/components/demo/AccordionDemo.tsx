'use client';

import React from 'react';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@libComponents/Accordion';

const AccordionDemo = () => {
  return (
    <Accordion
      style={{ width: '500px', margin: '50px' }}
      type='single'
      collapsible
      className='Accordion'
      onValueChange={(value) => console.log(value)}
    >
      <AccordionItem value='item-1' >
        <AccordionTrigger>Is it accessible?</AccordionTrigger>
        <AccordionContent>Yes. It adheres to the WAI-ARIA design pattern.</AccordionContent>
      </AccordionItem>

      <AccordionItem value='item-2' >
        <AccordionTrigger>Is it unstyled?</AccordionTrigger>
        <AccordionContent >Yes. Its unstyled by default, giving you freedom over the look and feel.</AccordionContent>
      </AccordionItem>

      <AccordionItem value='item-3' >
        <AccordionTrigger>Can it be animated?</AccordionTrigger>
        <AccordionContent >
          <div>Yes! You can animate the Accordion with CSS or JavaScript.</div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default AccordionDemo;
