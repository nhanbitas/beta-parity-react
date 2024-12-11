import React from 'react';
import classNames from 'classnames';
import './variables.css';
import './index.css';

export const sizeMap = {
  sm: 'small',
  md: 'medium',
  lg: 'large',
  xl: 'extra-large'
} as const;

export interface SpinnerProps extends React.HTMLAttributes<HTMLSpanElement> {
  /**
   * The variant/style of the spinner.
   *
   * - `circular`: A circular spinner that rotates.
   * - `dotted`: A spinner with dots indicating progress.
   * - `sunburst`: A spinner resembling a sunburst pattern.
   *
   * @default 'circular'
   */
  variant?: 'circular' | 'dotted' | 'sunburst';

  /**
   * The color theme of the spinner.
   *
   * - `neutral`: A neutral color, typically gray or subdued.
   * - `accent`: An accent color, often used for highlighting.
   *
   * @default 'neutral'
   */
  color?: 'neutral' | 'accent';

  /**
   * The size of the spinner.
   *
   * - `sm`: Small size, suitable for compact areas.
   * - `md`: Medium size, the default spinner size.
   * - `lg`: Large size, suitable for prominent loading indicators.
   * - `xl`: Extra-large size, suitable for larger loading indicators.
   *
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const Spinner = React.forwardRef<HTMLSpanElement, SpinnerProps>(
  ({ className, variant = 'circular', color = 'neutral', size = 'md', ...props }, ref) => {
    return (
      <span className={classNames('spinner', variant, className, color, size && sizeMap[size])} ref={ref} {...props}>
        {generateSpinner(variant, color)}
      </span>
    );
  }
);

Spinner.displayName = 'Spinner';

const colorTokens = {
  neutral: {
    interactive: 'var(--par-color-stroke-spinner-interactive-neutral)',
    inactive: 'var(--par-color-stroke-spinner-inactive)'
  },
  accent: {
    interactive: 'var(--par-color-stroke-spinner-interactive-accent)',
    inactive: 'var(--par-color-stroke-spinner-inactive)'
  }
};

const generateSpinner = (variant: 'circular' | 'dotted' | 'sunburst', color: 'neutral' | 'accent') => {
  const theme = colorTokens[color];

  if (variant === 'circular') {
    return (
      <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 36 36' fill='none'>
        <path
          d='M34 18C34 20.1012 33.5861 22.1817 32.7821 24.1229C31.978 26.0641 30.7994 27.828 29.3137 29.3137C27.828 30.7994 26.0641 31.978 24.1229 32.7821C22.1817 33.5861 20.1011 34 18 34C15.8988 34 13.8183 33.5861 11.8771 32.7821C9.93585 31.978 8.17203 30.7994 6.68629 29.3137C5.20055 27.828 4.022 26.0641 3.21793 24.1229C2.41385 22.1817 2 20.1011 2 18C2 15.8988 2.41385 13.8183 3.21793 11.8771C4.022 9.93586 5.20055 8.17203 6.68629 6.68629C8.17203 5.20055 9.93586 4.022 11.8771 3.21793C13.8183 2.41385 15.8989 2 18 2C20.1012 2 22.1817 2.41385 24.1229 3.21793C26.0641 4.02201 27.828 5.20056 29.3137 6.68629C30.7994 8.17203 31.978 9.93586 32.7821 11.8771C33.5861 13.8183 34 15.8989 34 18L34 18Z'
          stroke={theme.inactive}
          strokeWidth='4'
        />
        <path
          d='M34 18C34 20.525 33.4024 23.0141 32.2561 25.2638C31.1098 27.5136 29.4473 29.4601 27.4046 30.9443'
          stroke={theme.interactive}
          strokeWidth='4'
          strokeLinecap='round'
        />
      </svg>
    );
  }

  if (variant === 'dotted') {
    return (
      <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' fill='none'>
        <circle
          cx={16}
          cy='2.66667'
          r='2.66667'
          transform='rotate(180 16 2.66667)'
          fill={theme.inactive}
          style={{ animationDelay: '0s' }}
        />
        <circle
          cx='6.5719'
          cy='6.57194'
          r='2.66667'
          transform='rotate(-45 6.5719 6.57194)'
          fill={theme.inactive}
          style={{ animationDelay: '0.875s' }}
        />
        <circle
          cx='2.66671'
          cy={16}
          r='2.66667'
          transform='rotate(180 2.66671 16)'
          fill={theme.inactive}
          style={{ animationDelay: '0.75s' }}
        />
        <circle
          cx='6.5719'
          cy='25.4281'
          r='2.66667'
          transform='rotate(-135 6.5719 25.4281)'
          fill={theme.inactive}
          style={{ animationDelay: '0.625s' }}
        />
        <circle
          cx={16}
          cy='29.3333'
          r='2.66667'
          transform='rotate(180 16 29.3333)'
          fill={theme.inactive}
          style={{ animationDelay: '0.5s' }}
        />
        <circle
          cx='25.4281'
          cy='25.4281'
          r='2.66667'
          transform='rotate(-45 25.4281 25.4281)'
          fill={theme.inactive}
          style={{ animationDelay: '0.375s' }}
        />
        <circle
          cx='29.3333'
          cy={16}
          r='2.66667'
          transform='rotate(180 29.3333 16)'
          fill={theme.inactive}
          style={{ animationDelay: '0.25s' }}
        />
        <circle
          cx='25.4281'
          cy='6.5719'
          r='2.66667'
          transform='rotate(-135 25.4281 6.5719)'
          fill={theme.inactive}
          style={{ animationDelay: '0.125s' }}
        />
      </svg>
    );
  }

  if (variant === 'sunburst') {
    return (
      <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' fill='none'>
        <rect x='14.6667' width='2.6' height={8} rx='1.3' fill={theme.inactive} style={{ animationDelay: '0s' }} />
        <rect
          x='3.74341'
          y='5.62907'
          width='2.6'
          height={8}
          rx='1.3'
          transform='rotate(-45 3.74341 5.62907)'
          fill={theme.inactive}
          style={{ animationDelay: '0.875s' }}
        />
        <rect
          y='17.3333'
          width='2.6'
          height={8}
          rx='1.3'
          transform='rotate(-90 0 17.3333)'
          fill={theme.inactive}
          style={{ animationDelay: '0.75s' }}
        />
        <rect
          x='5.62915'
          y='28.2565'
          width='2.6'
          height={8}
          rx='1.3'
          transform='rotate(-135 5.62915 28.2565)'
          fill={theme.inactive}
          style={{ animationDelay: '0.625s' }}
        />
        <rect
          x='14.6667'
          y={24}
          width='2.6'
          height={8}
          rx='1.3'
          fill={theme.inactive}
          style={{ animationDelay: '0.5s' }}
        />
        <rect
          x='20.7141'
          y='22.5997'
          width='2.6'
          height={8}
          rx='1.3'
          transform='rotate(-45 20.7141 22.5997)'
          fill={theme.inactive}
          style={{ animationDelay: '0.375s' }}
        />
        <rect
          x={24}
          y='17.3333'
          width='2.6'
          height={8}
          rx='1.3'
          transform='rotate(-90 24 17.3333)'
          fill={theme.inactive}
          style={{ animationDelay: '0.25s' }}
        />
        <rect
          x='22.5996'
          y='11.2859'
          width='2.6'
          height={8}
          rx='1.3'
          transform='rotate(-135 22.5996 11.2859)'
          fill={theme.inactive}
          style={{ animationDelay: '0.125s' }}
        />
      </svg>
    );
  }
};

export { Spinner };
