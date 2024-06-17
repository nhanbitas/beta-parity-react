import React from 'react';
import classNames from 'classnames';
import './index.css';
import { InputWrapper } from '../Input';
import { ContainedLabel } from '../FloatingLabel';
import useCombinedRefs from '../hooks/useCombinedRefs';
import { ChevronDown } from 'lucide-react';

export interface NativeSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: { value: string; label: string }[];
  floatingLabel?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLSelectElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLSelectElement>) => void;
  onclick?: (e: React.MouseEvent<HTMLSelectElement>) => void;
}

export const NativeSelect = React.forwardRef<HTMLSelectElement, NativeSelectProps>(
  ({ options, className, floatingLabel, onChange, onFocus, onBlur, onclick, value, ...props }, ref) => {
    const [currentValue, setCurrentValue] = React.useState(value || '');
    const [isActiveContainedLabel, setIsActiveContainedLabel] = React.useState(value ? true : false);
    const [isSelectOpen, setIsSelectOpen] = React.useState(false);
    const selectRef = React.useRef<HTMLSelectElement>(null);
    const combinedRef = useCombinedRefs(selectRef, ref);

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      setCurrentValue(e.target.value);
      onChange && onChange(e);
      setIsActiveContainedLabel(e.target.value ? true : false);

      if (selectRef.current && !e.target.value) {
        selectRef.current.blur();
      }
    };

    const handleFocus = (e: React.FocusEvent<HTMLSelectElement>) => {
      setIsActiveContainedLabel(true);
      onFocus && onFocus(e);
    };

    const handleBlur = (e: React.FocusEvent<HTMLSelectElement>) => {
      !currentValue && setIsActiveContainedLabel(false);
      onBlur && onBlur(e);
    };

    const handleClick = (e: React.MouseEvent<HTMLSelectElement>) => {
      setIsSelectOpen(true);
      onclick && onclick(e);
    };

    React.useEffect(() => {
      setCurrentValue(value || '');
    }, [value]);

    if (options && options.length > 0) {
      const ArrowBtn = (
        <button className={classNames('arrow-btn', { open: isSelectOpen })}>
          <ChevronDown />
        </button>
      );
      return (
        <InputWrapper rightElement={ArrowBtn}>
          {floatingLabel && <ContainedLabel isActive={isActiveContainedLabel}>{floatingLabel}</ContainedLabel>}

          <select
            style={{ color: !currentValue && floatingLabel ? 'transparent' : '' }}
            ref={combinedRef}
            className={classNames('native-select', className, { 'no-value': !currentValue })}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onClick={handleClick}
            {...props}
          >
            {options.map(({ value, label }) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </InputWrapper>
      );
    }

    return null;
  }
);

NativeSelect.displayName = 'NativeSelect';
