'use client';

import React from 'react';
import classNames from 'classnames';
import './index.css';
import { BaseProps } from '../Base';
import { Check, ChevronDown, ChevronUp, X } from 'lucide-react';
import useDidMountEffect from '../hooks/useDidMountEffect';
import useKeyboard from '../hooks/useKeyboard';

const typeMap = {
  button: 'button',
  checkbox: 'checkbox',
  radio: 'radio',
  dropdown: 'dropdown'
};

const colorMap = {
  neutral: 'neutral',
  accent: 'accent'
} as const;

const sizeMap = {
  sm: 'small',
  md: 'medium',
  lg: 'large'
};

const kindMap = {
  glass: 'glass',
  outline: 'outlined'
};

/**
 * Props for the Chip component.
 *
 * @export
 * @interface ChipProps
 * @extends {BaseProps}
 */
export interface ChipProps extends BaseProps {
  /**
   * The label of the chip, displaying text.
   *
   * @type {string}
   * @memberof ChipProps
   */
  label: string;

  /**
   * Optional icon to display in the chip, image is supported
   *
   * @type {React.ReactNode}
   * @memberof ChipProps
   */
  icon?: React.ReactNode;

  /**
   * The type of the chip, can be one of the keys from the typeMap.
   *
   * "button" is default
   *
   * @type {keyof typeof typeMap}
   * @memberof ChipProps
   */
  type?: keyof typeof typeMap;

  /**
   * The size of the chip, can be one of the keys from the sizeMap.
   *
   * "md" is default
   *
   * @type {keyof typeof sizeMap}
   * @memberof ChipProps
   */
  size?: keyof typeof sizeMap;

  /**
   * The kind of the chip, can be one of the keys from the kindMap.
   *
   * "outline" is default
   *
   * @type {keyof typeof kindMap}
   * @memberof ChipProps
   */
  kind?: keyof typeof kindMap;

  /**
   * The color of the chip, can be one of the keys from the colorMap.
   *
   * "neutral" is default
   *
   * @type {keyof typeof colorMap}
   * @memberof ChipProps
   */
  color?: keyof typeof colorMap;

  /**
   * The value of the chip, can be a string or number, it is usable in checkbox, radio, dropdown, input type
   *
   * @type {string | number}
   * @memberof ChipProps
   */
  value?: string | number;

  /**
   * The checked state of the chip, it is usable in checkbox, radio type
   *
   * @type {boolean}
   * @memberof ChipProps
   */
  checked?: boolean;

  /**
   * The defaultChecked state of the chip (uncontrolled chip), it is usable in checkbox, radio type
   *
   * @type {boolean}
   * @memberof ChipProps
   */
  defaultChecked?: boolean;

  /**
   * The active state of the chip, it is usable in dropdown type
   *
   * @type {boolean}
   * @memberof ChipProps
   */
  isActive?: boolean;

  /**
   * Whether the chip is disabled.
   *
   * @type {boolean}
   * @memberof ChipProps
   */
  disabled?: boolean;

  /**
   * Callback when the state of the chip changes for chip with valued chip - checkbox, radio, drodown
   *
   * @memberof ChipProps
   * @param {Object} args
   * @param {string | number} args.value - The value of the valued chip.
   * @param {boolean} [args.checked] - The checked state of the checkbox, radio chip.
   * @param {boolean} [args.active] - The active state of the drodown chip.
   */
  onChange?: (args: { value: string | number; checked?: boolean; active?: boolean }) => void;

  /**
   * Callback when the remove button is clicked. it is avaiable for button chip
   *
   * @memberof ChipProps
   * @param {string | number} value - The value of the chip to be removed.
   */
  onRemove?: (value: string | number) => void;
}

export const Chip = React.forwardRef<
  HTMLElement,
  ChipProps & Omit<React.AllHTMLAttributes<HTMLElement>, keyof ChipProps>
>((props, ref: any) => {
  const {
    className,
    children,
    type = 'button',
    label,
    icon,
    kind = 'outline',
    size = 'md',
    color = 'neutral',
    value,
    checked,
    defaultChecked,
    isActive,
    disabled = false,
    onChange,
    onRemove,
    onClick,
    ...rest
  } = props;

  // Inite states
  const kindChip = kindMap[kind as keyof typeof kindMap];
  const sizeChip = sizeMap[size as keyof typeof sizeMap];
  const colorChip = colorMap[color as keyof typeof colorMap];
  const defaultActive = type === 'checkbox' || type === 'radio' ? !!checked : !!isActive;
  const [active, setActive] = React.useState(defaultActive || defaultChecked);

  // Define click handlers
  const handleButtonClick = (e: React.MouseEvent<HTMLElement> | React.KeyboardEvent) => {
    onClick && onClick(e as React.MouseEvent<HTMLElement>);
  };

  const handleCheckboxClick = (e: React.MouseEvent<HTMLElement> | React.KeyboardEvent) => {
    if (checked == undefined) {
      setActive(!active);
    }
    onChange && onChange({ value: value || '', checked: !active });
    onClick && onClick(e as React.MouseEvent<HTMLElement>);
  };

  const handleRadioClick = (e: React.MouseEvent<HTMLElement> | React.KeyboardEvent) => {
    setActive(true);
    onChange && onChange({ value: value || '', checked: true });
    onClick && onClick(e as React.MouseEvent<HTMLElement>);
  };

  const handleDropdownClick = (e: React.MouseEvent<HTMLElement> | React.KeyboardEvent) => {
    if (isActive == undefined) {
      setActive(!active);
    }
    onChange && onChange({ value: value || '', active: !active });
    onClick && onClick(e as React.MouseEvent<HTMLElement>);
  };

  const clickHandlers = {
    button: handleButtonClick,
    checkbox: handleCheckboxClick,
    radio: handleRadioClick,
    dropdown: handleDropdownClick,
    default: handleButtonClick
  };

  // Define keyup handlers - "enter" key
  const ButtonKeyupHandler = useKeyboard('Enter', handleButtonClick);
  const RadioKeyupHandler = useKeyboard('Enter', handleRadioClick);
  const CheckboxKeyupHandler = useKeyboard('Enter', handleCheckboxClick);
  const DropdownKeyupHandler = useKeyboard('Enter', handleDropdownClick);

  const keyupHandlers = {
    button: ButtonKeyupHandler,
    checkbox: CheckboxKeyupHandler,
    radio: RadioKeyupHandler,
    dropdown: DropdownKeyupHandler,
    default: ButtonKeyupHandler
  };

  // Define content to display
  const InnerChipContent = (
    <>
      {icon ? <span className='chip-icon'>{icon}</span> : null}
      <span className='chip-label'>{label || children}</span>
    </>
  );

  // Define events for chip
  const eventHandlers = {
    onClick: (e: React.MouseEvent<HTMLElement>) => {
      if (disabled) return;
      const handler = clickHandlers[type as keyof typeof clickHandlers] || clickHandlers.default;
      handler(e);
    },
    onKeyUp: (e: React.KeyboardEvent) => {
      if (disabled) return;
      const handler = keyupHandlers[type as keyof typeof keyupHandlers] || keyupHandlers.default;
      handler(e);
    }
  };

  // Define accessibilities for chip
  const accessibilityProps = {
    'aria-disabled': disabled,
    'aria-label': label,
    'aria-checked': type === 'radio' || type === 'checkbox' ? active : undefined,
    'aria-selected': type === 'dropdown' ? active : undefined,
    role: type,
    tabIndex: disabled ? -1 : 0
  };

  // Update active state when checked, isActive is changed
  useDidMountEffect(() => {
    if (checked !== undefined && type === 'checkbox') {
      setActive(checked);
    }

    if (checked !== undefined && type === 'radio') {
      setActive(checked);
    }

    if (isActive !== undefined && type === 'dropdown') {
      setActive(isActive);
    }
  }, [checked, isActive]);

  // Render chip by type
  switch (type) {
    case 'checkbox':
      const checkboxClassname = classNames('chip', className, kindChip, sizeChip, active ? colorChip : 'neutral');
      return (
        <span className={checkboxClassname} ref={ref} {...eventHandlers} {...accessibilityProps} {...rest}>
          {InnerChipContent}
          <span className={`check-icon ${active ? 'active' : ''}`}>
            <Check />
          </span>
        </span>
      );

    case 'radio':
      const radioClassname = classNames('chip', className, kindChip, sizeChip, active ? colorChip : 'neutral');
      return (
        <span className={radioClassname} ref={ref} {...eventHandlers} {...accessibilityProps} {...rest}>
          {InnerChipContent}
          <span className={`check-icon ${active ? 'active' : ''}`}>
            <Check />
          </span>
        </span>
      );

    case 'dropdown':
      const dropdownClassname = classNames('chip', className, kindChip, sizeChip, !!value ? colorChip : 'neutral');
      return (
        <span className={dropdownClassname} ref={ref} {...eventHandlers} {...accessibilityProps} {...rest}>
          {!!value && !icon ? (
            <span className='chip-icon'>
              <Check />
            </span>
          ) : null}
          {InnerChipContent}
          {active ? (
            <span className='chip-icon'>{<ChevronUp />}</span>
          ) : (
            <span className='chip-icon'>{<ChevronDown />}</span>
          )}
        </span>
      );

    default:
      const btnClassName = classNames('chip', className, kindChip, sizeChip, { [colorChip]: type === 'button' });
      return (
        <span className={btnClassName} ref={ref} {...eventHandlers} {...accessibilityProps} {...rest}>
          {InnerChipContent}
        </span>
      );
  }
});

Chip.displayName = 'Chip';
