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
import { ErrorMessage, InputProps, InputWrapper, InputWrapperProps, sizeMap } from '../BaseInput';

// Import locales
import { Mandarin } from 'flatpickr/dist/l10n/zh.js';
import { Vietnamese } from 'flatpickr/dist/l10n/vn.js';
import { MandarinTraditional } from 'flatpickr/dist/l10n/zh-tw.js';
import { default as defaultLocale } from 'flatpickr/dist/l10n/default.js';

export const DatePickerLocales: Record<string, any> = {
  default: defaultLocale,
  en: defaultLocale,
  vn: Vietnamese,
  'zh-cn': Mandarin,
  'zh-tw': MandarinTraditional
} as const;

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

  /**
   * Theme color for the DatePicker.
   * - `'neutral'`: Uses a neutral color.
   * - `'accent'`: Uses an accent color.
   *
   * @default 'neutral'
   */
  color?: 'neutral' | 'accent';

  /**
   * Icon displayed inside the input field.
   * @default undefined
   */
  icon?: React.ReactNode;

  /**
   * Position of the secondary icon inside the input.
   * - `'left'`: Displays on the left.
   * - `'right'`: Displays on the right.
   *
   * @default 'right'
   */
  sideIcon?: 'left' | 'right';

  /**
   * Locale for the DatePicker, based on `DatePickerLocales`.
   *
   * - `'de
   *
   * @default 'default'
   */
  locale?: keyof typeof DatePickerLocales;

  /**
   * Custom component displayed at the top of the calendar.
   * @default undefined
   */
  calenderHeader?: React.ReactNode;

  /**
   * Additional options for the Flatpickr component.
   * @default undefined
   *
   * @see {@link https://flatpickr.js.org/options/ Flatpickr options}
   */
  options?: Partial<BaseOptions>;
}

/**
 * Props for `DatePicker`, including inherited properties from `DatePickerPropsExtend`.
 * @extends DatePickerPropsExtend
 * @memberof DatePicker
 */
type DatePickerProps = {
  /**
   * Callback function triggered when the input gains focus.
   * @param e - Focus event.
   * @default undefined
   */
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;

  /**
   * Callback function triggered when the input loses focus.
   * @param e - Blur event.
   * @default undefined
   */
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;

  /**
   * Callback function triggered when the input change (allowInput =`true`).
   * @param e - Change event.
   * @default undefined
   */
  onInputChange?: (e: React.ChangeEvent<HTMLInputElement>, flatPickrInstance: Instance | null) => void;
} & DatePickerPropsExtend &
  Pick<InputProps, 'isError' | 'errorMessage' | 'theme' | 'inputSize'>;

/**
 * **Parity DatePicker**.
 *
 * @see {@link http://localhost:3005/datepicker Parity DatePicker}
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
      wrapperProps,
      calenderHeader,
      icon,
      sideIcon = 'right',
      color = 'neutral',
      locale = 'default',
      theme = 'default',
      isError = false,
      errorMessage = '',
      inputSize = 'md',
      placeholder,
      onFocus,
      onInputChange,
      readOnly,
      disabled,
      ...props
    },
    ref
  ) => {
    const { defaultDate, onClose, onOpen, onReady, ...restOptions } = options;

    // State and refs
    const inputRef = React.useRef<any>(null);
    const combinedRefs = useCombinedRefs(ref, inputRef);
    const flatPickrInstance = React.useRef<Instance | null>(null);
    const calenderHeaderRef = React.useRef<HTMLElement | null>(null);
    const [isFocused, setIsFocused] = React.useState(false);
    const [currentValue, setCurrentValue] = React.useState(defaultDate || value || '');

    // Event handlers
    const handleIconClick = (e: any) => {
      combinedRefs.current && combinedRefs.current.flatpickr.input.focus();
    };

    const handleFocus = (e: any) => {
      setIsFocused(true);
      onFocus?.(e);
    };

    const handleOnClose = (selectedDates: Date[], dateStr: string, instance: Instance, data: any) => {
      setCurrentValue(dateStr);
      setIsFocused(false);
      (onClose as Function)?.(selectedDates, dateStr, instance, data);
    };

    const handleOnReady = (selectedDates: Date[], dateStr: string, instance: Instance, data: any) => {
      if (readOnly || disabled) return instance.close();

      flatPickrInstance.current = instance;
      instance.calendarContainer.classList.add(`flatpickr-calendar-${color}`);

      if (calenderHeader) {
        const headerElement = document.createElement('div');
        headerElement.classList.add('flatpickr-calendar-header');
        instance.calendarContainer.prepend(headerElement);
        calenderHeaderRef.current = headerElement;
      }

      (onReady as Function)?.(selectedDates, dateStr, instance, data);
    };

    const handleOnOpen = (selectedDates: Date[], dateStr: string, instance: Instance, data: any) => {
      (onOpen as Function)?.(selectedDates, dateStr, instance, data);
    };

    const handleOnInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onInputChange?.(e, flatPickrInstance.current);
    };

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

    // Skip rendering elements if disabled
    const floatingLabelActive = disabled ? undefined : floatingLabel;
    const inputValueActive = disabled ? undefined : value || defaultDate || '';
    const defaultValueActive = disabled ? undefined : defaultDate;
    const placeholderActive = disabled ? undefined : placeholder;

    const addedClassname = CalenderIcon && sideIcon === 'right' && 'input-action';

    // Update currentValue when value prop changes
    React.useEffect(() => {
      setCurrentValue(value || '');
    }, [value]);

    return (
      <InputWrapper
        className={classNames(addedClassname, wrapperProps?.className)}
        rightElement={sideIcon === 'right' && CalenderIcon}
        leftElement={sideIcon === 'left' && CalenderIcon}
        {...wrapperProps}
      >
        {floatingLabel && <ContainedLabel isActive={isFocused || !!currentValue}>{floatingLabelActive}</ContainedLabel>}

        {calenderHeader &&
          calenderHeaderRef.current &&
          ReactDOM.createPortal(calenderHeader, calenderHeaderRef.current)}

        <Flatpickr
          ref={combinedRefs as any}
          className={classNames(
            'date-picker',
            'par-input',
            theme,
            { 'error-state': isError, [sizeMap[inputSize]]: inputSize },
            className
          )}
          {...(!readOnly ? { 'data-readonly': 'not-allowed-input' } : {})}
          placeholder={placeholderActive}
          value={inputValueActive}
          onFocus={handleFocus}
          disabled={disabled}
          readOnly={readOnly}
          options={{
            disableMobile: true,
            clickOpens: !readOnly && !disabled,
            locale: DatePickerLocales[locale],
            defaultDate: defaultValueActive,
            onClose: handleOnClose,
            onOpen: handleOnOpen,
            onReady: handleOnReady,
            ...restOptions
          }}
          {...props}
          render={({ value, ...props }, ref) => <input ref={ref} {...props} onChange={handleOnInputChange} />}
        />

        {errorMessage && isError && <ErrorMessage>{errorMessage}</ErrorMessage>}
      </InputWrapper>
    );
  }
);

DatePicker.displayName = 'DatePicker';
