'use client';

import * as React from 'react';
import './index.css';
import { Input, InputProps } from '../Input';
import { Eye } from 'lucide-react';
import useCombinedRefs from '../hooks/useCombinedRefs';

export interface PasswordInputProps {
  type?: 'password' | 'text';
}

const PasswordInput = React.forwardRef<
  React.ElementRef<typeof Input>,
  React.ComponentPropsWithoutRef<typeof Input> & PasswordInputProps
>(({ type = 'password', ...props }, ref) => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const combinedRef = useCombinedRefs(inputRef, ref);
  const [currentType, setCurrentType] = React.useState('password');

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setCurrentType((prevType) => (prevType === 'password' ? 'text' : 'password'));
    combinedRef.current && combinedRef.current.focus();
  };

  const EyeButton = () => {
    return (
      <button
        type='button'
        className={`eye-btn ${currentType !== 'password' ? 'showed' : ''}`}
        onMouseDown={handleClick}
      >
        <Eye />
      </button>
    );
  };

  return <Input ref={combinedRef} type={currentType} {...props} ActionBtn={<EyeButton />} />;
});

PasswordInput.displayName = 'PasswordInput';

export { PasswordInput };
