## Component structure

### Example (Date picker):

```jsx

// Import necessary packages
import React from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import { Calendar } from 'lucide-react';
import { Instance } from 'flatpickr/dist/types/instance';
import { BaseOptions } from 'flatpickr/dist/types/options';
import Flatpickr, { DateTimePickerProps } from 'react-flatpickr';

// Import CSS
import './index.css';
import './variables.css';
import '../BaseInput/index.css';

// Import components and hooks
import { ContainedLabel } from '../FloatingLabel';
import useCombinedRefs from '../hooks/useCombinedRefs';
import { ErrorMessage, InputProps, InputWrapper, InputWrapperProps, sizeInputMap } from '../BaseInput';

// Import locales
import { Mandarin } from 'flatpickr/dist/l10n/zh.js';
import { Vietnamese } from 'flatpickr/dist/l10n/vn.js';
import { MandarinTraditional } from 'flatpickr/dist/l10n/zh-tw.js';
import { default as defaultLocale } from 'flatpickr/dist/l10n/default.js';


// Declare variables
export const DatePickerLocales = {
  default: defaultLocale,
  en: defaultLocale,
  vn: Vietnamese,
  'zh-cn': Mandarin,
  'zh-tw': MandarinTraditional
};

// =========================
// DatePicker
// =========================
// Declare and export select type and DatePicker component

/**
 * Extended props for `DatePicker`
 *
 * Inheriting from `DateTimePickerProps`.
 */
export interface DatePickerPropsExtend extends DateTimePickerProps {
  /**
   * Floating label displayed inside the input field.
   *
   * @default undefined
   */
  floatingLabel?: React.ReactNode;

  /**
   * Custom wrapper properties for styling the input container.
   *
   * @default undefined
   */
  wrapperProps?: InputWrapperProps;

  // ...
} & DatePickerPropsExtend &
  Pick<InputProps, 'isError' | 'errorMessage' | 'theme' | 'inputSize'>;

/**
 * **Parity DatePicker**.
 *
 * @see {@link https://beta-parity-react.vercel.app/datepicker Parity DatePicker}
 *
 * @see {@link https://flatpickr.js.org/options/ Flatpickr options}
 */
export const DatePicker = React.forwardRef<HTMLInputElement, DatePickerProps>(
  (
    {
      className,
      value,
      options = {},
      floatingLabel,
      // ...
      ...props
    },
    ref
  ) => {
    // destructuring some props 
    const { defaultDate, onClose, onOpen, onReady, ...restOptions } = options;

    // State and refs
    const inputRef = React.useRef<any>(null);
    const combinedRefs = useCombinedRefs(ref, inputRef);
    const [currentValue, setCurrentValue] = React.useState(defaultDate || value || '');
    // ...

    // Event handlers
    const handleIconClick = (e: any) => {
      combinedRefs.current && combinedRefs.current.flatpickr.input.focus();
    };

    const handleOnInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onInputChange?.(e, flatPickrInstance.current);
    };
     // ...


    // UI elements
    const CalenderIcon = (
      <button
        type='button'
        className='square-icon input-icon cursor-pointer'
        tabIndex={-1}
        onClick={handleIconClick}
        disabled={disabled || readOnly}
      >
        {icon ? icon : <Calendar />}
      </button>
    );
    // ...

    // Declare redering variables
    const floatingLabelActive = disabled ? undefined : floatingLabel;
    const inputValueActive = disabled ? undefined : value || defaultDate || '';
    const defaultValueActive = disabled ? undefined : defaultDate;
    const placeholderActive = disabled ? undefined : placeholder;
    const addedClassname = CalenderIcon && sideIcon === 'right' && 'input-action';
    // ...

    // hooks
    React.useEffect(() => {
      setCurrentValue(value || '');
    }, [value]);
    // ...

    // conditional rendering size
    return (
      <InputWrapper
        className={classNames(addedClassname, wrapperProps?.className)}
        rightElement={sideIcon === 'right' && CalenderIcon}
        leftElement={sideIcon === 'left' && CalenderIcon}
        {...wrapperProps}
      >
        {floatingLabel && <ContainedLabel isActive={!!currentValue}>{floatingLabelActive}</ContainedLabel>}
           ...
        {errorMessage && isError && <ErrorMessage>{errorMessage}</ErrorMessage>}
      </InputWrapper>
    );
  }
);

DatePicker.displayName = 'DatePicker';

// Declare others dependent components

// ...

```