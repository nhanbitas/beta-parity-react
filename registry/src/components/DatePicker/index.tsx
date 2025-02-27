import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './variables.css';
import '../BaseInput/index.css';
import classNames from 'classnames';
import Flatpickr, { DateTimePickerProps } from 'react-flatpickr';
import { ErrorMessage, InputProps, InputWrapper, InputWrapperProps, sizeMap } from '../BaseInput';
import { Calendar } from 'lucide-react';
import useCombinedRefs from '../hooks/useCombinedRefs';
import { ContainedLabel } from '../FloatingLabel';
import { Instance } from 'flatpickr/dist/types/instance';
import { Vietnamese } from 'flatpickr/dist/l10n/vn.js';
import { default as defaultLocale } from 'flatpickr/dist/l10n/default.js';
import { MandarinTraditional } from 'flatpickr/dist/l10n/zh-tw.js';
import { Mandarin } from 'flatpickr/dist/l10n/zh.js';

export const DatePickerLocales = {
  default: defaultLocale,
  en: defaultLocale,
  vn: Vietnamese,
  'zh-cn': Mandarin,
  'zh-tw': MandarinTraditional
};

export interface DatePickerProps extends DateTimePickerProps {
  floatingLabel?: React.ReactNode;
  wrapperProps?: InputWrapperProps;
  color?: 'neutral' | 'accent';
  icon?: React.ReactNode;
  sideIcon?: 'left' | 'right';
  locale?: keyof typeof DatePickerLocales;
  calenderHeader?: React.ReactNode;
}

export const DatePicker = React.forwardRef<
  HTMLInputElement,
  {
    onFocus?: (e: any) => void;
    onBlur?: (e: any) => void;
  } & DatePickerProps &
    Pick<InputProps, 'isError' | 'errorMessage' | 'theme' | 'inputSize'>
>(
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
      readOnly,
      disabled,
      ...props
    },
    ref
  ) => {
    const { defaultDate, onClose, onOpen, onReady, ...restOptions } = options;
    const inputRef = React.useRef<any>(null);
    const combinedRefs = useCombinedRefs(ref, inputRef);
    const calenderHeaderRef = React.useRef<HTMLElement | null>(null);
    const [isFocused, setIsFocused] = React.useState(false);
    const [currentValue, setCurrentValue] = React.useState(defaultDate || value || '');

    const handleIconclick = (e: any) => {
      combinedRefs.current && combinedRefs.current.flatpickr.input.focus();
    };

    const CalenderIcon = (
      <button
        type='button'
        className='square-icon input-icon cursor-pointer'
        tabIndex={-1}
        onClick={handleIconclick}
        disabled={disabled || readOnly}
      >
        {icon ? icon : <Calendar />}
      </button>
    );

    const addedClassname = CalenderIcon && sideIcon === 'right' && 'input-action';

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
      if (readOnly || disabled) return instance.close();
      (onOpen as Function)?.(selectedDates, dateStr, instance, data);
    };

    const floatingLabelActive = disabled ? undefined : floatingLabel;
    const inputValueActive = disabled ? undefined : defaultDate || value || '';
    const defaultValueActive = disabled ? undefined : defaultDate;
    const placeholderActive = disabled ? undefined : placeholder;

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
            dateFormat: 'd/m/Y',
            onClose: handleOnClose,
            onOpen: handleOnOpen,
            onReady: handleOnReady,
            ...restOptions
          }}
          {...props}
        />

        {errorMessage && isError && <ErrorMessage>{errorMessage}</ErrorMessage>}
      </InputWrapper>
    );
  }
);

DatePicker.displayName = 'DatePicker';

// https://flatpickr.js.org/options/
