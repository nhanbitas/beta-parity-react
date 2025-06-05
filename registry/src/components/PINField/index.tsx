import * as React from 'react';
import classNames from 'classnames';

import './index.css';

const sizeMap = {
  sm: 'small',
  md: 'medium'
} as const;

// =========================
// PINField component
// =========================
// Declare and export select type and PINField component

/**
 * Props for the PINField component.
 *
 * Extends properties from the `HTMLDivElement` element.
 */
export interface PINFieldProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /**
   * Controls the visibility of the PIN values.
   *
   * @default false
   * @memberof PINFieldProps
   */
  masked?: boolean;

  /**
   * Configuration for groups of inputs and their separators.
   * Each number in the array represents a group length.
   * Example: [2, 3, 2] will render 2 inputs, then a separator, then 3 inputs,
   * then a separator, then 2 inputs.
   *
   * @default [4]
   * @memberof PINFieldProps
   */
  groups?: number[];

  /**
   * The class name for the PIN field.
   *
   * @default ""
   * @memberof PINFieldProps
   */
  value?: string;

  /**
   * The separator character to use between groups.
   *
   * @default "-"
   * @memberof PINFieldProps
   */
  separator?: string;

  /**
   * Flag to reset the PIN field. When changed to true, the field will clear all inputs.
   * Should be reset to false after handling.
   *
   * @default false
   * @memberof PINFieldProps
   */
  reset?: boolean;

  /**
   * Indicates whether the field is in a read-only state.
   *
   * @default false
   * @memberof PINFieldProps
   */
  readOnly?: boolean;

  /**
   * Indicates whether the field is disabled.
   *
   * @default false
   * @memberof PINFieldProps
   */
  disabled?: boolean;

  /**
   * Indicates whether the field is in an invalid state.
   *
   * @default false
   * @memberof PINFieldProps
   */
  invalid?: boolean;

  /**
   * The size of the PIN field inputs.
   *
   * @default "medium"
   * @memberof PINFieldProps
   */
  size?: keyof typeof sizeMap;

  /**
   * Define the theme of the PIN field.
   *
   * @default "default"
   * @memberof PINFieldProps
   */
  theme?: 'default' | 'alternative';

  /**
   * The callback function that is called when the PIN value changes.
   *
   * @param {string} value - The current complete PIN value.
   * @memberof PINFieldProps
   */
  onChange?: (value: string) => void;

  /**
   * The callback function that is called when all inputs are filled.
   *
   * @param {string} value - The complete PIN value.
   * @memberof PINFieldProps
   */
  onComplete?: (value: string) => void;

  /**
   * The placeholder character to display in empty inputs.
   *
   * @default "•"
   * @memberof PINFieldProps
   */
  placeholder?: string;
}

/**
 * **Parity PINField**
 *
 * @see {@link https://beta-parity-react.vercel.app/pinfield Parity PINField}
 */
export const PINField = React.forwardRef<HTMLDivElement, PINFieldProps>(
  (
    {
      className,
      value = '',
      groups = [4],
      separator = '-',
      masked = false,
      reset = false,
      readOnly = false,
      disabled = false,
      invalid = false,
      size = 'md',
      theme = 'default',
      placeholder = '•',
      onChange,
      onComplete,
      ...props
    },
    ref
  ) => {
    // Calculate total number of inputs needed
    const totalInputs = React.useMemo(() => groups.reduce((acc, curr) => acc + curr, 0), [groups]);

    // Create an array of refs for each input
    const inputRefs = React.useRef<(HTMLInputElement | null)[]>([]);

    // State to store the values of each input
    const initialValues = value
      ? Array(totalInputs)
          .fill('')
          .map((_, i) => value[i] || '')
      : Array(totalInputs).fill('');
    const [values, setValues] = React.useState<string[]>(initialValues);

    // Prepare inputs structure with separators
    const inputs = React.useMemo(() => {
      const result = [];
      let inputIndex = 0;

      for (let i = 0; i < groups.length; i++) {
        // Add inputs for this group
        for (let j = 0; j < groups[i]; j++) {
          result.push({ type: 'input', index: inputIndex++ });
        }

        // Add separator after all groups except the last one
        if (i < groups.length - 1) {
          result.push({ type: 'separator' });
        }
      }

      return result;
    }, [groups]);

    // Function to focus a specific input by index
    const focusInput = React.useCallback(
      (index: number) => {
        if (index >= 0 && index < totalInputs && inputRefs.current[index] && !readOnly && !disabled) {
          inputRefs.current[index]?.focus();
        }
      },
      [totalInputs, readOnly, disabled]
    );

    // Function to handle input change
    const handleChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
      if (readOnly || disabled) return;

      const value = e.target.value;
      // Only allow alphanumeric characters
      const lastChar = value.replace(/[^a-zA-Z0-9]/g, '').slice(-1);

      if (lastChar) {
        // Update the values array
        const newValues = [...values];
        newValues[index] = lastChar;
        setValues(newValues);

        // Call onChange with the new PIN value
        const newPINValue = newValues.join('');
        onChange?.(newPINValue);

        // Auto-focus next input if available
        if (index < totalInputs - 1) {
          focusInput(index + 1);
        }
      }
    }; // Function to handle keyboard events
    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
      if (readOnly || disabled) return;

      switch (e.key) {
        case 'Backspace':
          if (values[index]) {
            // If current input has value, clear it
            const newValues = [...values];
            newValues[index] = '';
            setValues(newValues);
            onChange?.(newValues.join(''));
          } else if (index > 0) {
            // If current input is empty, go to previous input
            focusInput(index - 1);
          }
          break;

        case 'ArrowLeft':
          // Move focus to previous input
          if (index > 0) {
            e.preventDefault(); // Prevent cursor movement within input
            focusInput(index - 1);
          }
          break;

        case 'ArrowRight':
          // Move focus to next input
          if (index < totalInputs - 1) {
            e.preventDefault(); // Prevent cursor movement within input
            focusInput(index + 1);
          }
          break;

        default:
          // For number/letter keys, check if it's a valid alphanumeric character
          const char = e.key;
          if (/^[a-zA-Z0-9]$/.test(char)) {
            // If this is the same as the existing value, still move to next input
            // This handles the case when user types the same value that already exists
            if (values[index] === char && index < totalInputs - 1) {
              e.preventDefault(); // Prevent default to avoid double input
              focusInput(index + 1);
            }
          }
          break;
      }
    };

    const handleSetText = (index: number, text: string) => {
      // Filter to only include alphanumeric characters
      const alphanumeric = text.replace(/[^a-zA-Z0-9]/g, '');

      if (alphanumeric) {
        const chars = alphanumeric.split('');
        const newValues = [...values];

        // Fill inputs starting from the current position
        let filledCount = 0;
        for (let i = index; i < totalInputs && filledCount < chars.length; i++) {
          newValues[i] = chars[filledCount++];
        }

        setValues(newValues);
        onChange?.(newValues.join(''));

        // Focus on the next empty input or last input
        const nextEmptyIndex = newValues.findIndex((val, idx) => idx >= index && !val);
        if (nextEmptyIndex !== -1) {
          focusInput(nextEmptyIndex);
        } else {
          focusInput(Math.min(index + chars.length, totalInputs - 1));
        }
      }
    };

    // Handle paste event
    const handlePaste = (index: number, e: React.ClipboardEvent<HTMLInputElement>) => {
      if (readOnly || disabled) return;
      e.preventDefault();
      const pastedText = e.clipboardData.getData('text');
      handleSetText(index, pastedText);
    };

    // Handle focus event - select the content when focusing
    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      if (!readOnly && !disabled) {
        e.target.select();
      }
    };

    // Handle clicking on an input
    const handleInputClick = (index: number) => {
      if (!readOnly && !disabled) {
        focusInput(index);
      }
    };

    // Effect to handle reset prop changes
    React.useEffect(() => {
      if (reset) {
        setValues(Array(totalInputs).fill(''));
        // Focus the first input after reset
        setTimeout(() => {
          focusInput(0);
        }, 0);
      }
    }, [reset, totalInputs, focusInput]);

    // Effect to handle value prop changes
    React.useEffect(() => {
      // Check if all inputs are filled
      if (!values.includes('') && onComplete) {
        onComplete(values.join(''));
      }
    }, [values]);

    // Initialize refs array when totalInputs changes
    React.useEffect(() => {
      inputRefs.current = inputRefs.current.slice(0, totalInputs);
      while (inputRefs.current.length < totalInputs) {
        inputRefs.current.push(null);
      }
    }, [totalInputs]);

    // Effect to handle external value prop changes
    React.useEffect(() => {
      if (value != values.join('') && value.length > 0) {
        handleSetText(0, value);
      }
    }, [value]);

    return (
      <div
        ref={ref}
        className={classNames(
          'pinfield',
          `pinfield-${sizeMap[size]}`,
          {
            'pinfield-disabled': disabled,
            'pinfield-read-only': readOnly,
            'pinfield-invalid': invalid,
            'pinfield-masked': masked,
            'pinfield-alternative': theme === 'alternative'
          },
          className
        )}
        {...props}
      >
        {inputs.map((item, idx) => {
          if (item.type === 'separator') {
            return (
              <div key={`separator-${idx}`} className='pinfield-separator'>
                {separator}
              </div>
            );
          }
          const inputIndex = item.index as number;
          const isEmpty = !values[inputIndex];
          const isFilled = !!values[inputIndex];

          return (
            <div
              key={`input-${inputIndex}`}
              className={classNames('pinfield-item', {
                'pinfield-item-filled': isFilled,
                'pinfield-item-empty': isEmpty
              })}
              onClick={() => handleInputClick(inputIndex)}
            >
              <input
                ref={(el) => (inputRefs.current[inputIndex] = el)}
                type={masked ? 'password' : 'text'}
                maxLength={1}
                value={values[inputIndex]}
                onChange={(e) => handleChange(inputIndex, e)}
                onKeyDown={(e) => handleKeyDown(inputIndex, e)}
                onPaste={(e) => handlePaste(inputIndex, e)}
                onFocus={handleFocus}
                disabled={disabled}
                readOnly={readOnly}
                aria-invalid={invalid}
                className='pinfield-input'
                autoComplete='off'
                inputMode='numeric'
              />
              {masked ? (
                <span className='pinfield-placeholder'>{placeholder}</span>
              ) : (
                isEmpty && <span className='pinfield-placeholder'>{placeholder}</span>
              )}
            </div>
          );
        })}
      </div>
    );
  }
);

PINField.displayName = 'PINField';
