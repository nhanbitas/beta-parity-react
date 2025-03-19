import React from 'react';
import classNames from 'classnames';
import './index.css';
import './variables.css';
import { InputWrapper } from '../BaseInput';
import { ContainedLabel } from '../FloatingLabel';
import { ChevronDown } from 'lucide-react';

// =========================
// Native Select
// =========================
// Declare and export native select type and native select component

const sizeMap: Record<'sm' | 'md', string> = {
  sm: 'small',
  md: 'medium'
  // lg: 'large' //**REMOVED
} as const;

/**
 * Props for the NativeSelect component.
 *
 * Extends properties from the `select` element.
 */
export interface NativeSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  /**
   * The list of options available in the select dropdown.
   * Each option is an object containing:
   * - `value`: The value of the option.
   * - `label`: The text displayed for the option.
   * - `disabled` (optional): Whether the option is disabled.
   *
   * @memberof NativeSelectProps
   */
  options?: { value: string; label: string; disabled?: boolean }[];

  /**
   * The currently selected value of the select component.
   *
   * @memberof NativeSelectProps
   */
  value?: string;

  /**
   * The floating label for the select component.
   *
   * @memberof NativeSelectProps
   */
  floatingLabel?: string;

  /**
   * The size of the select component.
   *
   * @default 'md'
   * @memberof NativeSelectProps
   */
  selectSize?: keyof typeof sizeMap;

  /**
   * The theme of the select component.
   *
   * @default 'default'
   * @memberof NativeSelectProps
   */
  theme?: 'default' | 'alternative';

  /**
   * Callback function invoked when the selected value changes.
   *
   * @param event - The change event of the select element.
   * @memberof NativeSelectProps
   */
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;

  /**
   * Callback function invoked when the select component gains focus.
   *
   * @param event - The focus event of the select element.
   * @memberof NativeSelectProps
   */
  onFocus?: (e: React.FocusEvent<HTMLSelectElement>) => void;

  /**
   * Callback function invoked when the select component loses focus.
   *
   * @param event - The blur event of the select element.
   * @memberof NativeSelectProps
   */
  onBlur?: (e: React.FocusEvent<HTMLSelectElement>) => void;

  /**
   * Callback function invoked when the select component is clicked.
   *
   * @param event - The click event of the select element.
   * @memberof NativeSelectProps
   */
  onclick?: (e: React.MouseEvent<HTMLSelectElement>) => void;
}

/**
 * **Parity NativeSelect**.
 *
 *  @see {@link http://localhost:3005/select Parity NativeSelect}
 */
export const NativeSelect = React.forwardRef<HTMLSelectElement, NativeSelectProps>(
  (
    {
      options,
      className,
      children,
      floatingLabel,
      value,
      disabled,
      selectSize = 'md',
      theme = 'default',
      onChange,
      onFocus,
      onBlur,
      onclick,
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
      if (disabled) return;
      setIsSelectOpen((pre) => !pre);
      onclick && onclick(e);
    };

    React.useEffect(() => {
      setCurrentValue(value || '');
    }, [value]);

    if ((options && options.length > 0) || children) {
      const ArrowBtn = (
        <button tabIndex={-1} className={classNames('arrow-select-btn', { open: isSelectOpen })}>
          <ChevronDown />
        </button>
      );

      return (
        <InputWrapper rightElement={ArrowBtn}>
          {floatingLabel && <ContainedLabel isActive={isSelectOpen || !!currentValue}>{floatingLabel}</ContainedLabel>}
          <select
            ref={ref}
            className={classNames('native-select', 'par-input', className, theme, {
              'non-value': !currentValue,
              [sizeMap[selectSize]]: !floatingLabel
            })}
            disabled={disabled}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onClick={handleClick}
            {...props}
          >
            {options
              ? options.map(({ value, label, disabled = false }) => (
                  <option key={value} value={value} disabled={disabled}>
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

/**
 * Props for the NativeOption component.
 *
 * Extends properties from the `option` element.
 */
export interface NativeOptionProps extends React.OptionHTMLAttributes<HTMLOptionElement> {
  /**
   * The value of the option.
   *
   * @memberof NativeOptionProps
   */
  value?: string;

  /**
   * The label of the option.
   *
   * @memberof NativeOptionProps
   */
  label?: string;
}

/**
 * **Parity NativeOption**.
 *
 *  @see {@link http://localhost:3005/select Parity NativeOption}
 */
export const NativeOption = React.forwardRef<HTMLOptionElement, NativeOptionProps>(
  ({ className, children, value, label, ...props }, ref) => (
    <option ref={ref} className={classNames('native-option', className)} value={value} {...props}>
      {label || children}
    </option>
  )
);

NativeOption.displayName = 'NativeOption';
