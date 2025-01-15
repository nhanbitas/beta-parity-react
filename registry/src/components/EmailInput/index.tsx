import * as React from 'react';
import './index.css';
import { Input, UnitSelector } from '../BaseInput';

// =========================
// EmailInput
// =========================
// Declare and export EmailInput type and EmailInput component

/**
 * Props for the EmailInput component.
 *
 * Extends properties from the `Input` component.
 */
export interface EmailInputProps extends React.ComponentPropsWithoutRef<typeof Input> {
  /**
   * Specifies the domain or list of domains to use as suggestions for the email input.
   * - If a string is provided, it is treated as a single domain.
   * - If an array of strings is provided, the component suggests multiple domains.
   *
   * Example:
   * ```tsx
   * domain="example.com"
   * domain={["example.com", "test.com"]}
   * ```
   * @memberof EmailInputProps
   *
   */
  domain?: string | string[];

  /**
   * Callback function triggered when the user selects or changes the domain.
   * Provides the updated domain as a string.
   *
   * Example:
   * ```tsx
   * onDomainChange={(domain) => console.log('Selected domain:', domain)}
   * ```
   * @memberof EmailInputProps
   * @param {string} domain The updated domain value.
   */
  onDomainChange?: (domain: string) => void;

  /**
   * The currently selected domain value.
   * This can be used for controlled components where the domain value
   * is managed outside the component.
   *
   * Example:
   * ```tsx
   * <EmailInput domainValue="example.com" />
   * ```
   * @memberof EmailInputProps
   *
   */
  domainValue?: string;
}

/**
 * **Parity EmailInput**.
 *
 *  @see {@link http://localhost:3005/email-input Parity EmailInput}
 */
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
