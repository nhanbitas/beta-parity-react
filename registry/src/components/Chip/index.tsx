'use client';

import React from 'react';
import classNames from 'classnames';
import './index.css';
import { BaseProps } from '../Base';
import { Check, ChevronDown, ChevronUp, X } from 'lucide-react';
import useDidMountEffect from '../hooks/useDidMountEffect';

const typeMap = {
  button: 'button',
  checkbox: 'checkbox',
  radio: 'radio',
  input: 'input',
  dropdown: 'dropdown'
};

const colorMap = {
  gray: 'gray',
  orange: 'orange',
  sky: 'sky',
  violet: 'violet',
  green: 'green',
  red: 'red',
  yellow: 'yellow',
  blue: 'blue'
} as const;

const sizeMap = {
  sm: 'small',
  md: 'medium',
  lg: 'large'
};

const kindMap = {
  fill: 'filled',
  outline: 'outlined'
};

export interface ChipProps extends BaseProps {
  label: string;
  icon?: React.ReactNode;
  type?: keyof typeof typeMap;
  size?: keyof typeof sizeMap;
  kind?: keyof typeof kindMap;
  color?: keyof typeof colorMap;
  value?: string | number;
  checked?: boolean;
  isActive?: boolean;
  onChange?: (args: { value: string | number; checked?: boolean; active?: boolean; event?: React.ChangeEvent }) => void;
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
    kind = 'fill',
    size = 'md',
    color = 'gray',
    value,
    checked,
    isActive,
    onChange,
    onRemove,
    onClick,
    ...rest
  } = props;

  const kindChip = kindMap[kind as keyof typeof kindMap];
  const sizeChip = sizeMap[size as keyof typeof sizeMap];
  const colorChip = colorMap[color as keyof typeof colorMap];
  const defaultActive = type === 'checkbox' || type === 'radio' ? !!checked : !!isActive;
  const [active, setActive] = React.useState(defaultActive);

  const handleButtonClick = (e: React.MouseEvent<HTMLElement>) => {
    onClick && onClick(e);
  };

  const handleCheckboxClick = (e: React.MouseEvent<HTMLElement>) => {
    if (checked == undefined) {
      setActive(!active);
    }
    onChange && onChange({ value: value || '', checked: !active, event: e as any });
    onClick && onClick(e);
  };

  const handleRadioClick = (e: React.MouseEvent<HTMLElement>) => {
    setActive(true);
    onChange && onChange({ value: value || '', checked: true, event: e as any });
    onClick && onClick(e);
  };

  const handleDropdownClick = (e: React.MouseEvent<HTMLElement>) => {
    if (isActive == undefined) {
      setActive(!active);
    }
    onChange && onChange({ value: value || '', active: !active, event: e as any });
    onClick && onClick(e);
  };

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

  switch (type) {
    case 'checkbox':
      const checkboxClassname = classNames('chip', className, kindChip, sizeChip, { [colorChip]: active });
      return (
        <span onClick={handleCheckboxClick} className={checkboxClassname} {...rest} ref={ref}>
          {icon ? icon : null}
          {label || children}
          {active ? <Check /> : null}
        </span>
      );

    case 'radio':
      const radioClassname = classNames('chip', className, kindChip, sizeChip, { [colorChip]: active });
      return (
        <span onClick={handleRadioClick} className={radioClassname} {...rest} ref={ref}>
          {icon ? icon : null}
          {label || children}
          {active ? <Check /> : null}
        </span>
      );

    case 'input':
      const inputClassname = classNames('chip', className, kindChip, sizeChip, { [colorChip]: type === 'input' });
      return (
        <span onClick={handleCheckboxClick} className={inputClassname} {...rest} ref={ref}>
          {icon ? icon : null}
          {label || children}
          <button
            className='chip-close'
            onClick={(e: React.MouseEvent<HTMLElement>) => {
              e.stopPropagation();
              onRemove && onRemove(value as string);
            }}
          >
            <X />
          </button>
        </span>
      );

    case 'dropdown':
      const dropdownClassname = classNames('chip', className, kindChip, sizeChip, { [colorChip]: !!value });
      return (
        <span onClick={handleDropdownClick} className={dropdownClassname} {...rest} ref={ref}>
          {icon ? icon : null}
          {label || children}
          {active ? <ChevronUp /> : <ChevronDown />}
        </span>
      );

    default:
      const btnClassName = classNames('chip', className, kindChip, sizeChip, { [colorChip]: type === 'button' });
      return (
        <button onClick={handleButtonClick} className={btnClassName} {...rest} ref={ref}>
          {icon ? icon : null}
          {label || children}
        </button>
      );
  }
});

Chip.displayName = 'Chip';
