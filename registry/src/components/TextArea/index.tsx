import * as React from 'react';
import './index.css';
import './variables.css';
import classNames from 'classnames';
import useCombinedRefs from '../hooks/useCombinedRefs';
import { ErrorMessage, InputProps, InputWrapper } from '../BaseInput';
import { Button } from '../Button';

export interface TextAreaProps
  extends React.HTMLAttributes<HTMLTextAreaElement>,
    Pick<
      InputProps,
      'value' | 'theme' | 'isError' | 'wrapperProps' | 'isClearable' | 'errorMessage' | 'disabled' | 'readOnly'
    > {
  maxLength?: number;
  rows?: number;
}

export const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
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
          <div className={classNames('par-textarea-footer', { reverse: isClearable && !maxLength })}>
            {maxLength ? <span>{`${currentValue.toString().split('').length}/${maxLength}`}</span> : null}
            {isShowClearButton ? (
              <Button size='sm' kind='glass' color='neutral' className='textarea-clear-btn' onClick={handleClear}>
                Clear
              </Button>
            ) : null}
          </div>
        )}

        {errorMessage && isError && <ErrorMessage>{errorMessage}</ErrorMessage>}
      </InputWrapper>
    );
  }
);

TextArea.displayName = 'TextArea';
