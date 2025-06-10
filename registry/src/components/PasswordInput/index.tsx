import React from 'react';
import { Eye } from 'lucide-react';

import './index.css';

import { Input } from '../BaseInput';
import { Button } from '../Button';
import useDidMountEffect from '../hooks/useDidMountEffect';

// =========================
// PasswordInput
// =========================
// Declare and export PasswordInput type and PasswordInput component

/**
 * Props for the PasswordInput component.
 *
 * Extends properties from the `Input` component.
 */
export interface PasswordInputProps extends React.ComponentPropsWithoutRef<typeof Input> {
  /**
   * The color of eye icon
   *
   * @default 'neutral'
   * @memberof PasswordInputProps
   */
  color?: 'accent' | 'neutral';

  /**
   * Default state of showing password
   *
   * @default true
   * @memberof PasswordInputProps
   */
  defaultHidden?: boolean;
}

export const PasswordInput = React.forwardRef<React.ElementRef<typeof Input>, PasswordInputProps>(
  ({ color = 'neutral', defaultHidden = true, disabled = false, ...props }, ref) => {
    const [currentType, setCurrentType] = React.useState(defaultHidden ? 'password' : 'text');

    const eyeButtonRef = React.useRef<HTMLButtonElement | null>(null);

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      setCurrentType((prevType) => (prevType === 'password' ? 'text' : 'password'));
    };

    const EyeButton = () => {
      const isHidden = currentType === 'password';
      const TagName = (isHidden ? 'button' : Button) as React.ElementType;
      return (
        <TagName
          ref={eyeButtonRef}
          disabled={disabled}
          {...(isHidden ? { type: 'button' } : { color: color, kind: 'solid', size: 'sm' })}
          className={`square-icon input-icon ${!isHidden ? 'showed' : ''}`}
          onClick={handleClick}
        >
          <Eye />
        </TagName>
      );
    };

    useDidMountEffect(() => {
      eyeButtonRef.current?.focus();
    }, [currentType]);

    return <Input ref={ref} type={currentType} disabled={disabled} {...props} ActionBtn={<EyeButton />} />;
  }
);

PasswordInput.displayName = 'PasswordInput';
