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
  label?: string | React.ReactNode;
  children?: React.ReactNode;
  className?: string;
  wrapperClassname?: string;
  for: string;
}

const FloatingLabel = React.forwardRef<HTMLDivElement, FloatingLabelProps>(
  ({ label, for: forId, children, className, wrapperClassname, ...props }, ref) => {
    const [isActive, setIsActive] = React.useState(false);

    React.useEffect(() => {
      const inputElement = document.getElementById(forId) as HTMLInputElement | null;
      if (inputElement) {
        const handleInputFocus = () => {
          setIsActive(true);
        };
        const handleInputBlur = () => {
          setIsActive(Boolean(inputElement?.value));
        };
        inputElement.addEventListener('focus', handleInputFocus);
        inputElement.addEventListener('blur', handleInputBlur);

        return () => {
          inputElement.removeEventListener('focus', handleInputFocus);
          inputElement.removeEventListener('blur', handleInputBlur);
        };
      }
    }, [forId]);

    return (
      <div className={classNames('floating-label-wrapper', wrapperClassname)} {...props} ref={ref}>
        <ContainedLabel isActive={isActive} className={className}>
          {label}
        </ContainedLabel>
        {children}
      </div>
    );
  }
);

FloatingLabel.displayName = 'FloatingLabel';

export { ContainedLabel, FloatingLabel };
