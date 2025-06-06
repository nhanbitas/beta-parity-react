import React from 'react';
import classNames from 'classnames';
import './index.css';

export interface ContainedLabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  isActive?: boolean;
}

export const ContainedLabel = React.forwardRef<HTMLLabelElement, ContainedLabelProps>(
  ({ isActive, children, className, ...props }, ref) => (
    <label className={classNames('floating-label', className, { active: isActive })} {...props} ref={ref}>
      {children}
    </label>
  )
);

ContainedLabel.displayName = 'ContainedLabel';

export interface FloatingLabelProps extends React.HTMLAttributes<HTMLElement> {
  label: string | React.ReactNode;
  children?: React.ReactNode;
  className?: string;
  wrapperClassname?: string;
}

export const FloatingLabel = React.forwardRef<HTMLDivElement, FloatingLabelProps>(
  ({ label, children, className, wrapperClassname, ...props }, ref) => {
    const [isActive, setIsActive] = React.useState(false);
    const [inputValue, setInputValue] = React.useState('');

    const handleFocus = (e: any) => {
      setIsActive(true);
    };

    const handleBlur = (e: any) => {
      e.target.value ? setIsActive(true) : setIsActive(false);
    };

    const handleValueChange = (e: any) => {
      setInputValue(e.target.value);
    };

    return (
      <div className={classNames('floating-label-wrapper', wrapperClassname)} {...props} ref={ref}>
        <ContainedLabel isActive={isActive || !!inputValue} className={className}>
          {label}
        </ContainedLabel>
        {React.Children.map(children, (child) =>
          React.isValidElement(child)
            ? React.cloneElement(child as React.ReactElement<any>, {
                onFocus: (e: any) => {
                  handleFocus(e);
                  child.props.onFocus && child.props.onFocus(e);
                },
                onBlur: (e: any) => {
                  handleBlur(e);
                  child.props.onFocus && child.props.onBlur(e);
                },
                onChange: (e: any) => {
                  handleValueChange(e);
                  child.props.onFocus && child.props.onChange(e);
                }
              })
            : child
        )}
      </div>
    );
  }
);

FloatingLabel.displayName = 'FloatingLabel';
