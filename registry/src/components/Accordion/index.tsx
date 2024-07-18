'use client';

import React from 'react';
import classNames from 'classnames';
import './index.css';
import { ChevronDown, Minus, Plus } from 'lucide-react';
import { createPolymorphicComponent, PolymorphicComponentProps } from '../Base/factory';
import Base, { BaseProps } from '../Base';
import useDidMountEffect from '../hooks/useDidMountEffect';

// Accordion

export interface AccordionProps extends BaseProps {
  /**
   * The type of accordion. It can be either 'single' for a single open item at a time,
   * or 'multiple' for allowing multiple items to be open at the same time.
   *
   * @type {'single' | 'multiple'}
   * @memberof AccordionProps
   */
  type?: 'single' | 'multiple';

  /**
   * The kind of accordion. It can be 'flush' for items without borders,
   * or 'contained' for items with borders.
   *
   * @type {'flush' | 'contained'}
   * @memberof AccordionProps
   */
  kind?: 'flush' | 'contained';

  /**
   * The icon used for the accordion trigger. It can be either 'chevron' or 'cross'.
   *
   * @type {'chevron' | 'cross'}
   * @memberof AccordionProps
   */
  icon?: 'chevron' | 'cross';

  /**
   * The side where the icon will be displayed in the accordion trigger. It can be either 'left' or 'right'.
   *
   * @type {'left' | 'right'}
   * @memberof AccordionProps
   */
  iconSide?: 'left' | 'right';

  /**
   * The default value of the accordion. It can be a string or an array of strings.
   * This defines which item(s) are open by default.
   *
   * @type {string | string[]}
   * @memberof AccordionProps
   */
  defaultValue?: string | string[];

  /**
   * The controlled value of the accordion. It can be a string or an array of strings.
   * This defines which item(s) are open and should be managed externally.
   *
   * @type {string | string[]}
   * @memberof AccordionProps
   */
  value?: string | string[];

  /**
   * The callback function that is called when the value changes.
   *
   * @param {string | string[]} value - The new value of the accordion.
   * @memberof AccordionProps
   */
  onChange?: (value: string | string[]) => void;

  /**
   * The items to be rendered in the accordion. Each item contains a title, content,
   * and optional additional properties.
   *
   * @memberof AccordionProps
   */
  items?: {
    title: React.ReactNode;
    content: React.ReactNode;
    value: string;
    itemProps?: Omit<AccordionItemProps, 'value'> & React.HTMLAttributes<HTMLDivElement>;
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
      icon,
      items,
      onChange,
      ...props
    }: PolymorphicComponentProps<C, AccordionProps>,
    ref: React.Ref<any>
  ) => {
    const Component = component || ('div' as C);

    // Init value for accordion
    let initValue = value || defaultValue || '';
    if (type === 'multiple' && !Array.isArray(initValue)) {
      initValue = [];
    }
    const [currentValue, setCurrentValue] = React.useState<string | string[]>(initValue);

    const handleChange = (ItemValue: string) => {
      if (value || Array.isArray(value)) return;

      let newValue: string | string[] = '';

      if (type === 'single') {
        newValue = currentValue === ItemValue ? '' : ItemValue;
      } else if (type === 'multiple') {
        newValue =
          currentValue.includes(ItemValue) && Array.isArray(currentValue)
            ? currentValue.filter((item) => item !== ItemValue)
            : [...currentValue, ItemValue];
      }

      setCurrentValue(newValue);
      if (onChange) onChange(newValue);
    };

    // Pass needed props to accordion children
    const clonedChildren = cloneChildren(children, { type, currentValue, handleChange, iconSide, kind, icon });

    // setCurrentValue depends on value prop
    useDidMountEffect(() => {
      const isArrayValue = Array.isArray(value);
      if (type === 'single' && !isArrayValue) {
        setCurrentValue(value as string);
        if (onChange) onChange(value as string);
      } else if (type === 'multiple' && isArrayValue) {
        setCurrentValue(value as string[]);
        if (onChange) onChange(value as string[]);
      }
    }, [value]);

    // items props rendering is priority
    if (items && items.length) {
      return (
        <Accordion
          component={Component}
          className={className}
          ref={ref}
          value={value}
          icon={icon}
          iconSide={iconSide}
          type={type}
          kind={kind}
          defaultValue={defaultValue}
          onChange={onChange}
          {...(props as any)}
        >
          {items.map((item, index) => (
            <AccordionItem key={item.value || index} value={item.value as any} {...item.itemProps}>
              <AccordionItemTrigger>{item.title}</AccordionItemTrigger>
              <AccordionItemContent>{item.content}</AccordionItemContent>
            </AccordionItem>
          ))}
        </Accordion>
      );
    }

    return (
      <Base component={Component} className={classNames('accordion', className, kind)} ref={ref} {...props}>
        {clonedChildren}
      </Base>
    );
  }
);

Accordion.displayName = 'Accordion';

// Accordion Item

export interface AccordionItemProps {
  /**
   * The unique value for the accordion item, used to identify it.
   *
   * @type {string}
   * @memberof AccordionItemProps
   */
  value: string;

  /**
   * Indicates whether the accordion item is disabled.
   *
   * @type {boolean}
   * @memberof AccordionItemProps
   * @default false
   */
  disabled?: boolean;
}

export const AccordionItem = createPolymorphicComponent<'div', AccordionItemProps>(
  <C extends React.ElementType = 'div'>(
    {
      component,
      className,
      children,
      disabled = false,
      currentValue,
      value,
      handleChange,
      type = 'single',
      ...props
    }: PolymorphicComponentProps<C, AccordionItemProps>,
    ref: React.Ref<any>
  ) => {
    const Component = component || ('div' as C);

    const isExpanded = type === 'multiple' ? currentValue?.includes(value as string) : value === currentValue;

    const cloneChildren = React.Children.map(children, (child) => {
      if (React.isValidElement(child)) {
        const { ...rest } = child.props;
        let props: any;

        if (child.type === AccordionItemTrigger) {
          props = {
            ...rest,
            isExpanded: isExpanded,
            disabled: disabled,
            handleChange: () => !disabled && handleChange && handleChange(value as string)
          };
        }

        if (child.type === AccordionItemContent) {
          props = {
            ...rest,
            isExpanded: isExpanded
          };
        }

        return React.cloneElement(child, props);
      }
    });

    return (
      <Base
        component={Component}
        className={classNames('accordion-item', className, { active: isExpanded })}
        disabled={disabled}
        ref={ref}
        {...props}
      >
        {cloneChildren}
      </Base>
    );
  }
);

AccordionItem.displayName = 'AccordionItem';

// Accordion Trigger

export interface AccordionItemTriggerProps {}

export const AccordionItemTrigger = createPolymorphicComponent<'button', AccordionItemTriggerProps>(
  <C extends React.ElementType = 'button'>(
    {
      component,
      className,
      children,
      isExpanded,
      disabled,
      handleChange,
      icon = 'chevron',
      iconSide = 'right',
      ...props
    }: PolymorphicComponentProps<C, AccordionItemTriggerProps>,
    ref: React.Ref<any>
  ) => {
    const Component = component || ('button' as C);

    const iconElement =
      !icon || icon === 'chevron' ? <ChevronDown size={16} /> : isExpanded ? <Minus size={16} /> : <Plus size={16} />;

    const iconWrapperClassName = classNames('accordion-item-trigger-icon', {
      'chevron-trigger': icon === 'chevron' || !icon,
      'cross-trigger ': icon === 'cross'
    });

    return (
      <Base
        component={Component}
        className={classNames('accordion-item-trigger', className, {
          'icon-left': iconSide === 'left',
          'icon-right': iconSide === 'right'
        })}
        aria-expanded={isExpanded}
        disabled={disabled}
        onClick={() => handleChange()}
        ref={ref}
        {...props}
      >
        {iconSide === 'left' && <span className={iconWrapperClassName}>{iconElement}</span>}
        <span className='accordion-item-trigger-text'>{children}</span>
        {iconSide === 'right' && <span className={iconWrapperClassName}>{iconElement}</span>}
      </Base>
    );
  }
);

AccordionItemTrigger.displayName = 'AccordionItemTrigger';

// Accordion Content

export interface AccordionItemContentProps {}

export const AccordionItemContent = createPolymorphicComponent<'div', AccordionItemContentProps>(
  <C extends React.ElementType = 'div'>(
    { component, className, children, isExpanded, ...props }: PolymorphicComponentProps<C, AccordionItemContentProps>,
    ref: React.Ref<any>
  ) => {
    const Component = component || ('div' as C);

    return (
      <Base component={Component} className={classNames('accordion-item-content', className)} ref={ref} {...props}>
        {children}
      </Base>
    );
  }
);

AccordionItemContent.displayName = 'AccordionItemContent';

// The function is used to pass props to parts of accordion
const cloneChildren = (
  children: React.ReactNode,
  extraProps: AccordionProps & { currentValue: string | string[]; handleChange: any }
): React.ReactNode => {
  return React.Children.map(children, (child) => {
    if (!React.isValidElement(child) || child.type === Accordion) {
      return child;
    }

    if (child.type === AccordionItem) {
      return React.cloneElement(child, {
        currentValue: extraProps.currentValue ? extraProps.currentValue : '',
        handleChange: extraProps.handleChange ? extraProps.handleChange : () => {},
        type: extraProps.type ? extraProps.type : 'single',
        children: cloneChildren(child.props.children, extraProps) as React.ReactNode
      } as any);
    }

    if (child.type === AccordionItemTrigger) {
      return React.cloneElement(child, {
        handleChange: extraProps.handleChange ? extraProps.handleChange : () => {},
        icon: extraProps.icon ? extraProps.icon : null,
        iconSide: extraProps.iconSide ? extraProps.iconSide : 'right',
        children: cloneChildren(child.props.children, extraProps) as React.ReactNode
      } as any);
    }

    if (child.type === AccordionItemContent) {
      return React.cloneElement(child, {} as any);
    }
  });
};
