import * as React from 'react';
import './index.css';
import './variables.css';
import classNames from 'classnames';
import useCombinedRefs from '@ui/hooks/useCombinedRefs';
import { ErrorMessage, InputProps, InputWrapper } from '@ui/BaseInput';
import { Button } from '@ui/Button';

// =========================
// Textarea
// =========================
// Declare and export Textarea type and Textarea component

/**
 * Props for the Textarea component.
 *
 * Extends properties from the `span` element and some of the `InputProps`.
 */
export interface TextareaProps
  extends React.HTMLAttributes<HTMLTextAreaElement>,
    Pick<
      InputProps,
      'value' | 'theme' | 'isError' | 'wrapperProps' | 'isClearable' | 'errorMessage' | 'disabled' | 'readOnly'
    > {
  /**
   * Specifies the maximum number of characters that the textarea can contain.
   * If provided, the component enforces this limit on user input.
   *
   * Example:
   * ```tsx
   * <Textarea maxLength={200} />
   * ```
   *
   * @memberof Textarea
   */
  maxLength?: number;

  /**
   * Sets the number of visible text lines in the textarea.
   *
   * Example:
   * ```tsx
   * <Textarea rows={4} />
   * ```
   *
   * @memberof Textarea
   */
  rows?: number;

  /**
   * Text displayed on the clear button when `isClearable` is true.
   * If not provided, a default value may be used.
   *
   * Example:
   * ```tsx
   * <Textarea isClearable clearBtnText="Remove" />
   * ```
   *  @memberof Textarea
   */
  clearBtnText?: string;
}

/**
 * **Parity Textarea**

 *  @see {@link http://localhost:3005/textarea Parity Textarea}
 */
export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      className,
      wrapperProps,
      theme = 'default',
      rows = 2,
      disabled = false,
      readOnly = false,
      isClearable = false,
      errorMessage = '',
      clearBtnText = 'Clear',
      value,
      defaultValue,
      maxLength,
      isError,
      onChange,
      ...props
    },
    ref
  ) => {
    const textareaRef = React.useRef<HTMLTextAreaElement>(null);
    const combinedRef = useCombinedRefs(textareaRef, ref);
    const [currentValue, setCurrentValue] = React.useState(value || defaultValue || '');

    const isHasFootter = (maxLength !== undefined || isClearable) && !disabled;
    const isShowClearButton = isClearable && !!currentValue && !readOnly && !disabled;

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      if (maxLength && e.target.value.length > maxLength) return;

      setCurrentValue(e.target.value);
      onChange && onChange(e);

      textareaRef.current?.scrollTo(0, textareaRef.current.scrollHeight);
    };

    const handleClear = () => {
      if (isClearable && currentValue) {
        setCurrentValue('');
        onChange && onChange({ target: { value: '' } } as React.ChangeEvent<HTMLTextAreaElement>);
      }
    };

    React.useEffect(() => {
      setCurrentValue(value || defaultValue || '');
    }, [value, defaultValue]);

    return (
      <InputWrapper {...wrapperProps} className={classNames('par-textarea-wrapper', wrapperProps?.className)}>
        <textarea
          className={classNames('par-textarea', 'par-input', theme, { 'error-state': isError }, className)}
          ref={combinedRef}
          rows={rows}
          maxLength={maxLength}
          value={currentValue}
          onChange={handleChange}
          disabled={disabled}
          readOnly={readOnly}
          {...props}
        />

        {isHasFootter && (
          <>
            <div className={classNames('par-textarea-footer', { reverse: isClearable && !maxLength })}>
              {maxLength ? (
                <span className='textarea-footer-count'>{`${currentValue.toString().split('').length}/${maxLength}`}</span>
              ) : null}
              {isShowClearButton ? (
                <Button size='sm' kind='glass' color='neutral' className='textarea-clear-btn' onClick={handleClear}>
                  {clearBtnText}
                </Button>
              ) : null}
            </div>
          </>
        )}

        {errorMessage && isError && <ErrorMessage>{errorMessage}</ErrorMessage>}
      </InputWrapper>
    );
  }
);

Textarea.displayName = 'Textarea';
