import * as React from 'react';
import classNames from 'classnames';
import './index.css';
import './variables.css';
import { ChevronsUpDown, X } from 'lucide-react';
import { ContainedLabel } from '../FloatingLabel';
import useCombinedRefs from '../hooks/useCombinedRefs';
import { BaseProps } from '../Base';
import { useOutsideClick } from '../hooks/useOutsideClick';

// =========================
// Input
// =========================
// Declare and export select type and Input component

const sizeMap = {
  sm: 'small',
  md: 'medium'
} as const;

/**
 * Props for the Input component.
 *
 * Extends properties from the `input` element.
 */
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /**
   * More props for the wrapper input
   *
   * @memberof InputProps
   */
  wrapperProps?: InputWrapperProps & React.HTMLAttributes<HTMLDivElement>;

  /**
   * More props for the clear button
   *
   * @memberof InputProps
   */
  clearBtnProps?: React.ButtonHTMLAttributes<HTMLButtonElement>;

  /**
   * Define the visible of clear button
   *
   * @default false
   *
   * @memberof InputProps
   */
  isClearable?: boolean;

  /**
   * Define of floating label of input
   *
   * If the value is component, the floating label will be generate by that component
   *
   * @memberof InputProps
   */
  floatingLabel?: React.ReactNode;

  /**
   * Callback function when clear value of input
   *
   * @memberof InputProps
   */
  onClear?: () => void;

  /**
   * More action button, generate in the right of clear button (if any)
   *
   *
   * @memberof InputProps
   */
  ActionBtn?: JSX.Element | React.ReactNode;

  /**
   * Define of error state
   *
   * @default false
   * @memberof InputProps
   */
  isError?: boolean;

  /**
   * Define of error message
   *
   * @memberof InputProps
   */
  errorMessage?: string;

  /**
   * Define of left icon
   *
   * @memberof InputProps
   */
  leftIcon?: React.ReactNode;

  /**
   * Define of theme
   *
   * @default 'default'
   * @memberof InputProps
   */
  theme?: 'default' | 'alternative';

  /**
   * Define of size
   *
   * @default 'sm'
   * @memberof InputProps
   */
  inputSize?: keyof typeof sizeMap;
}

/**
 * **Parity Input**
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
      isClearable = false,
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
      // Because right or left element can be focused (not mount permanently), we need check relatedTarget is inside wrapper for maintain focus
      const relatedTarget = e.relatedTarget as HTMLElement; // New focus element
      if (!relatedTarget || !(wrapperRef.current as HTMLElement | null)?.contains(relatedTarget)) {
        setIsFocused(false);
        onBlur && onBlur(e);
      }
    };

    const wrapperRef = useOutsideClick(() => {
      // Because right or left element can be focused (not mount permanently), we need handle outside click for maintain focus
      // should check (floatingLabel && isFocused) for performance
      if (floatingLabel && isFocused) {
        setIsFocused(false);
      }
    });

    React.useEffect(() => {
      setCurrentValue(value || '');
    }, [value]);

    const addedClassname = isClearable && ActionBtn ? 'input-actions' : isClearable || ActionBtn ? 'input-action' : '';
    const { className: clearBtnClassName, onClick: clearBtnClick, ...restClearBtnProps } = clearBtnProps || {};

    const isHasRightInputAction = isClearable || ActionBtn;
    const isActiveRightInputAction = floatingLabel
      ? (currentValue || isFocused) && isHasRightInputAction
      : isHasRightInputAction;
    const isActiveClearButton = isClearable && currentValue && !readOnly && !disabled;
    const isActiveFloatingLabel = readOnly ? true : isFocused || !!currentValue;

    const RightInputActions = isActiveRightInputAction && (
      <>
        {isActiveClearButton && (
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

    const { className: wrapperClassName, ...restWrapperProps } = wrapperProps || {};

    return (
      <InputWrapper
        ref={floatingLabel ? wrapperRef : undefined}
        className={classNames(addedClassname, wrapperClassName)}
        rightElement={RightInputActions}
        leftElement={leftIcon && <span className='input-icon'>{leftIcon}</span>}
        onFocus={handleFocus}
        onBlur={handleBlur}
        {...restWrapperProps}
      >
        {floatingLabel &&
          (!disabled ? (
            <ContainedLabel isActive={isActiveFloatingLabel}>{floatingLabel}</ContainedLabel>
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

export const InputWrapper = React.forwardRef<HTMLDivElement, InputWrapperProps>(
  ({ className, children, leftElement, rightElement, ...props }, ref) => {
    const DEFAULT_PADDING = 16;
    const DEFAULT_PADDING_ICON = 40;

    const leftElementRef = React.useRef<HTMLDivElement | null>(null);
    const rightElementRef = React.useRef<HTMLDivElement | null>(null);

    const [paddingLeft, setPaddingLeft] = React.useState(leftElement ? DEFAULT_PADDING_ICON : DEFAULT_PADDING);
    const [paddingRight, setPaddingRight] = React.useState(rightElement ? DEFAULT_PADDING_ICON : DEFAULT_PADDING);

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
            ...(leftElementRef.current && { paddingLeft }),
            ...(rightElementRef.current && { paddingRight })
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

export interface ValueInputWrapperProps extends React.HTMLAttributes<HTMLDivElement> {
  theme?: 'default' | 'alternative';
}

export const ValueInputWrapper = React.forwardRef<HTMLDivElement, ValueInputWrapperProps>(
  ({ children, className, theme = 'default', ...props }, ref) => (
    <div className={classNames('value-input-wrapper', className, theme)} {...props} ref={ref}>
      {children}
    </div>
  )
);

ValueInputWrapper.displayName = 'ValueInputWrapper';

// =========================
// UnitSelector
// =========================

export interface UnitSelectorProps extends React.HTMLAttributes<HTMLSelectElement> {
  unit?: string | string[];
  onUnitChange?: (e: any) => void;
  unitValue?: string;
  disabled?: boolean;
  theme?: 'default' | 'alternative';
}

export const UnitSelector = ({
  unit,
  theme = 'default',
  onUnitChange,
  unitValue,
  disabled,
  ...props
}: UnitSelectorProps) => {
  const isSelectUnit = Array.isArray(unit);

  const initialValue = unitValue ?? unit?.[0];
  const [selectedUnit, setSelectedUnit] = React.useState(initialValue);
  const [width, setWidth] = React.useState(0);

  const handleUnitChange = (e: any) => {
    if (disabled) return;
    setSelectedUnit(e.target.value);
    onUnitChange?.(e);
  };

  const calculateWidth = (currentUnit: string) => {
    if (typeof document === 'undefined') return;
    let termWidth = 0;
    const tempSpan = document.createElement('span');
    tempSpan.style.visibility = 'hidden';
    tempSpan.style.position = 'absolute';
    tempSpan.style.whiteSpace = 'nowrap';
    tempSpan.textContent = currentUnit;
    document?.body?.appendChild(tempSpan);
    const textWidth = tempSpan.offsetWidth;
    termWidth = textWidth + 24;
    document.body.removeChild(tempSpan);
    return termWidth;
  };

  React.useEffect(() => {
    setSelectedUnit(unitValue);
  }, [unitValue]);

  React.useLayoutEffect(() => {
    if (!selectedUnit) return;
    setWidth(calculateWidth(selectedUnit) || 0);
  }, [selectedUnit]);

  return !!unit ? (
    <span className={`input-icon input-unit ${isSelectUnit ? 'selectable' : ''}`}>
      {isSelectUnit ? (
        <>
          <select
            className={classNames('unit-selector', theme)}
            value={selectedUnit}
            onChange={handleUnitChange}
            style={{ width: width ? `${width}px` : 'auto' }}
            disabled={disabled}
            {...props}
          >
            {unit.map((unit: any) => (
              <option key={unit} value={unit}>
                {unit}
              </option>
            ))}
          </select>
          <span className='unit-selector-arrow'>
            <ChevronsUpDown />
          </span>
        </>
      ) : (
        unit
      )}
    </span>
  ) : null;
};
