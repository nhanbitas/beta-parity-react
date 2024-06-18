'use client';

import * as React from 'react';
import classNames from 'classnames';
import './index.css';
// import { Input } from '@components/Input';

export interface ContainedLabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  isActive?: boolean;
}

const ContainedLabel = React.forwardRef<HTMLLabelElement, ContainedLabelProps>(
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

const FloatingLabel = React.forwardRef<HTMLDivElement, FloatingLabelProps>(
  ({ label, children, className, wrapperClassname, ...props }, ref) => {
    const [isActive, setIsActive] = React.useState(false);

    const handleFocus = (e: any) => {
      setIsActive(true);
    };

    const handleBlur = (e: any) => {
      e.target.value ? setIsActive(true) : setIsActive(e.target.value);
    };

    return (
      <div className={classNames('floating-label-wrapper', wrapperClassname)} {...props} ref={ref}>
        <ContainedLabel isActive={isActive} className={className}>
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
                }
              })
            : child
        )}
      </div>
    );
  }
);

FloatingLabel.displayName = 'FloatingLabel';

export { ContainedLabel, FloatingLabel };
