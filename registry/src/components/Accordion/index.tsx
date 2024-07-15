'use client';

import React from 'react';
import classNames from 'classnames';
import './index.css';
import { ChevronDown } from 'lucide-react';
import { createPolymorphicComponent, PolymorphicComponentProps } from '../Base/factory';
import Base, { BaseProps } from '../Base';
import useCombinedRefs from '../hooks/useCombinedRefs';
import useCloneChildren from '../hooks/useCloneChildren';

export interface AccordionProps extends BaseProps {
  type?: 'single' | 'multiple';
  kind?: 'flush' | 'contained';
  triggerIcon?: React.ReactNode;
  iconSide?: 'left' | 'right';
  defaultValue?: string | string[];
  value?: string | string[];
  onValueChange?: (value: string | string[]) => void;
  items?: {
    title: string;
    content: React.ReactNode | React.FC;
    value: string | number;
    disabled?: boolean;
    key: string | number;
  }[];
}

export const Accordion = createPolymorphicComponent<'div', AccordionProps>(
  <C extends React.ElementType = 'div'>(
    {
      component,
      className,
      children,
      type = 'single',
      kind = 'contained',
      defaultValue,
      value,
      iconSide,
      triggerIcon,
      onValueChange,
      ...props
    }: PolymorphicComponentProps<C, AccordionProps>,
    ref: React.Ref<any>
  ) => {
    const Component = component || ('div' as C);
    const [currentValue, setCurrentValue] = React.useState<string | string[]>(value || defaultValue || []);

    if (type === 'multiple') {
    }

    const handleChange = (value: string) => {
      if (type === 'single') {
        const newValue = currentValue === value ? '' : value;
        setCurrentValue(newValue);
        if (onValueChange) onValueChange(newValue);
      } else if (type === 'multiple') {
        const newValue =
          currentValue.includes(value) && Array.isArray(currentValue)
            ? currentValue.filter((item) => item !== value)
            : [...currentValue, value];
        setCurrentValue(newValue);
        if (onValueChange) onValueChange(newValue);
      }
    };

    const cloneChildren = useCloneChildren(
      children,
      { type, currentValue, handleChange, iconSide, kind, triggerIcon },
      { recursive: true }
    );

    return (
      <Base component={Component} className={classNames('accordion', className, kind)} ref={ref} {...props}>
        {cloneChildren}
      </Base>
    );
  }
);

Accordion.displayName = 'Accordion';

export interface AccordionItemProps extends Omit<AccordionProps, 'value'> {
  value: string;
  isActive?: boolean;
  disabled?: boolean;
}

export const AccordionItem = createPolymorphicComponent<'div', AccordionItemProps>(
  <C extends React.ElementType = 'div'>(
    {
      component,
      className,
      children,
      isActive,
      disabled = false,
      currentValue,
      defaultValue,
      value,
      handleChange,
      type = 'single',
      kind = 'contained',
      triggerIcon,
      iconSide = 'right',
      onValueChange,
      ...props
    }: PolymorphicComponentProps<C, AccordionItemProps>,
    ref: React.Ref<any>
  ) => {
    const Component = component || ('div' as C);

    const isExpanded = type === 'multiple' ? currentValue?.includes(value as string) : value === currentValue;

    const cloneChildren = React.Children.map(children, (child) => {
      if (React.isValidElement(child)) {
        const { ...rest } = child.props;
        return React.cloneElement(child, {
          ...rest,
          isExpanded: isExpanded,
          handleChange: () => handleChange && handleChange(value as string)
        });
      }
    });

    return (
      <Base
        component={Component}
        className={classNames('accordion-item', className, { active: isExpanded })}
        ref={ref}
        {...props}
      >
        {cloneChildren}
      </Base>
    );
  }
);

AccordionItem.displayName = 'AccordionItem';

export interface AccordionTriggerProps extends AccordionProps {}

export const AccordionTrigger = createPolymorphicComponent<'button', AccordionTriggerProps>(
  <C extends React.ElementType = 'button'>(
    {
      component,
      className,
      children,
      isExpanded,
      type = 'single',
      kind = 'contained',
      defaultValue,
      currentValue,
      handleChange,
      value,
      triggerIcon,
      iconSide = 'right',
      onValueChange,
      ...props
    }: PolymorphicComponentProps<C, AccordionTriggerProps>,
    ref: React.Ref<any>
  ) => {
    const Component = component || ('button' as C);

    const iconElement = triggerIcon ? triggerIcon : <ChevronDown size={16} />;

    return (
      <Base
        component={Component}
        className={classNames('accordion-trigger', className, {
          'icon-left': iconSide === 'left',
          'icon-right': iconSide === 'right'
        })}
        onClick={() => handleChange()}
        ref={ref}
        {...props}
      >
        {iconSide === 'left' && <span className='accordion-trigger-icon'>{iconElement}</span>}
        <span className='accordion-trigger-text'>{children}</span>
        {iconSide === 'right' && <span className='accordion-trigger-icon'>{iconElement}</span>}
      </Base>
    );
  }
);

AccordionTrigger.displayName = 'AccordionTrigger';

export interface AccordionContentProps extends AccordionProps {}

export const AccordionContent = createPolymorphicComponent<'div', AccordionContentProps>(
  <C extends React.ElementType = 'div'>(
    {
      component,
      className,
      children,
      isExpanded,
      value,
      currentValue,
      defaultValue,
      handleChange,
      triggerIcon,
      iconSide = 'right',
      type = 'single',
      kind = 'contained',
      onValueChange,
      ...props
    }: PolymorphicComponentProps<C, AccordionContentProps>,
    ref: React.Ref<any>
  ) => {
    const Component = component || ('div' as C);
    const elementRef = React.useRef<HTMLDivElement>(null);
    const combinedRef = useCombinedRefs(elementRef, ref);

    const [maxHeight, setMaxHeight] = React.useState(
      isExpanded ? elementRef.current && elementRef.current.scrollHeight + 24 : 0
    );

    React.useEffect(() => {
      if (elementRef.current) {
        // 24px for added padding of Accordion content
        const newMaxHeight = isExpanded ? elementRef.current.scrollHeight + 24 : 0;
        setMaxHeight(newMaxHeight);
      }
    }, [isExpanded]);

    return (
      <Base
        component={Component}
        style={{ maxHeight }}
        className={classNames('accordion-content', className)}
        ref={combinedRef}
        {...props}
      >
        {children}
      </Base>
    );
  }
);

AccordionContent.displayName = 'AccordionContent';

/// fix lại đệ quy clone, chỉ pass các props cần thiết cho từng component
