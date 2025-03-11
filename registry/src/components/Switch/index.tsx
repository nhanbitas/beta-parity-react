import React from 'react';
import './index.css';
import './variables.css';
import classNames from 'classnames';
import { Check, Minus } from 'lucide-react';
import useCombinedRefs from '../hooks/useCombinedRefs';

// =========================
// Switch
// =========================
// Declare and export Switch type and Switch component

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

/**
 * Props for the Switch component.
 *
 * Extends properties from the `button` element.
 */
export interface SwitchProps extends React.ComponentPropsWithoutRef<'button'> {
  /**
   * The state of the switch (controlled).
   *
   * @default undefined
   * @memberof SwitchProps
   */
  active?: boolean;

  /**
   * The default state of the switch (initially).
   *
   * @default false
   * @memberof SwitchProps
   */
  defaultActive?: boolean;

  /**
   * The size of the switch.
   *
   * @default 'md'
   * @memberof SwitchProps
   */
  switchSize?: keyof typeof sizeMap;

  /**
   * The disabled state of the switch.
   *
   * @default false
   * @memberof SwitchProps
   */
  disabled?: boolean;

  /**
   * The icon state of the switch (on/off the icon).
   *
   * @default false
   * @memberof SwitchProps
   */
  icon?: boolean;

  /**
   * The toggle handler of the switch.
   *
   * @param active The new state of the switch.
   * @memberof SwitchProps
   */
  onToggle?: (active: boolean) => void;
}

/**
 * **Parity Switch**.
 *
 *  @see {@link http://localhost:3005/switch Parity Switch}
 */
export const Switch = React.forwardRef<HTMLButtonElement, SwitchProps>(
  ({ defaultActive = false, active, icon = false, switchSize = 'md', disabled, onToggle, onClick, ...props }, ref) => {
    const switcherRef = React.useRef<HTMLButtonElement | null>(null);
    const combinedRef = useCombinedRefs(ref, switcherRef);
    const [isActive, setIsActive] = React.useState(defaultActive);

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
      if (active !== undefined) {
        setIsActive(active);
      }
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
        {...props}
        {...accessibilityProps}
        ref={combinedRef}
        onClick={handleChange}
        className={classNames('switch', sizeMap[switchSize as keyof typeof sizeMap])}
        disabled={disabled}
      >
        <span className='switch-target-wrapper'>
          <span className='switch-target'>{ToggleIcon}</span>
        </span>
      </button>
    );
  }
);

Switch.displayName = 'Switch';
