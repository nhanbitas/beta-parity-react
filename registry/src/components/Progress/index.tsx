import * as React from 'react';
import './variables.css';
import './index.css';
import classNames from 'classnames';

export interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  kind?: 'bar' | 'circle';
  value?: number;
  title?: string;
  helperText?: string;
  color?: 'neutral' | 'accent';
  state?: 'active' | 'success' | 'error';
}

export const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  ({ className, kind = 'bar', value = 0, title, helperText, color = 'neutral', state = 'active', ...props }, ref) => {
    const clampedValue = Math.min(100, Math.max(1, value ?? 1));
    const isCircle = kind === 'circle';

    const renderProgress = () => {
      if (isCircle) {
        return (
          <svg width={100} height={100} viewBox='0 0 100 100'>
            <circle
              className='progress-track'
              cx={50}
              cy={50}
              r={40}
              //  stroke='#e0e0e0'
              strokeWidth={8}
              fill='none'
            />
            <circle
              className='progress-thumb'
              cx={50}
              cy={50}
              r={40}
              // stroke={thumbColor}
              strokeWidth={9}
              fill='none'
              strokeDasharray='251.2'
              strokeDashoffset={251.2 - (251.2 * clampedValue) / 100}
              strokeLinecap='round'
              transform='rotate(-90 50 50)'
            />
            <text className='progress-title' x={50} y={55} fontSize={14} textAnchor='middle'>
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

    return (
      <div ref={ref} {...props} className={classNames('progress', kind, color, state, className)}>
        {!isCircle && (
          <div className='progress-title-wrapper'>
            <span className='progress-title'>{title}</span>
            <span className='progress-numeral'>{value}%</span>
          </div>
        )}

        {renderProgress()}

        <span className='progress-helper-text'>{helperText}</span>
      </div>
    );
  }
);

Progress.displayName = 'Progress';
