import * as React from 'react';
import classNames from 'classnames';

import './variables.css';
import './index.css';

// =========================
// Progress
// =========================
// Declare and export Progress type and Progress component

const sizeMap: Record<'sm' | 'md', string> = {
  sm: 'small',
  md: 'medium'
} as const;

const sizeHeightMap: Record<'sm' | 'md', number> = {
  sm: 64, //4rem
  md: 120 //7.5rem
} as const;

const sizeStrokeWidthMap: Record<'sm' | 'md', number> = {
  sm: 6,
  md: 12
} as const;

/**
 * Props for the Progress component.
 *
 * Extends properties from the `div` element.
 */
export interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * The type of progress indicator.
   *
   * @default 'bar'
   * @memberof ProgressProps
   */
  kind?: 'bar' | 'circle';

  /**
   * The current progress value.
   *
   * @default 0
   * @memberof ProgressProps
   */
  value?: number;

  /**
   * The title displayed above the progress indicator.
   *
   * @memberof ProgressProps
   */
  title?: string;

  /**
   * Additional helper text displayed below the progress indicator.
   *
   * @memberof ProgressProps
   */
  helperText?: string;

  /**
   * The color theme of the progress indicator with active state.
   *
   * @default 'neutral'
   * @memberof ProgressProps
   */
  color?: 'neutral' | 'accent';

  /**
   * The current state of the progress.
   *
   * @default 'active'
   * @memberof ProgressProps
   */
  state?: 'active' | 'success' | 'error';

  /**
   * The size of the progress indicator with circle kind.
   *
   * @default 'sm'
   * @memberof ProgressProps
   */
  size?: 'sm' | 'md';

  /**
   * Whether to display the progress value as a numeral.
   *
   * @default false
   * @memberof ProgressProps
   */
  numeral?: boolean;
}

/**
 * **Parity Progress**.
 *
 *  @see {@link http://localhost:3005/progress Parity Progress}
 */
export const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  (
    {
      className,
      title,
      helperText,
      kind = 'bar',
      value = 0,
      color = 'neutral',
      state = 'active',
      size = 'sm',
      numeral = false,
      ...props
    },
    ref
  ) => {
    const clampedValue = Math.min(100, Math.max(1, value ?? 1));
    const isCircle = kind === 'circle';
    const isActive = state === 'active';
    const stateIcon = state === 'success' ? <ProgressIcon kind='affirmative' /> : <ProgressIcon kind='adverse' />;
    const isHasIcon = !isCircle && !isActive && numeral;

    const renderProgress = () => {
      if (isCircle) {
        const r = sizeHeightMap[size] / 2;
        const strokeWidth = sizeStrokeWidthMap[size];
        const actualR = r - strokeWidth / 2;
        const circumference = 2 * Math.PI * actualR;
        const dashOffset = circumference - (circumference * clampedValue) / 100;
        return (
          <svg
            width={sizeHeightMap[size]}
            height={sizeHeightMap[size]}
            viewBox={`0 0 ${sizeHeightMap[size]} ${sizeHeightMap[size]}`}
          >
            <circle className='progress-track' cx={r} cy={r} r={actualR} strokeWidth={strokeWidth} fill='none' />
            <circle
              className='progress-thumb'
              cx={r}
              cy={r}
              r={actualR}
              strokeWidth={strokeWidth}
              fill='none'
              strokeDasharray={circumference}
              strokeDashoffset={dashOffset}
              strokeLinecap='round'
              transform={`rotate(-90 ${r} ${r})`}
            />
            <text className='progress-title' textAnchor='middle' dominantBaseline='middle' x={r} y={r}>
              {`${clampedValue}%`}
            </text>
          </svg>
        );
      }

      return (
        <div className='progress-track'>
          <div className='progress-thumb' style={{ width: `${clampedValue}%` }}></div>
        </div>
      );
    };

    const accessibilityProps = {
      role: 'progressbar',
      'aria-valuemin': 0,
      'aria-valuemax': 100,
      'aria-valuenow': clampedValue
    };

    return (
      <div
        ref={ref}
        className={classNames('progress', kind, color, state, className, {
          [sizeMap[size]]: isCircle
        })}
        {...accessibilityProps}
        {...props}
      >
        {!isCircle && (
          <div className='progress-title-wrapper'>
            <span className='progress-title'>{title}</span>
            <span className='progress-numeral'>
              {isHasIcon && stateIcon} {numeral ? `${value}%` : ''}
            </span>
          </div>
        )}

        {renderProgress()}

        <span className='progress-helper-text'>{helperText}</span>
      </div>
    );
  }
);

Progress.displayName = 'Progress';

// =========================
// ProgressIcon
// =========================

/**
 * Props for the ProgressIcon component.
 *
 * Extends properties from the `span` element.
 */
export interface ProgressIconProps extends React.HTMLAttributes<HTMLSpanElement> {
  /**
   * The kind of progress icon to display.
   * - `affirmative`: Represents a positive or successful state.
   * - `adverse`: Represents a negative or error state.
   *
   * @default "affirmative"
   */
  kind?: 'affirmative' | 'adverse';
}

/**
 * **Parity Progress Icon**
 *
 *  @see {@link http://localhost:3005/progress Parity Progress}
 */

const ProgressIcon = React.forwardRef<HTMLSpanElement, ProgressIconProps>(({ kind = 'affirmative', ...props }, ref) => {
  switch (kind) {
    case 'affirmative':
      return (
        <span className='progress-icon' ref={ref} {...props}>
          <svg xmlns='http://www.w3.org/2000/svg' width={20} height={20} viewBox='0 0 20 20' fill='none'>
            <path
              d='M10 18.3333C14.5833 18.3333 18.3333 14.5833 18.3333 9.99996C18.3333 5.41663 14.5833 1.66663 10 1.66663C5.41667 1.66663 1.66667 5.41663 1.66667 9.99996C1.66667 14.5833 5.41667 18.3333 10 18.3333Z'
              fill='var(--par-color-text-helper-affirmative)'
              stroke='var(--par-color-text-helper-affirmative)'
              strokeWidth='1.33'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
            <path
              d='M6.45833 10.0001L8.81667 12.3584L13.5417 7.64172'
              stroke='var(--par-color-text-primary-inverse)'
              strokeWidth='1.5'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </svg>
        </span>
      );
    case 'adverse':
      return (
        <span className='progress-icon' ref={ref} {...props}>
          <svg xmlns='http://www.w3.org/2000/svg' width={20} height={20} viewBox='0 0 20 20' fill='none'>
            <path
              d='M9.93333 18.3334C14.5167 18.3334 18.2667 14.5834 18.2667 10.0001C18.2667 5.41675 14.5167 1.66675 9.93333 1.66675C5.35 1.66675 1.6 5.41675 1.6 10.0001C1.6 14.5834 5.35 18.3334 9.93333 18.3334Z'
              fill='var(--par-color-text-helper-adverse)'
              stroke='var(--par-color-text-helper-adverse)'
              strokeWidth='1.33'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
            <path
              d='M6.6 10H13.2667'
              stroke='var(--par-color-text-primary-inverse)'
              strokeWidth='1.5'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </svg>
        </span>
      );
    default:
      return null;
  }
});

ProgressIcon.displayName = 'ProgressIcon';
