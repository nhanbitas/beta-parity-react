'use client';

import * as React from 'react';
import classNames from 'classnames';
import './index.css';
import './variables.css';
import { X } from 'lucide-react';
import { ContainedLabel } from '../FloatingLabel';
import useCombinedRefs from '../hooks/useCombinedRefs';
import { BaseProps } from '../Base';

const sizeMap = {
  sm: 'small',
  md: 'medium'
} as const;

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /**
   * Added className for the wrapper input
   */
  wrapperProps?: InputWrapperProps & React.HTMLAttributes<HTMLDivElement>;

  /**
   * Added props for the clear button
   */
  clearBtnProps?: React.ButtonHTMLAttributes<HTMLButtonElement>;

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
   * Define of error message
   */
  errorMessage?: string;

  /**
   * Define of left icon
   */
  leftIcon?: React.ReactNode;

  /**
   * Define of theme
   */
  theme?: 'default' | 'alternative';

  /**
   * Define of size
   */
  inputSize?: keyof typeof sizeMap;
}

/**
 * Input component with basic usage
 *
 *  @see {@link http://localhost:3005/input Parity Input}
 */
export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      value,
      placeholder = '',
      type = 'text',
      disabled = false,
      readOnly = false,
      errorMessage = '',
      inputSize = 'sm',
      theme = 'default',
      isClearable,
      ActionBtn,
      leftIcon,
      isError,
      wrapperProps,
      clearBtnProps,
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
      if (disabled || readOnly) return;

      if (combinedRef.current) {
        setCurrentValue('');
        combinedRef.current.focus();
      }

      onClear && onClear();

      onChange && onChange({ target: { value: '' } } as React.ChangeEvent<HTMLInputElement>);
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
    const { className: clearBtnClassName, onClick: clearBtnClick, ...restClearBtnProps } = clearBtnProps || {};

    const RightInputActions = isHasRightInputAction && !disabled && (
      <>
        {isClearable && currentValue && !readOnly && (
          <button
            type='button'
            className={classNames('clear-button', clearBtnClassName)}
            onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
              handleClear();
              clearBtnClick && clearBtnClick(e);
            }}
            disabled={disabled || readOnly}
            {...restClearBtnProps}
          >
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
        leftElement={leftIcon && <span className='input-icon'>{leftIcon}</span>}
        {...restWrapperProps}
      >
        {floatingLabel &&
          (!disabled ? (
            <ContainedLabel isActive={readOnly ? true : isFocused || !!currentValue}>{floatingLabel}</ContainedLabel>
          ) : (
            <ContainedLabel isActive={false}></ContainedLabel>
          ))}

        <input
          type={type}
          placeholder={!disabled ? placeholder : ''}
          className={classNames(
            'par-input',
            theme,
            { 'error-state': isError, [sizeMap[inputSize]]: inputSize },
            className
          )}
          ref={combinedRef}
          value={value !== undefined && !disabled ? value : !disabled ? currentValue : ''}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          disabled={disabled}
          readOnly={readOnly}
          {...props}
        />

        {errorMessage && isError && <ErrorMessage>{errorMessage}</ErrorMessage>}
      </InputWrapper>
    );
  }
);

Input.displayName = 'Input';

// =========================
// InputWrapper
// =========================
// Declare and export select type and InputWrapper component

export interface InputWrapperProps extends React.HTMLAttributes<HTMLDivElement>, BaseProps {
  leftElement?: JSX.Element | React.ReactNode;
  rightElement?: JSX.Element | React.ReactNode;
}

/**
 * Input wrapper fo input tag
 *
 * Specific props: leftElement, rightElement
 */
export const InputWrapper = React.forwardRef<HTMLDivElement, InputWrapperProps>(
  ({ className, children, leftElement, rightElement, ...props }, ref) => {
    const DEFAULT_PADDING = 12;
    const leftElementRef = React.useRef<HTMLDivElement | null>(null);
    const rightElementRef = React.useRef<HTMLDivElement | null>(null);

    const [paddingLeft, setPaddingLeft] = React.useState(DEFAULT_PADDING);
    const [paddingRight, setPaddingRight] = React.useState(DEFAULT_PADDING);

    // Handle padding of input based on width of left and right elements
    React.useLayoutEffect(() => {
      const resizeObserver = new ResizeObserver(() => {
        const leftWidth = leftElementRef.current?.offsetWidth || DEFAULT_PADDING;
        const rightWidth = rightElementRef.current?.offsetWidth || DEFAULT_PADDING;

        setPaddingLeft(leftWidth);
        setPaddingRight(rightWidth);
      });

      if (leftElementRef.current) {
        resizeObserver.observe(leftElementRef.current);
      }

      if (rightElementRef.current) {
        resizeObserver.observe(rightElementRef.current);
      }
      return () => {
        resizeObserver.disconnect();
      };
    }, [leftElement, rightElement, children]);

    let childrenWithPadding = React.Children.map(children, (child) => {
      if (!React.isValidElement(child)) return child;

      if (child.type === 'input' || child.type === 'select') {
        return React.cloneElement(child as React.ReactElement, {
          style: {
            ...((child.props as React.HTMLAttributes<HTMLInputElement>).style || {}),
            ...(leftElementRef.current ? { paddingLeft } : {}),
            ...(rightElementRef.current ? { paddingRight } : {})
          } as React.CSSProperties | undefined
        });
      }
      return child;
    });

    return (
      <div className={classNames('input-wrapper', className)} ref={ref} {...props}>
        {leftElement && (
          <div className='left-element-container' ref={leftElementRef}>
            {leftElement}
          </div>
        )}
        {childrenWithPadding}
        {rightElement && (
          <div className='right-element-container' ref={rightElementRef}>
            {rightElement}
          </div>
        )}
      </div>
    );
  }
);

InputWrapper.displayName = 'InputWrapper';

// =========================
// ErrorMessage
// =========================
// Declare and export select type and ErrorMessage component

export interface ErrorMessageProps extends React.HTMLAttributes<HTMLDivElement> {}

export const ErrorMessage = React.forwardRef<HTMLDivElement, ErrorMessageProps>(
  ({ children, className, ...props }, ref) => (
    <span className={classNames('input-error-message', className)} {...props} ref={ref}>
      {children}
    </span>
  )
);

ErrorMessage.displayName = 'ErrorMessage';

// =========================
// ValueInputWrapper
// =========================
// Declare and export select type and ValueInputWrapper component

export interface ValueInputWrapperProps extends React.HTMLAttributes<HTMLDivElement> {}

export const ValueInputWrapper = React.forwardRef<HTMLDivElement, ValueInputWrapperProps>(
  ({ children, className, ...props }, ref) => (
    <div className={classNames('value-input-wrapper', className)} {...props} ref={ref}>
      {children}
    </div>
  )
);

ValueInputWrapper.displayName = 'ValueInputWrapper';
