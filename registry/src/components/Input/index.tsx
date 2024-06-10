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
      type = 'text',
      isClearable,
      onClear,
      floatingLabel,
      ActionBtn,
      isError,
      isSuccess,
      wrapperClassname,
      onChange,
      onFocus,
      onBlur,
      ...props
    },
    ref
  ) => {
    const [value, setValue] = React.useState(props.value || '');
    const [isActiveContainedLabel, setIsActiveContainedLabel] = React.useState(props.value ? true : false);
    const inputRef = React.useRef<HTMLInputElement>(null);
    const combinedRef = useCombinedRefs(inputRef, ref);

    const handleClear = () => {
      setValue('');
      combinedRef.current && combinedRef.current.focus();
      onClear && onClear();
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value);
      onChange && onChange(e);
    };

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsActiveContainedLabel(true);
      onFocus && onFocus(e);
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      !value && setIsActiveContainedLabel(false);
      onBlur && onBlur(e);
    };

    if (!isClearable && !ActionBtn && !floatingLabel)
      return (
        <input
          type={type}
          className={classNames('input', { 'error-state': isError }, { 'success-state': isSuccess }, className)}
          ref={ref}
          {...props}
        />
      );

    if (isClearable || floatingLabel || ActionBtn) {
      const addedClassname = isClearable && ActionBtn ? 'with-actions' : isClearable || ActionBtn ? 'with-action' : '';

      return (
        <div className={classNames('input-wrapper', addedClassname, wrapperClassname)}>
          {floatingLabel && <ContainedLabel isActive={isActiveContainedLabel}>{floatingLabel}</ContainedLabel>}

          <input
            type={type}
            className={classNames('input', { 'error-state': isError }, { 'success-state': isSuccess }, className)}
            ref={combinedRef}
            {...props}
            value={value}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />

          {isActiveContainedLabel && value && (
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
        </div>
      );
    }
  }
);

Input.displayName = 'Input';

export { Input };
