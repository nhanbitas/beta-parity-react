import React from 'react';
import classNames from 'classnames';
import './index.css';
import { InputWrapper } from '../Input';
import { ContainedLabel } from '../FloatingLabel';
import { ChevronDown } from 'lucide-react';

const sizeMap = {
  sm: 'small',
  md: 'medium',
  lg: 'large'
} as const;

// =========================
// Native Select
// =========================
// Declare and export native select type and native select component

export interface NativeSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options?: { value: string; label: string }[];
  value?: string;
  floatingLabel?: string;
  selectSize?: keyof typeof sizeMap;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLSelectElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLSelectElement>) => void;
  onclick?: (e: React.MouseEvent<HTMLSelectElement>) => void;
}

export const NativeSelect = React.forwardRef<HTMLSelectElement, NativeSelectProps>(
  (
    {
      options,
      className,
      children,
      floatingLabel,
      onChange,
      onFocus,
      onBlur,
      onclick,
      value,
      selectSize = 'md',
      ...props
    },
    ref
  ) => {
    const [currentValue, setCurrentValue] = React.useState(value || '');
    const [isSelectOpen, setIsSelectOpen] = React.useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      setCurrentValue(e.target.value);
      onChange && onChange(e);
    };

    const handleFocus = (e: React.FocusEvent<HTMLSelectElement>) => {
      onFocus && onFocus(e);
    };

    const handleBlur = (e: React.FocusEvent<HTMLSelectElement>) => {
      setIsSelectOpen(false);
      onBlur && onBlur(e);
    };

    const handleClick = (e: React.MouseEvent<HTMLSelectElement>) => {
      setIsSelectOpen((pre) => !pre);
      onclick && onclick(e);
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
        <InputWrapper rightElement={ArrowBtn}>
          {floatingLabel && <ContainedLabel isActive={isSelectOpen || !!currentValue}>{floatingLabel}</ContainedLabel>}
          <select
            ref={ref}
            className={classNames('native-select', className, {
              'non-value': !currentValue,
              [sizeMap[selectSize]]: !floatingLabel
            })}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onClick={handleClick}
            {...props}
          >
            {options
              ? options.map(({ value, label }) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))
              : children}
          </select>
        </InputWrapper>
      );
    }

    return null;
  }
);

NativeSelect.displayName = 'NativeSelect';

// =========================
// Native Option
// =========================
// Declare and export native option type and native option component

export interface NativeOptionProps extends React.OptionHTMLAttributes<HTMLOptionElement> {
  value: string;
  label: string;
}

export const NativeOption = React.forwardRef<HTMLOptionElement, NativeOptionProps>(
  ({ className, children, value, label, ...props }, ref) => (
    <option ref={ref} className={classNames('native-option', className)} value={value} {...props}>
      {label || children}
    </option>
  )
);

NativeOption.displayName = 'NativeOption';
