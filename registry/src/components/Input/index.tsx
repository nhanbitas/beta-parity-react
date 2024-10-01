'use client';

import * as React from 'react';
import classNames from 'classnames';
import './index.css';
import { X } from 'lucide-react';
import { ContainedLabel } from '../FloatingLabel';
import useCombinedRefs from '../hooks/useCombinedRefs';
import { PolymorphicComponentProps, createPolymorphicComponent } from '../Base/factory';
import Base, { BaseProps } from '../Base';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /**
   * Added className for the wrapper input
   */
  wrapperProps?: InputWrapperProps & React.HTMLAttributes<HTMLDivElement>;

  /**
   * Added className for the clear button
   */
  clearBtnClassName?: string;

  /**
   * Define the visible of clear button
   */
  isClearable?: boolean;

  /**
   * Define of floating label of input
   *
   * If the value is component, the floating label will be generate by that component
   */
  floatingLabel?: React.ReactNode;

  /**
   * Callback function when clear value of input
   */
  onClear?: () => void;

  /**
   * Added action button, generate in the right of clear button (if any)
   */
  ActionBtn?: JSX.Element | React.ReactNode;

  /**
   * Define of error state
   */
  isError?: boolean;

  /**
   * Define of success state
   */
  isSuccess?: boolean;
}

/**
 * Input component with basic usage
 *
 * @see http://localhost:3005/input
 */
export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      value,
      type = 'text',
      isClearable,
      ActionBtn,
      isError,
      isSuccess,
      wrapperProps,
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

    const addedClassname = isClearable && ActionBtn ? 'input-actions' : isClearable || ActionBtn ? 'input-action' : '';

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

    const { className: wrapperClassName, rightElement: _, ...restWrapperProps } = wrapperProps || {};

    return (
      <InputWrapper
        className={classNames(addedClassname, wrapperClassName)}
        rightElement={RightInputActions}
        {...restWrapperProps}
      >
        {floatingLabel && <ContainedLabel isActive={isFocused || !!currentValue}>{floatingLabel}</ContainedLabel>}
        <input
          type={type}
          className={classNames(
            'par-input',
            { 'error-state': isError, 'success-state': isSuccess, 'non-value': !currentValue },
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

export interface InputWrapperProps extends BaseProps {
  leftElement?: JSX.Element | React.ReactNode;
  rightElement?: JSX.Element | React.ReactNode;
}

/**
 * Input wrapper fo input tag
 *
 * Specific props: leftElement, rightElement
 */
export const InputWrapper = createPolymorphicComponent<'div', InputWrapperProps>(
  <C extends React.ElementType = 'div'>(
    {
      component,
      className,
      children,
      leftElement,
      rightElement,
      ...props
    }: PolymorphicComponentProps<C, InputWrapperProps>,
    ref: React.Ref<any>
  ) => {
    const Component = component || ('div' as C);

    return (
      <Base component={Component} className={classNames('input-wrapper', className)} ref={ref} {...props}>
        {leftElement && <div className='left-element-container'>{leftElement}</div>}
        {children}
        {rightElement && <div className='right-element-container'>{rightElement}</div>}
      </Base>
    );
  }
);

InputWrapper.displayName = 'InputWrapper';

export interface ValueInputWrapperProps extends React.HTMLAttributes<HTMLDivElement> {}

export const ValueInputWrapper = React.forwardRef<HTMLDivElement, ValueInputWrapperProps>(
  ({ children, className, ...props }, ref) => (
    <div className={classNames('value-input-wrapper', className)} {...props} ref={ref}>
      {children}
    </div>
  )
);

ValueInputWrapper.displayName = 'ValueInputWrapper';
