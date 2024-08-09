import React from 'react';
import classNames from 'classnames';
import './index.css';
import { InputWrapper, ValueInputWrapper } from '../Input';
import { ChevronDown } from 'lucide-react';
import { Menu, MenuItem } from '../Menu';
import { ContainedLabel } from '../FloatingLabel';
import { Chip } from '../Chip';
import { useResizeObserver } from '../hooks/useObserver';

export interface CustomSelectProps extends React.HTMLAttributes<HTMLDivElement> {
  options: { value: string; label: string }[];
  labelSelect?: string;
  floatingLabel?: React.ReactNode;
  value?: string;
  selectedIcon?: React.ReactNode;
  onChange?: (e: React.ChangeEvent<HTMLDivElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLDivElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLDivElement>) => void;
  onclick?: (e: React.MouseEvent<HTMLDivElement>) => void;
}

export const CustomSelect = React.forwardRef<HTMLDivElement, CustomSelectProps>(
  (
    {
      options,
      children,
      className,
      selectedIcon,
      labelSelect,
      floatingLabel,
      onChange,
      onFocus,
      onBlur,
      onclick,
      value,
      ...props
    },
    passedRef
  ) => {
    const [currentValue, setCurrentValue] = React.useState(value || '');
    const [isSelectOpen, setIsSelectOpen] = React.useState(false);

    const [wrapperRef, rect] = useResizeObserver();
    // const combinedRef = useCombinedRefs(selectRef, ref);

    const handleClick = (value: string) => {
      setCurrentValue(value);
      setIsSelectOpen(false);
    };

    const handleFocus = (e: any) => {
      setIsSelectOpen(true);
      onFocus && onFocus(e);
    };

    React.useEffect(() => {
      setCurrentValue(value || '');
    }, [value]);

    if ((options && options.length > 0) || children) {
      const ArrowBtn = (
        <button className={classNames('arrow-select-btn', { open: isSelectOpen })}>
          <ChevronDown />
        </button>
      );

      return (
        <InputWrapper rightElement={ArrowBtn} ref={wrapperRef}>
          {floatingLabel && <ContainedLabel isActive={isSelectOpen || !!currentValue}>{floatingLabel}</ContainedLabel>}

          <input
            type='text'
            readOnly
            className={classNames('input', { 'non-value': !currentValue })}
            style={{ color: 'transparent' }}
            value={Array.isArray(currentValue) ? currentValue.join(',') : currentValue}
            onFocus={handleFocus}
            {...props}
          />

          <ValueInputWrapper className={classNames({ 'non-value': !currentValue })}>
            {Array.isArray(currentValue) ? (
              <Chip type='input' value={currentValue} label={currentValue} />
            ) : (
              <span>{options.filter((item) => item.value === currentValue)[0].label}</span>
            )}
          </ValueInputWrapper>

          <Menu
            className={classNames('custom-select', className, { 'non-value': !currentValue })}
            anchor={wrapperRef.current as unknown as HTMLElement}
            isOpen={isSelectOpen}
            data-select-value={currentValue}
            {...props}
            style={{ width: rect?.width, ...props.style }}
          >
            {options.map(({ value, label }) => (
              <MenuItem
                useInput
                checked={value === currentValue}
                onChange={(e: any) => handleClick(e.value)}
                key={value}
                label={label}
                value={value}
              />
            ))}
          </Menu>
        </InputWrapper>
      );
    }

    return null;
  }
);

CustomSelect.displayName = 'CustomSelect';

export interface SelectItem extends React.HTMLAttributes<HTMLSpanElement> {
  value: string;
  label: string;
  isActive?: boolean;
  onClick?: (event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => void;
}

export const SelectItem = React.forwardRef<HTMLSpanElement, SelectItem>(
  ({ className, children, label, value, isActive, onClick, ...props }, ref) => {
    const handleClick = (event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
      const newEvent = {
        ...event,
        target: {
          ...event.target,
          value: { value, label }
        }
      };
      if (onClick) {
        onClick(newEvent as React.MouseEvent<HTMLSpanElement, MouseEvent>);
      }
    };
    return (
      <span
        className={classNames('select-item', className, { active: isActive })}
        ref={ref}
        data-value={value}
        onClick={handleClick}
        {...props}
      >
        {label}
        {children}
      </span>
    );
  }
);

SelectItem.displayName = 'SelectItem';
