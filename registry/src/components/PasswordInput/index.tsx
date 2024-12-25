import * as React from 'react';
import './index.css';
import { Input } from '../BaseInput';
import { Eye } from 'lucide-react';
import { Button } from '../Button';
import useDidMountEffect from '../hooks/useDidMountEffect';

export interface PasswordInputProps extends React.ComponentPropsWithoutRef<typeof Input> {
  /**
   * The color of eye icon
   */
  color?: 'accent' | 'neutral';

  /**
   * Default state of showing password
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
      const isHiden = currentType === 'password';
      const TagName = (isHiden ? 'button' : Button) as React.ElementType;
      return (
        <TagName
          ref={eyeButtonRef}
          disabled={disabled}
          {...(isHiden ? { type: 'button' } : { color: color, kind: 'solid', size: 'sm' })}
          className={`square-icon input-icon ${!isHiden ? 'showed' : ''}`}
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
