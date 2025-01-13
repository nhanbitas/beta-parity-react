import * as React from 'react';
import './index.css';
import { Input, UnitSelector } from '../BaseInput';

export interface EmailInputProps extends React.ComponentPropsWithoutRef<typeof Input> {
  domain?: string | string[];
  onDomainChange?: (domain: string) => void;
  domainValue?: string;
}

export const EmailInput = React.forwardRef<React.ElementRef<typeof Input>, EmailInputProps>(
  ({ type = 'email', domain, domainValue, ActionBtn, onDomainChange, ...props }, ref) => {
    const isHasDomain = domain !== undefined;
    const componentType = isHasDomain ? 'email' : 'text';

    const handleDomainChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      onDomainChange?.(e.target.value as string);
    };
    const unitElement = (
      <UnitSelector
        unit={domain}
        onUnitChange={handleDomainChange}
        unitValue={domainValue}
        disabled={props.disabled || props.readOnly}
        theme={props.theme}
      />
    );

    return <Input ref={ref} type={componentType} ActionBtn={isHasDomain ? unitElement : ActionBtn} {...props} />;
  }
);

EmailInput.displayName = 'EmailInput';
