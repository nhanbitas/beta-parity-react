'use client';

import * as React from 'react';
import classNames from 'classnames';
import './index.css';
import { X } from 'lucide-react';
import { ContainedLabel } from '../FloatingLabel';
import useCombinedRefs from '../hooks/useCombinedRefs';
import { NumericFormat, NumericFormatProps, PatternFormat, PatternFormatProps } from 'react-number-format';
import { InputWrapper, InputProps } from '../Input';

export interface NumberInputProps extends InputProps {
  min?: number;
  max?: number;
  minCharacters?: number;
  maxCharacters?: number;
  isPattern?: boolean;
  format?: any;
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
      floatingLabel,
      ActionBtn,
      isError,
      isSuccess,
      wrapperClassname,
      clearBtnClassName,
      min,
      max,
      minCharacters,
      maxCharacters,
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
    const [isActiveContainedLabel, setIsActiveContainedLabel] = React.useState(value || defaultValue ? true : false);
    const inputRef = React.useRef<HTMLInputElement>(null);
    const combinedRef = useCombinedRefs(inputRef, ref);
    const TagName = isPattern ? PatternFormat : NumericFormat;

    const handleClear = () => {
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
      setIsActiveContainedLabel(true);
      onFocus && onFocus(e);
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      !currentValue && setIsActiveContainedLabel(false);
      onBlur && onBlur(e);
    };

    React.useEffect(() => {
      setCurrentValue(value as string | number | null | undefined);
    }, [value]);

    const currentProps = isPattern ? { ...(props as PatternFormatProps) } : { ...(props as NumericFormatProps) };

    if (!isClearable && !ActionBtn && !floatingLabel)
      return (
        <TagName
          className={classNames('input', { 'error-state': isError }, { 'success-state': isSuccess }, className)}
          getInputRef={combinedRef}
          format={format ? format : undefined}
          value={currentValue}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          {...currentProps}
        />
      );

    if (isClearable || floatingLabel || ActionBtn) {
      const addedClassname = isClearable && ActionBtn ? 'with-actions' : isClearable || ActionBtn ? 'with-action' : '';

      const isHasRightInputAction = isActiveContainedLabel && (isClearable || ActionBtn);

      const RightInputActions = isHasRightInputAction && (
        <>
          {isClearable && currentValue && (
            <button type='button' className={classNames('clear-button', clearBtnClassName)} onClick={handleClear}>
              <X />
            </button>
          )}
          {ActionBtn ? ActionBtn : null}
        </>
      );

      return (
        <InputWrapper className={classNames(addedClassname, wrapperClassname)} rightElement={RightInputActions}>
          {floatingLabel && (
            <ContainedLabel isActive={isActiveContainedLabel || props.allowEmptyFormatting}>
              {floatingLabel}
            </ContainedLabel>
          )}

          <TagName
            className={classNames('input', { 'error-state': isError }, { 'success-state': isSuccess }, className)}
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
  }
);

NumberInput.displayName = 'NumberInput';
