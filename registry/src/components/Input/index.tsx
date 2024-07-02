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
  floatingLabel?: React.ReactNode;
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
      ActionBtn,
      isError,
      isSuccess,
      wrapperClassname,
      floatingLabel,
      onChange,
      onFocus,
      onBlur,
      onClear,
      ...props
    },
    ref
  ) => {
    const [currentValue, setCurrentValue] = React.useState(value || '');
    const [isFocused, setIsFocused] = React.useState(false);
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
      setIsFocused(true);
      onFocus && onFocus(e);
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false);
      onBlur && onBlur(e);
    };

    React.useEffect(() => {
      setCurrentValue(value || '');
    }, [value]);

    const addedClassname = isClearable && ActionBtn ? 'with-actions' : isClearable || ActionBtn ? 'with-action' : '';

    const isHasRightInputAction = isClearable || ActionBtn;

    const RightInputActions = isHasRightInputAction && (
      <>
        {isClearable && currentValue && (
          <button type='button' className={classNames('clear-button', props.clearBtnClassName)} onClick={handleClear}>
            <X />
          </button>
        )}
        {ActionBtn ? ActionBtn : null}
      </>
    );

    return (
      <InputWrapper className={classNames(addedClassname, wrapperClassname)} rightElement={RightInputActions}>
        {floatingLabel && <ContainedLabel isActive={isFocused || !!currentValue}>{floatingLabel}</ContainedLabel>}
        <input
          type={type}
          className={classNames(
            'input',
            { 'error-state': isError, 'success-state': isSuccess, 'no-value': !currentValue },
            className
          )}
          ref={combinedRef}
          value={currentValue}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          {...props}
        />
      </InputWrapper>
    );
  }
);

Input.displayName = 'Input';

export interface InputWrapperProps extends React.InputHTMLAttributes<HTMLInputElement> {
  leftElement?: JSX.Element | React.ReactNode;
  rightElement?: JSX.Element | React.ReactNode;
}

export const InputWrapper = React.forwardRef<HTMLInputElement, InputWrapperProps>(
  ({ className, children, leftElement, rightElement, ...props }, ref) => {
    return (
      <div className={classNames('input-wrapper', className)} ref={ref} {...props}>
        {leftElement && <div className='left-element-container'>{leftElement}</div>}
        {children}
        {rightElement && <div className='right-element-container'>{rightElement}</div>}
      </div>
    );
  }
);

InputWrapper.displayName = 'InputWrapper';

export { Input };
