import React from 'react';
import './index.css';
import './variables.css';
import '../BaseInput/index.css';
import classNames from 'classnames';
import Flatpickr, { DateTimePickerProps } from 'react-flatpickr';
import { InputWrapper, InputWrapperProps } from '../BaseInput';
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
  locale?: keyof typeof DatePickerLocales;
}

export const DatePicker = React.forwardRef<
  HTMLInputElement,
  {
    onFocus?: (e: any) => void;
    onBlur?: (e: any) => void;
  } & DatePickerProps
>(
  (
    {
      className,
      options,
      floatingLabel,
      value,
      defaultValue,
      wrapperProps,
      color = 'neutral',
      locale = 'default',
      onReady,
      onFocus,
      onClose,
      onChange,
      readOnly,
      disabled,
      ...props
    },
    ref
  ) => {
    const inputRef = React.useRef<any>(null);
    const combinedRefs = useCombinedRefs(ref, inputRef);
    const [isFocused, setIsFocused] = React.useState(false);
    const [currentValue, setCurrentValue] = React.useState(defaultValue || value || '');

    const handleIconclick = (e: any) => {
      combinedRefs.current && combinedRefs.current.flatpickr.input.focus();
    };

    const RightBtn = (
      <button
        type='button'
        className='cursor-pointer'
        tabIndex={-1}
        onClick={handleIconclick}
        disabled={disabled || readOnly}
      >
        <Calendar />
      </button>
    );

    const addedClassname = RightBtn && 'input-action';

    const handleFocus = (e: any) => {
      setIsFocused(true);
      onFocus?.(e);
    };

    const handleOnClose = (selectedDates: Date[], dateStr: string, instance: Instance, data: any) => {
      setIsFocused(false);
      onClose?.(selectedDates, dateStr, instance, data);
    };

    const handleOnReady = (selectedDates: Date[], dateStr: string, instance: Instance, data: any) => {
      instance.calendarContainer.classList.add(`flatpickr-calendar-${color}`);

      // **CONSIDER
      // const element = document.createElement('div');
      // element.innerHTML = 'This is select';
      // instance.calendarContainer.prepend(element);

      onReady?.(selectedDates, dateStr, instance, data);
    };

    const handleChange = (dates: Date[], currentDateString: string, self: Instance, data?: any) => {
      // setCurrentValue(currentDateString);
      onChange?.(dates, currentDateString, self, data);
    };

    React.useEffect(() => {
      setCurrentValue(value || '');
    }, [value]);

    return (
      <InputWrapper
        className={classNames(addedClassname, wrapperProps?.className)}
        rightElement={RightBtn}
        {...wrapperProps}
      >
        {floatingLabel && <ContainedLabel isActive={isFocused || !!currentValue}>{floatingLabel}</ContainedLabel>}
        <Flatpickr
          className={classNames('date-picker', 'par-input', className)}
          value={currentValue}
          defaultValue={defaultValue}
          onFocus={handleFocus}
          onClose={handleOnClose}
          onReady={handleOnReady}
          disabled={disabled}
          readOnly={readOnly}
          options={{
            // disableMobile: true,
            onChange: handleChange,
            clickOpens: !readOnly && !disabled,
            locale: DatePickerLocales[locale],
            dateFormat: 'd/m/Y',
            ...options
          }}
          {...props}
          ref={combinedRefs as any}
        />
      </InputWrapper>
    );
  }
);

DatePicker.displayName = 'DatePicker';

// https://flatpickr.js.org/options/
