'use client';

import * as React from 'react';
import './index.css';
import '../input/index.css';
import classNames from 'classnames';

export interface TextAreaProps extends React.HTMLAttributes<HTMLTextAreaElement> {
  value?: string;
  maxLength?: number;
  isClearable?: boolean;
  wrapperProps?: React.HTMLAttributes<HTMLDivElement>;
}

export const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ className, wrapperProps, value, defaultValue, isClearable = false, maxLength, onChange, ...props }, ref) => {
    const [currentValue, setCurrentValue] = React.useState(value || defaultValue || '');

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setCurrentValue(e.target.value);
      onChange && onChange(e);
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
      <div {...wrapperProps} className={classNames('text-area-wrapper', wrapperProps?.className)}>
        <textarea
          className={classNames('text-area', 'par-input', className)}
          ref={ref}
          maxLength={maxLength}
          value={currentValue}
          onChange={handleChange}
          {...props}
        ></textarea>
        <div className='text-area-footer'>
          {maxLength ? <span>{`${currentValue.toString().split('').length}/${maxLength}`}</span> : null}
          {isClearable && !!currentValue ? <span onClick={handleClear}>Clear</span> : null}
        </div>
      </div>
    );
  }
);

TextArea.displayName = 'TextArea';
