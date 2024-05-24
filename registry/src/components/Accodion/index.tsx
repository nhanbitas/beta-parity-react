import React from 'react';
import * as RadixAccordion from '@radix-ui/react-accordion';
import classNames from 'classnames';
import { ChevronDownIcon } from '@radix-ui/react-icons';
import './index.css';

const Accordion = RadixAccordion.Root;

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof RadixAccordion.Item>,
  React.ComponentPropsWithoutRef<typeof RadixAccordion.Item>
>(({ children, className, ...props }, forwardedRef) => (
  <RadixAccordion.Item className={classNames('AccordionItem', className)} {...props} ref={forwardedRef}>
    {children}
  </RadixAccordion.Item>
));

AccordionItem.displayName = 'AccordionItem';

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof RadixAccordion.Trigger>,
  React.ComponentPropsWithoutRef<typeof RadixAccordion.Trigger>
>(({ children, className, ...props }, forwardedRef) => (
  <RadixAccordion.Header className='AccordionHeader'>
    <RadixAccordion.Trigger className={classNames('AccordionTrigger', className)} {...props} ref={forwardedRef}>
      {children}
      <ChevronDownIcon className='AccordionChevron' aria-hidden />
    </RadixAccordion.Trigger>
  </RadixAccordion.Header>
));

AccordionTrigger.displayName = 'AccordionTrigger';

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof RadixAccordion.Content>,
  React.ComponentPropsWithoutRef<typeof RadixAccordion.Content>
>(({ children, className, ...props }, forwardedRef) => (
  <RadixAccordion.Content className={classNames('AccordionContent', className)} {...props} ref={forwardedRef}>
    <div className='AccordionContentText'>{children}</div>
  </RadixAccordion.Content>
));

AccordionContent.displayName = 'AccordionContent';

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
