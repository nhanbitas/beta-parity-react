import React from 'react';
import classNames from 'classnames';
import './index.css';
import { InputWrapper } from '../Input';
import useCombinedRefs from '../hooks/useCombinedRefs';
import { Check, ChevronDown } from 'lucide-react';
import { Menu, MenuItem } from '../Menu';

export interface CustomSelectProps extends React.HTMLAttributes<HTMLDivElement> {
  options: { value: string; label: string }[];
  labelSelect?: string;
  value?: string;
  selectedIcon?: React.ReactNode;
  onChange?: (e: React.ChangeEvent<HTMLDivElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLDivElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLDivElement>) => void;
  onclick?: (e: React.MouseEvent<HTMLDivElement>) => void;
}

export const CustomSelect = React.forwardRef<HTMLDivElement, CustomSelectProps>(
  ({ options, className, selectedIcon, labelSelect, onChange, onFocus, onBlur, onclick, value, ...props }, ref) => {
    const [currentValue, setCurrentValue] = React.useState(
      options.filter((item) => item.value === value)[0]?.value || ''
    );
    const [currentLabel, setCurrentLabel] = React.useState(
      options.filter((item) => item.value === value)[0]?.label || options[0].label
    );

    const [isSelectOpen, setIsSelectOpen] = React.useState(false);
    const selectRef = React.useRef<HTMLDivElement>(null);
    const combinedRef = useCombinedRefs(selectRef, ref);

    const handleBlur = (e: React.FocusEvent<HTMLDivElement>) => {
      setIsSelectOpen(false);
      onBlur && onBlur(e);
    };

    const handleItemClick = (e: any) => {
      setCurrentValue(e.target.value.value);
      setCurrentLabel(e.target.value.label);
    };

    const handleMenuClick = () => {
      setIsSelectOpen((pre) => !pre);
    };

    React.useEffect(() => {
      setCurrentValue(value || '');
    }, [value]);

    if (options && options.length > 0) {
      const ArrowBtn = (
        <button
          className={classNames('arrow-btn', { open: isSelectOpen })}
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            combinedRef.current && combinedRef.current.focus();
          }}
        >
          <ChevronDown />
        </button>
      );
      return (
        <InputWrapper rightElement={ArrowBtn}>
          <Menu
            className={classNames('custom-select', className, { 'non-value': !currentValue })}
            ref={combinedRef}
            onBlur={handleBlur}
            data-select-value={currentValue}
            onClick={handleMenuClick}
            {...props}
          >
            {options.map(({ value, label }) => (
              <SelectItem
                key={value}
                value={value}
                label={label}
                onClick={handleItemClick}
                isActive={value === currentValue && currentValue !== ''}
              >
                {value === currentValue && currentValue !== '' ? (
                  <span className='selected-icon'>{selectedIcon || <Check />}</span>
                ) : null}
              </SelectItem>
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
