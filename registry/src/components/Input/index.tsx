'use client';

import * as React from 'react';
import classNames from 'classnames';
import './index.css';
import { X } from 'lucide-react';
import { ContainedLabel } from '../FloatingLabel';
import useCombinedRefs from '../hooks/useCombinedRefs';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  wrapperClassname?: string;
  clearBtnClassName?: string;
  isClearable?: boolean;
  floatingLabel?: string;
  onClear?: () => void;
  ActionBtn?: JSX.Element | React.ReactNode;
  isError?: boolean;
  isSuccess?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      value,
      type = 'text',
      isClearable,
      floatingLabel,
      ActionBtn,
      isError,
      isSuccess,
      wrapperClassname,
      onChange,
      onFocus,
      onBlur,
      onClear,
      ...props
    },
    ref
  ) => {
    const [currentValue, setCurrentValue] = React.useState(value || '');
    const [isActiveContainedLabel, setIsActiveContainedLabel] = React.useState(value ? true : false);
    const inputRef = React.useRef<HTMLInputElement>(null);
    const combinedRef = useCombinedRefs(inputRef, ref);

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
      setCurrentValue(value || '');
    }, [value]);

    if (!isClearable && !ActionBtn && !floatingLabel)
      return (
        <input
          type={type}
          className={classNames('input', { 'error-state': isError }, { 'success-state': isSuccess }, className)}
          ref={combinedRef}
          {...props}
          value={currentValue}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          {...props}
        />
      );

    if (isClearable || floatingLabel || ActionBtn) {
      const addedClassname = isClearable && ActionBtn ? 'with-actions' : isClearable || ActionBtn ? 'with-action' : '';

      return (
        <InputWrapper className={classNames(addedClassname, wrapperClassname)}>
          {floatingLabel && <ContainedLabel isActive={isActiveContainedLabel}>{floatingLabel}</ContainedLabel>}

          <input
            type={type}
            className={classNames('input', { 'error-state': isError }, { 'success-state': isSuccess }, className)}
            ref={combinedRef}
            {...props}
            value={currentValue}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />

          {isActiveContainedLabel && currentValue && (
            <div className='action-container'>
              {isClearable && (
                <button
                  type='button'
                  className={classNames('clear-button', props.clearBtnClassName)}
                  onClick={handleClear}
                >
                  <X />
                </button>
              )}
              {ActionBtn ? ActionBtn : null}
            </div>
          )}
        </InputWrapper>
      );
    }
  }
);

Input.displayName = 'Input';

export interface InputWrapperProps extends React.InputHTMLAttributes<HTMLInputElement> {
  wrapperClassname?: string;
}

export const InputWrapper = React.forwardRef<HTMLInputElement, InputWrapperProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div className={classNames('input-wrapper', className)} ref={ref} {...props}>
        {children}
      </div>
    );
  }
);

InputWrapper.displayName = 'InputWrapper';

export { Input };
