import React from 'react';
import classNames from 'classnames';
import { X } from 'lucide-react';

import './index.css';
import './variables.css';

import { BaseProps } from '../Base';
import useKeyboard from '../hooks/useKeyboard';

// =========================
// Tag
// =========================
// Declare and export Tag type and Tag component

const colorMap: Record<'neutral' | 'accent', string> = {
  neutral: 'neutral',
  accent: 'accent'
} as const;

const sizeMap: Record<'sm' | 'md' | 'lg', string> = {
  sm: 'small',
  md: 'medium',
  lg: 'large'
};

const kindMap: Record<'glass' | 'outlined', string> = {
  glass: 'glass',
  outlined: 'outlined'
};

/**
 * Props for the Tag component.
 *
 * Extends properties from the `span` element.
 */
export interface TagProps extends BaseProps {
  /**
   * The label of the Tag, displaying text.
   *
   * @memberof TagProps
   */
  label: string;

  /**
   * Optional icon to display in the Tag, image is supported
   *
   * @memberof TagProps
   */
  icon?: React.ReactNode;

  /**
   * The size of the Tag, can be one of the keys from the sizeMap.
   *
   * @default 'md'
   * @memberof TagProps
   */
  size?: keyof typeof sizeMap;

  /**
   * The kind of the Tag, can be one of the keys from the kindMap.
   *
   * @default 'outlined'
   * @memberof TagProps
   */
  kind?: keyof typeof kindMap;

  /**
   * The color of the Tag, can be one of the keys from the colorMap.
   *
   * @default 'neutral'
   * @memberof TagProps
   */
  color?: keyof typeof colorMap;

  /**
   * The value of the Tag, can be a string or number, it is usable in checkbox, radio, dropdown, input type
   *
   * @memberof TagProps
   */
  value?: string | number;

  /**
   * Whether the Tag is disabled.
   *
   * @memberof TagProps
   */
  disabled?: boolean;

  /**
   * Callback when the remove button is clicked. it is avaiable for button Tag
   *
   * @param {string | number} value - The value of the Tag to be removed.
   * @memberof TagProps
   */
  onRemove?: (value: string | number) => void;
}

/**
 * **Parity Tag**.
 *
 *  @see {@link https://beta-parity-react.vercel.app/tag Parity Tag}
 */
export const Tag = React.forwardRef<HTMLElement, TagProps & Omit<React.AllHTMLAttributes<HTMLElement>, keyof TagProps>>(
  (props, ref: any) => {
    const {
      className,
      children,
      label,
      icon,
      kind = 'outlined',
      size = 'md',
      color = 'neutral',
      value,
      disabled = false,
      onRemove,
      onClick,
      ...rest
    } = props;

    // Inite states
    const kindTag = kindMap[kind as keyof typeof kindMap] || 'outlined';
    const sizeTag = sizeMap[size as keyof typeof sizeMap] || 'medium';
    const colorTag = colorMap[color as keyof typeof colorMap] || 'neutral';

    // Define click handlers
    const handleButtonClick = (e: React.MouseEvent<HTMLElement> | React.KeyboardEvent) => {
      onClick && onClick(e as React.MouseEvent<HTMLElement>);
    };

    const clickHandlers = {
      button: handleButtonClick,
      default: handleButtonClick
    };

    // Define keyup handlers - "enter" key
    const ButtonKeyupHandler = useKeyboard('Enter', handleButtonClick);

    const keyupHandlers = {
      button: ButtonKeyupHandler,
      default: ButtonKeyupHandler
    };

    // Define content to display
    const InnerTagContent = (
      <>
        {icon ? <span className='tag-icon'>{icon}</span> : null}
        <span className='tag-label'>{label || children}</span>
      </>
    );

    // Define events for Tag
    const eventHandlers = {
      onClick: (e: React.MouseEvent<HTMLElement>) => {
        if (disabled) return;
        const handler = clickHandlers.default;
        handler(e);
      },
      onKeyUp: (e: React.KeyboardEvent) => {
        if (disabled) return;
        const handler = keyupHandlers.default;
        handler(e);
      }
    };

    // Define accessibilities for Tag
    const accessibilityProps = {
      'aria-disabled': disabled,
      'aria-label': label,
      role: 'tag'
    };

    const inputClassname = classNames('tag', className, kindTag, sizeTag, { [colorTag]: true });
    const removeHandler = (e: React.MouseEvent<HTMLElement> | React.KeyboardEvent) => {
      e.stopPropagation();
      if ('key' in e) {
        const keyboardEvent = e as React.KeyboardEvent;
        if (keyboardEvent.key === 'Enter') {
          onRemove && onRemove(value as string);
        }
      } else {
        onRemove && onRemove(value as string);
      }
    };
    return (
      <span className={inputClassname} ref={ref} {...eventHandlers} {...accessibilityProps} {...rest}>
        {InnerTagContent}
        <button type='button' disabled={disabled} className='tag-icon tag-close-btn' onClick={removeHandler}>
          <X />
        </button>
      </span>
    );
  }
);

Tag.displayName = 'Tag';
