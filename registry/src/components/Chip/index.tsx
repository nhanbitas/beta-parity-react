import React from 'react';
import classNames from 'classnames';
import { Check, ChevronDown, ChevronUp } from 'lucide-react';

import './index.css';
import './variables.css';

import { BaseProps } from '../Base';
import useDidMountEffect from '../hooks/useDidMountEffect';
import useKeyboard from '../hooks/useKeyboard';

// =========================
// Chip
// =========================
// Declare and export Chip type and Chip component

const colorMap: Record<'neutral' | 'accent', string> = {
  neutral: 'neutral',
  accent: 'accent'
} as const;

const sizeMap: Record<'sm' | 'md' | 'lg', string> = {
  sm: 'small',
  md: 'medium',
  lg: 'large'
} as const;

const kindMap: Record<'glass' | 'outlined', string> = {
  glass: 'glass',
  outlined: 'outlined'
} as const;

/**
 * Props for the Chip component.
 *
 * @extends {BaseProps}
 */
export interface ChipProps extends BaseProps {
  /**
   * The label of the chip, displaying text.
   *
   * @memberof ChipProps
   */
  label: string;

  /**
   * Optional icon to display in the chip, image is supported
   *
   * @memberof ChipProps
   */
  icon?: React.ReactNode;

  /**
   * The type of the chip, can be one of the keys from the typeMap.
   *
   * @default 'toggle'
   * @memberof ChipProps
   */
  type?: 'toggle' | 'dropdown';

  /**
   * The size of the chip, can be one of the keys from the sizeMap.
   *
   * @default 'md'
   * @memberof ChipProps
   */
  size?: keyof typeof sizeMap;

  /**
   * The kind of the chip, can be one of the keys from the kindMap.
   *
   * @default 'outline'
   * @memberof ChipProps
   */
  kind?: keyof typeof kindMap;

  /**
   * The color of the chip, can be one of the keys from the colorMap.
   *
   * @default 'neutral'
   * @memberof ChipProps
   */
  color?: keyof typeof colorMap;

  /**
   * The value of the chip, can be a string or number
   *
   * @memberof ChipProps
   */
  value?: string | number;

  /**
   * The checked state of the chip, it is usable in toggle type
   *
   * @memberof ChipProps
   */
  checked?: boolean;

  /**
   * The defaultChecked state of the chip (uncontrolled chip), it is usable in toggle type
   *
   * @memberof ChipProps
   */
  defaultChecked?: boolean;

  /**
   * The active state of the chip, it is usable in dropdown type
   *
   * @memberof ChipProps
   */
  isActive?: boolean;

  /**
   * Whether the chip is disabled.
   *
   * @memberof ChipProps
   */
  disabled?: boolean;

  /**
   * Callback when the state of the chip changes for chip with valued chip - toggle, drodown
   *
   * @memberof ChipProps
   * @param {Object} args
   * @param {string | number} args.value - The value of the valued chip.
   * @param {boolean} [args.checked] - The checked state of the toggle chip.
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

/**
 * **Parity Chip** - A chip is a small block of content, such as a label or avatar, that is used to display related information or actions.
 *
 *  @see {@link http://localhost:3005/chip Parity Chip}
 */
export const Chip = React.forwardRef<
  HTMLElement,
  ChipProps & Omit<React.AllHTMLAttributes<HTMLElement>, keyof ChipProps>
>((props, ref: any) => {
  const {
    className,
    children,
    type = 'toggle',
    label,
    icon,
    kind = 'outlined',
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
  const kindChip = kindMap[kind];
  const sizeChip = sizeMap[size];
  const colorChip = colorMap[color];

  const defaultActive = type === 'toggle' ? !!checked : !!isActive;
  const [active, setActive] = React.useState(defaultActive || defaultChecked);

  // Define click handlers
  const handleToggleClick = (e: React.MouseEvent<HTMLElement> | React.KeyboardEvent) => {
    if (checked == undefined) {
      setActive(!active);
    }
    onChange && onChange({ value: value || '', checked: !active });
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
    toggle: handleToggleClick,
    dropdown: handleDropdownClick
  };

  // Define keyup handlers - "enter" key
  const ToggleKeyupHandler = useKeyboard('Enter', handleToggleClick);
  const DropdownKeyupHandler = useKeyboard('Enter', handleDropdownClick);

  const keyupHandlers = {
    toggle: ToggleKeyupHandler,
    dropdown: DropdownKeyupHandler
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
      const handler = clickHandlers[type as keyof typeof clickHandlers] || clickHandlers.toggle;
      handler(e);
    },
    onKeyUp: (e: React.KeyboardEvent) => {
      if (disabled) return;
      const handler = keyupHandlers[type as keyof typeof keyupHandlers] || keyupHandlers.toggle;
      handler(e);
    }
  };

  // Define accessibilities for chip
  const accessibilityProps = {
    'aria-disabled': disabled,
    'aria-label': label.toLowerCase(),
    'aria-checked': type === 'toggle' ? active : undefined,
    'aria-selected': type === 'dropdown' ? !!value : undefined,
    role: type,
    tabIndex: disabled ? -1 : 0
  };

  // Update active state when checked, isActive is changed
  useDidMountEffect(() => {
    if (checked !== undefined && type === 'toggle') {
      setActive(checked);
    }

    if (isActive !== undefined && type === 'dropdown') {
      setActive(isActive);
    }
  }, [checked, isActive]);

  // Render chip by type
  switch (type) {
    case 'toggle':
      const toggleClassname = classNames('chip', className, kindChip, sizeChip, active ? colorChip : 'neutral');
      return (
        <span className={toggleClassname} ref={ref} {...eventHandlers} {...accessibilityProps} {...rest}>
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
