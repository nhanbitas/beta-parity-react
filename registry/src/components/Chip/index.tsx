'use client';

import React from 'react';
import classNames from 'classnames';
import './index.css';

export interface ChipProps extends React.HTMLAttributes<HTMLElement> {
  children?: string | React.ReactNode;
  className?: string;
  label: string;
  icon?: React.ReactNode;
  color?: 'gray' | 'orange' | 'sky' | 'violet' | 'green' | 'red' | 'yellow' | 'blue';
  size?: 'small' | 'medium' | 'large';
  variant?: 'outlined' | 'filled';
  isActive?: boolean;
  isToggle?: boolean;
  isLoading?: boolean;
  value?: string | number;
  onActive?: (value?: string | number) => void;
  onDeactive?: (value?: string | number) => void;
}

export const Chip = React.forwardRef<HTMLElement, ChipProps>(
  (
    {
      className,
      children,
      icon,
      label,
      value,
      color = 'gray',
      size = 'medium',
      variant = 'outlined',
      isActive,
      isToggle = true,
      onActive,
      onDeactive,
      ...props
    },
    ref
  ) => {
    const [active, setActive] = React.useState(false);

    const handleClick = () => {
      if (isToggle && isActive === undefined) {
        setActive(!active);
      } else if (isActive === undefined) {
        setActive(true);
      }
    };

    React.useEffect(() => {
      setActive(isActive || false);
    }, [isActive]);

    React.useEffect(() => {
      if (active && onActive) onActive(value || label);
      if (!active && onDeactive) onDeactive(value || label);
    }, [active, onActive, onDeactive, value, label]);

    return (
      <span
        className={classNames('chip', className, variant, size, {
          [color]: active,
          active: active
        })}
        onClick={handleClick}
        ref={ref}
        {...props}
      >
        {icon}
        {label}
      </span>
    );
  }
);

Chip.displayName = 'Chip';
