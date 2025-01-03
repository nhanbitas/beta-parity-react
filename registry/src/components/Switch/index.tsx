import React from 'react';
import './index.css';
import './variables.css';
import classNames from 'classnames';
import { Check, Minus } from 'lucide-react';
import useCombinedRefs from '../hooks/useCombinedRefs';

const sizeMap = {
  sm: 'small',
  md: 'medium',
  lg: 'large'
} as const;

const iconSizeMap = {
  sm: 16,
  md: 20,
  lg: 24
} as const;

// TODO: Write docs for types, add container for icon when scale

// =========================
// Switch
// =========================
// Declare and export Switch type and Switch component

export interface SwitchProps extends React.ComponentPropsWithoutRef<'button'> {
  active?: boolean;
  defaultActive?: boolean;
  switchSize?: keyof typeof sizeMap;
  disabled?: boolean;
  icon?: boolean;
  onToggle?: (active: boolean) => void;
}

export const Switch = React.forwardRef<HTMLButtonElement, SwitchProps>(
  ({ defaultActive, active, icon = false, switchSize = 'md', disabled, onToggle, onClick, ...props }, ref) => {
    const switcherRef = React.useRef<HTMLButtonElement | null>(null);
    const combinedRef = useCombinedRefs(ref, switcherRef);
    const [isActive, setIsActive] = React.useState(defaultActive || false);

    const handleChange = (e: React.MouseEvent) => {
      active === undefined && setIsActive(!isActive);
      onToggle?.(!isActive);
      onClick?.(e as unknown as React.MouseEvent<HTMLButtonElement>);
    };

    const accessibilityProps = {
      tabIndex: disabled ? -1 : 0,
      role: 'switch',
      'aria-checked': isActive,
      'aria-disabled': disabled
    };

    const ToggleIcon = isActive
      ? icon && <Check className='switch-icon' size={iconSizeMap[switchSize]} />
      : icon && <Minus className='switch-icon' size={iconSizeMap[switchSize]} />;

    React.useEffect(() => {
      setIsActive(!!active);
    }, [active]);

    // ========================= Support Swipe For Mobile ========================= //
    React.useEffect(() => {
      if (switcherRef && switcherRef.current) {
        const swipeArea = switcherRef.current;

        let touchStartX = 0;
        let touchEndX = 0;

        const onTouchStart = (event: TouchEvent) => {
          touchStartX = event.changedTouches[0].screenX;
        };

        const onTouchEnd = (event: TouchEvent) => {
          touchEndX = event.changedTouches[0].screenX;
          handleSwipe();
        };

        const handleSwipe = () => {
          const swipeThreshold = 16; // 1/2 of medium size
          if (touchEndX < touchStartX - swipeThreshold) {
            active === undefined && setIsActive(false);
            onToggle?.(false);
          } else if (touchEndX > touchStartX + swipeThreshold) {
            active === undefined && setIsActive(true);
            onToggle?.(true);
          }
        };

        swipeArea.addEventListener('touchstart', onTouchStart);
        swipeArea.addEventListener('touchend', onTouchEnd);

        return () => {
          swipeArea.removeEventListener('touchstart', onTouchStart);
          swipeArea.removeEventListener('touchend', onTouchEnd);
        };
      }
    }, [switcherRef, switcherRef.current, setIsActive, onToggle]);

    return (
      <button
        ref={combinedRef}
        onClick={handleChange}
        className={classNames('switch', sizeMap[switchSize as keyof typeof sizeMap])}
        {...props}
        {...accessibilityProps}
      >
        <span className='switch-slider'>{ToggleIcon}</span>
      </button>
    );
  }
);

Switch.displayName = 'Switch';
