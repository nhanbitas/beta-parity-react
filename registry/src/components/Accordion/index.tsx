import React from 'react';
import classNames from 'classnames';
import { ChevronDown, Minus, Plus } from 'lucide-react';

import './index.css';
import './variables.css';

import { BaseProps } from '../Base';
import useDidMountEffect from '../hooks/useDidMountEffect';

// =========================
// Accordion
// =========================
// Declare and export accordion type and accordion component

/**
 * Props for the Accordion component.
 *
 * Extends properties from the `Base` component.
 */
export interface AccordionProps extends BaseProps {
  /**
   * The type of accordion. It can be either 'single' for a single open item at a time,
   * or 'multiple' for allowing multiple items to be open at the same time.
   *
   * @default 'single'
   * @memberof AccordionProps
   */
  type?: 'single' | 'multiple';

  /**
   * The kind of accordion. It can be 'flush' for items without borders,
   * or 'contained' for items with borders.
   *
   * @default 'contained'
   * @memberof AccordionProps
   */
  kind?: 'flush' | 'contained';

  /**
   * The icon used for the accordion trigger. It can be either 'chevron' or 'cross'.
   *
   * @default 'chevron'
   * @memberof AccordionProps
   */
  icon?: 'chevron' | 'cross';

  /**
   * The side where the icon will be displayed in the accordion trigger. It can be either 'left' or 'right'.
   *
   * @default 'right'
   * @memberof AccordionProps
   */
  iconSide?: 'left' | 'right';

  /**
   * The default value of the accordion. It can be a string or an array of strings.
   * This defines which item(s) are open by default.
   *
   * @memberof AccordionProps
   */
  defaultValue?: string | string[];

  /**
   * The controlled value of the accordion. It can be a string or an array of strings.
   * This defines which item(s) are open and should be managed externally.
   *
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

/**
 * **Parity Accordion**
 *
 *  @see {@link https://beta-parity-react.vercel.app/accordion Parity Accordion}
 */
export const Accordion = React.forwardRef<HTMLDivElement, AccordionProps & React.HTMLAttributes<HTMLDivElement>>(
  (
    {
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
    },
    ref
  ) => {
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
      <div className={classNames('accordion', className, kind)} ref={ref} {...props}>
        {clonedChildren}
      </div>
    );
  }
);

Accordion.displayName = 'Accordion';

// =========================
// Accordion Item
// =========================

/**
 * Props for the AccordionItem component.
 */
export interface AccordionItemProps {
  /**
   * The unique value for the accordion item, used to identify it.
   *
   * @memberof AccordionItemProps
   */
  value: string;

  /**
   * Indicates whether the accordion item is disabled.
   *
   * @default false
   * @memberof AccordionItemProps
   */
  disabled?: boolean;

  /**
   * Clone props
   */
  currentValue?: string | string[];
  handleChange?: (value: string) => void;
  type?: 'single' | 'multiple';
}

/**
 * **Parity Accordion Item**
 *
 *  @see {@link https://beta-parity-react.vercel.app/accordion Parity Accordion}
 */

export const AccordionItem = React.forwardRef<
  HTMLDivElement,
  AccordionItemProps & React.HTMLAttributes<HTMLDivElement>
>(({ className, children, disabled = false, currentValue, value, handleChange, type = 'single', ...props }, ref) => {
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
    <div
      className={classNames('accordion-item', className, { active: isExpanded })}
      aria-disabled={disabled}
      ref={ref}
      {...props}
    >
      {cloneChildren}
    </div>
  );
});

AccordionItem.displayName = 'AccordionItem';

// =========================
// Accordion Trigger
// =========================

/**
 * Props for the AccordionItemTrigger component.
 */
export interface AccordionItemTriggerProps {
  /**
   * Clone props
   */
  isExpanded?: boolean;
  disabled?: boolean;
  handleChange?: () => void;
  icon?: 'chevron' | 'cross';
  iconSide?: 'left' | 'right';
}

/**
 * **Parity Accordion Item Trigger**
 *
 *  @see {@link https://beta-parity-react.vercel.app/accordion Parity Accordion}
 */

export const AccordionItemTrigger = React.forwardRef<
  HTMLButtonElement,
  AccordionItemTriggerProps & React.HTMLAttributes<HTMLButtonElement>
>(
  (
    { className, children, isExpanded, disabled, handleChange, icon = 'chevron', iconSide = 'right', ...props },
    ref
  ) => {
    const iconElement =
      !icon || icon === 'chevron' ? <ChevronDown size={16} /> : isExpanded ? <Minus size={16} /> : <Plus size={16} />;

    const iconWrapperClassName = classNames('accordion-item-trigger-icon', {
      'chevron-trigger': icon === 'chevron' || !icon,
      'cross-trigger ': icon === 'cross'
    });

    return (
      <button
        className={classNames('accordion-item-trigger', className, {
          'icon-left': iconSide === 'left',
          'icon-right': iconSide === 'right'
        })}
        aria-expanded={isExpanded}
        disabled={disabled}
        onClick={() => handleChange?.()}
        ref={ref}
        {...props}
      >
        {iconSide === 'left' && <span className={iconWrapperClassName}>{iconElement}</span>}
        <span className='accordion-item-trigger-text'>{children}</span>
        {iconSide === 'right' && <span className={iconWrapperClassName}>{iconElement}</span>}
      </button>
    );
  }
);

AccordionItemTrigger.displayName = 'AccordionItemTrigger';

// =========================
// Accordion Content
// =========================

/**
 * Props for the AccordionItemContent component.
 */
export interface AccordionItemContentProps {
  /**
   * Clone props
   */
  isExpanded?: boolean;
}

/**
 * **Parity Accordion Item Content**

 *  @see {@link https://beta-parity-react.vercel.app/accordion Parity Accordion}
 */
export const AccordionItemContent = React.forwardRef<
  HTMLDivElement,
  AccordionItemContentProps & React.HTMLAttributes<HTMLDivElement>
>(({ className, children, isExpanded, ...props }, ref) => {
  return (
    <div className={classNames('accordion-item-content', className)} ref={ref} {...props}>
      {children}
    </div>
  );
});

AccordionItemContent.displayName = 'AccordionItemContent';

// =========================
// The function is used to pass props to parts of accordion
// =========================

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
