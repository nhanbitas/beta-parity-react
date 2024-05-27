import React from 'react';
import * as RadixAccordion from '@radix-ui/react-accordion';
import classNames from 'classnames';
import './index.css';
import { ChevronDown } from 'lucide-react';

const Accordion = React.forwardRef<
  React.ElementRef<typeof RadixAccordion.Root>,
  React.ComponentPropsWithoutRef<typeof RadixAccordion.Root>
>(({ children, className, ...props }, forwardedRef) => (
  <RadixAccordion.Root className={classNames('accordion', className)} {...props} ref={forwardedRef}>
    {children}
  </RadixAccordion.Root>
));

Accordion.displayName = 'Accordion';

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof RadixAccordion.Item>,
  React.ComponentPropsWithoutRef<typeof RadixAccordion.Item>
>(({ children, className, ...props }, forwardedRef) => (
  <RadixAccordion.Item className={classNames('accordion-item', className)} {...props} ref={forwardedRef}>
    {children}
  </RadixAccordion.Item>
));

AccordionItem.displayName = 'AccordionItem';

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof RadixAccordion.Trigger>,
  React.ComponentPropsWithoutRef<typeof RadixAccordion.Trigger>
>(({ children, className, ...props }, forwardedRef) => (
  <RadixAccordion.Trigger className={classNames('accordion-trigger', className)} {...props} ref={forwardedRef}>
    {children}
    <ChevronDown className='accordion-chevron' aria-hidden />
  </RadixAccordion.Trigger>
));

AccordionTrigger.displayName = 'AccordionTrigger';

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof RadixAccordion.Content>,
  React.ComponentPropsWithoutRef<typeof RadixAccordion.Content>
>(({ children, className, ...props }, forwardedRef) => (
  <RadixAccordion.Content className={classNames('accordion-content', className)} {...props} ref={forwardedRef}>
    <div className='accordion-content-text'>{children}</div>
  </RadixAccordion.Content>
));

AccordionContent.displayName = 'AccordionContent';

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
