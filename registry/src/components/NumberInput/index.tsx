'use client';

import * as React from 'react';
import classNames from 'classnames';
import './index.css';
import { X } from 'lucide-react';
import { ContainedLabel } from '../FloatingLabel';
import useCombinedRefs from '../hooks/useCombinedRefs';
import { NumericFormat, NumericFormatProps, PatternFormat, PatternFormatProps } from 'react-number-format';
import { InputWrapper, InputProps, InputWrapperProps } from '../Input';

export interface NumberInputProps extends InputProps {
  min?: number;
  max?: number;
  minCharacters?: number;
  maxCharacters?: number;
  isPattern?: boolean;
  format?: any;
  floatingLabel?: React.ReactNode;
  wrapperProps?: InputWrapperProps & React.HTMLAttributes<HTMLDivElement>;
}

export const NumberInput = React.forwardRef<
  HTMLInputElement,
  NumberInputProps & NumericFormatProps & Omit<PatternFormatProps, 'format' | 'isPattern'>
>(
  (
    {
      className,
      value,
      defaultValue,
      type,
      format = '',
      isPattern = false,
      isClearable,
      disabled = false,
      readOnly = false,
      ActionBtn,
      isError,
      wrapperProps,
      clearBtnProps,
      min,
      max,
      minCharacters,
      maxCharacters,
      floatingLabel,
      onChange,
      onFocus,
      onBlur,
      onClear,
      ...props
    },
    ref
  ) => {
    const [currentValue, setCurrentValue] = React.useState<string | number | null | undefined>(
      value || defaultValue || ''
    );
    const [isFocused, setIsFocused] = React.useState(false);
    const inputRef = React.useRef<HTMLInputElement>(null);
    const combinedRef = useCombinedRefs(inputRef, ref);
    const TagName = isPattern ? PatternFormat : NumericFormat;

    const handleClear = () => {
      if (disabled || readOnly) return;
      if (combinedRef.current) {
        setCurrentValue('');
        combinedRef.current.focus();
      }

      onClear && onClear();

      if (onChange) {
        onChange({ target: { value: '' } } as React.ChangeEvent<HTMLInputElement>);
      }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setCurrentValue(e.target.value);
      onChange && onChange(e);
    };

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(true);
      onFocus && onFocus(e);
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false);
      onBlur && onBlur(e);
    };

    React.useEffect(() => {
      setCurrentValue(value as string | number | null | undefined);
    }, [value]);

    const currentProps = isPattern ? { ...(props as PatternFormatProps) } : { ...(props as NumericFormatProps) };
    const addedClassname = isClearable && ActionBtn ? 'input-actions' : isClearable || ActionBtn ? 'input-action' : '';
    const isHasRightInputAction = isClearable || ActionBtn;
    const { className: clearBtnClassName, onClick: clearBtnClick, ...restClearBtnProps } = clearBtnProps || {};

    const RightInputActions = isHasRightInputAction && (
      <>
        {isClearable && currentValue && (
          <button
            type='button'
            className={classNames('clear-button', clearBtnClassName)}
            disabled={disabled || readOnly}
            onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
              handleClear();
              clearBtnClick && clearBtnClick(e);
            }}
            {...restClearBtnProps}
          >
            <X />
          </button>
        )}
        {ActionBtn ? ActionBtn : null}
      </>
    );

    return (
      <InputWrapper className={classNames(addedClassname, wrapperProps?.className)} rightElement={RightInputActions}>
        {floatingLabel && <ContainedLabel isActive={isFocused || !!currentValue}>{floatingLabel}</ContainedLabel>}
        <TagName
          className={classNames('number-input', 'par-input', { 'error-state': isError }, className)}
          getInputRef={combinedRef}
          format={format ? format : undefined}
          value={currentValue}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          {...currentProps}
        />
      </InputWrapper>
    );
  }
);

NumberInput.displayName = 'NumberInput';
