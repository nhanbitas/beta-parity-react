'use client';

import * as React from 'react';
import './index.css';
import { Input } from '../Input';
import { Eye } from 'lucide-react';
import useCombinedRefs from '../hooks/useCombinedRefs';
import { Button } from '../Button';

export interface PasswordInputProps {
  type?: 'password' | 'text';
  color?: 'accent' | 'neutral';
  defaultHidden?: boolean;
}

const PasswordInput = React.forwardRef<
  React.ElementRef<typeof Input>,
  React.ComponentPropsWithoutRef<typeof Input> & PasswordInputProps
>(({ type = 'password', color = 'neutral', defaultHidden = true, disabled = false, ...props }, ref) => {
  const [currentType, setCurrentType] = React.useState(defaultHidden ? 'password' : 'text');

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setCurrentType((prevType) => (prevType === 'password' ? 'text' : 'password'));
  };

  const EyeButton = () => {
    const isHiden = currentType === 'password';
    const TagName = (isHiden ? 'button' : Button) as React.ElementType;

    return (
      <TagName
        disabled={disabled}
        {...(isHiden ? { type: 'button' } : { color: color, kind: 'solid', size: 'sm' })}
        className={`eye-btn input-icon ${!isHiden ? 'showed' : ''}`}
        onClick={handleClick}
      >
        <Eye />
      </TagName>
    );
  };

  return <Input ref={ref} type={currentType} disabled={disabled} {...props} ActionBtn={<EyeButton />} />;
});

PasswordInput.displayName = 'PasswordInput';

export { PasswordInput };
