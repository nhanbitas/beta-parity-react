import React from 'react';
import classNames from 'classnames';

import './index.css';
import './variables.css';

import { Tooltip } from '../Tooltip';

// =========================
// Slider
// =========================
// Declare and export Slider type and Slider component

/**
 * Represents a mark on the slider.
 */
interface Mark {
  /**
   * The value of the mark.
   */
  value: number;

  /**
   * The label for the mark (optional).
   */
  label?: string;
}

/**
 * Props for the Slider component.
 *
 * Extends properties from the `div` element.
 */
interface SliderProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'defaultValue'> {
  /**
   * The mode of the slider, either 'single' or 'range'.
   *
   * @default 'single'
   */
  mode?: 'single' | 'range';

  /**
   * The minimum value of the slider.
   *
   * @default 0
   */
  min?: number;

  /**
   * The maximum value of the slider.
   *
   * @default 100
   */
  max?: number;

  /**
   * The step value for the slider.
   *
   * @default 1
   */
  step?: number;

  /**
   * The default value of the slider.
   *
   * @default 0 (single mode) or [0, 50] (range mode)
   */
  defaultValue?: number | [number, number];

  /**
   * The marks to display on the slider.
   */
  marks?: Mark[];

  /**
   * The color of the slider.
   *
   * @default 'neutral'
   */
  color?: 'neutral' | 'accent';

  /**
   * The orientation of the slider.
   *
   * @default 'horizontal'
   */
  orientation?: 'horizontal' | 'vertical';

  /**
   * The type of indicator to display.
   *
   * @default 'normal'
   */
  indicator?: 'normal' | 'tooltip';

  /**
   * The side of the indicator.
   *
   * @default 'normal'
   */
  indicatorSide?: 'normal' | 'reverse';

  /**
   * The disabled state of the slider.
   *
   * @default false
   */
  disabled?: boolean;

  /**
   * Callback function triggered when the slider value changes.
   *
   * @param value The new value of the slider.
   */
  onValueChange?: (value: number | [number, number]) => void;
}

/**
 * **Parity Slider**.
 *
 * A customizable slider component supporting single and range modes.
 *
 * @see {@link https://beta-parity-react.vercel.app/slider Parity Slider}
 */
export const Slider = React.forwardRef<HTMLDivElement, SliderProps>(
  (
    {
      className,
      mode = 'single',
      min = 0,
      max = 100,
      step = 1,
      defaultValue = mode === 'range' ? [0, 50] : 0,
      marks = [],
      color = 'neutral',
      orientation = 'horizontal',
      indicator = 'normal',
      indicatorSide = 'normal',
      disabled = false,
      onValueChange,
      ...rest
    },
    ref
  ) => {
    const isRange = mode === 'range';
    const isVertical = orientation === 'vertical';

    // State to manage the current value of the slider
    const [value, setValue] = React.useState(isRange ? (defaultValue as [number, number]) : (defaultValue as number));

    // Extract minimum and maximum values for range mode
    const minValue = isRange ? (value as [number, number])[0] : (value as number);
    const maxValue = isRange ? (value as [number, number])[1] : (value as number);

    /**
     * Handles changes to the minimum value in range mode or the single value in single mode.
     */
    const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (disabled) return; // Prevent changes if disabled
      const newMin = Number(e.target.value);
      if (!isRange) {
        setValue(newMin);
        onValueChange?.(newMin);
      } else if (newMin < maxValue) {
        setValue([newMin, maxValue]);
        onValueChange?.([newMin, maxValue]);
      }
    };

    /**
     * Handles changes to the maximum value in range mode.
     */
    const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (disabled) return; // Prevent changes if disabled
      const newMax = Number(e.target.value);
      if (isRange && newMax > minValue) {
        setValue([minValue, newMax]);
        onValueChange?.([minValue, newMax]);
      }
    };

    // Props to pass to child components
    const childProps = {
      isVertical,
      minValue,
      maxValue,
      min,
      max,
      step,
      handleMinChange,
      handleMaxChange,
      isRange,
      indicatorSide,
      color,
      marks,
      indicator,
      disabled
    };

    return (
      <div
        ref={ref}
        className={classNames(className, 'slider', {
          'slider-vertical': isVertical,
          'slider-range': isRange,
          'slider-disabled': disabled
        })}
        {...rest}
      >
        {/* Track */}
        <SliderTrack {...childProps} />

        {/* Input Range */}
        <RangeInputs {...childProps} />

        {/* Marks */}
        <Marks {...childProps} />
      </div>
    );
  }
);

Slider.displayName = 'Slider';

/**
 * Renders the marks on the slider.
 */
export const Marks = ({ marks, min, max, minValue, maxValue, isVertical }: Record<string, any>) => {
  /**
   * Checks if a mark is within the selected range.
   */
  const checkInRange = (value: number) => {
    const isNotRange = minValue === maxValue;
    return isNotRange ? value <= maxValue : value >= minValue && value <= maxValue;
  };

  return (
    <div className={classNames('slider-marks')}>
      {marks.map((mark: any, index: number) => (
        <div
          key={mark.value}
          className='slider-marks-item'
          style={{
            [isVertical ? 'bottom' : 'left']: `${((mark.value - min) / (max - min)) * 100}%`
          }}
        >
          {/* Dot */}
          {mark.value === min || mark.value === max ? null : (
            <div
              className={classNames('slider-dot', {
                'in-range': checkInRange(mark.value),
                'out-range': !checkInRange(mark.value)
              })}
            />
          )}

          {/* Label */}
          {mark.label && <span className='slider-label'>{mark.label}</span>}
        </div>
      ))}
    </div>
  );
};

/**
 * Renders the slider track and progress bar.
 */
export const SliderTrack = ({ isVertical, isRange, minValue, min, max, maxValue, color }: Record<string, any>) => {
  return (
    <div className='slider-track'>
      <div
        className={classNames('slider-progress', color)}
        style={{
          [isVertical ? 'bottom' : 'left']: isRange ? `${((minValue - min) / (max - min)) * 100}%` : '0%',
          [isVertical ? 'height' : 'width']: isRange
            ? `${((maxValue - minValue) / (max - min)) * 100}%`
            : `${((minValue - min) / (max - min)) * 100}%`
        }}
      />
    </div>
  );
};

/**
 * Renders the input range elements and indicators.
 */
export const RangeInputs = ({
  isVertical,
  minValue,
  maxValue,
  min,
  max,
  step,
  handleMinChange,
  handleMaxChange,
  isRange,
  indicatorSide,
  indicator,
  disabled
}: Record<string, any>) => {
  const isTooltip = indicator === 'tooltip';
  const normalPosition = isVertical ? 'left' : 'top';
  const reversePosion = isVertical ? 'right' : 'bottom';
  const position = indicatorSide === 'normal' ? normalPosition : reversePosion;

  // State to manage focus for tooltips
  const [inputFocus, setInputFocus] = React.useState({
    min: false,
    max: false
  });

  const handleFocus = (type: 'min' | 'max') => {
    setInputFocus((prev) => ({
      ...prev,
      [type]: true
    }));
  };

  const handleBlur = (type: 'min' | 'max') => {
    setInputFocus((prev) => ({
      ...prev,
      [type]: false
    }));
  };

  const generateInputProps = (type: 'min' | 'max') => ({
    type: 'range',
    min: min,
    max: max,
    step: step,
    value: type === 'min' ? minValue : maxValue,
    onChange: type === 'min' ? handleMinChange : handleMaxChange,
    onFocus: () => handleFocus(type),
    onBlur: () => handleBlur(type),
    onMouseEnter: () => handleFocus(type),
    onMouseLeave: () => handleBlur(type),
    className: 'par-input-slider',
    disabled: disabled,
    tabIndex: disabled ? -1 : 0
  });

  return (
    <React.Fragment>
      {/* Input Range - Min (or single) */}
      <input {...generateInputProps('min')} />

      {/* Input Range - Max */}
      {isRange && <input {...generateInputProps('max')} />}

      {/* Indicator */}
      {isTooltip ? (
        <>
          <Tooltip content={minValue} controlledOpen={inputFocus.min} position={position}>
            <div
              className={classNames('indicator-wrapper', indicatorSide)}
              style={{
                [isVertical ? 'bottom' : 'left']: `${((minValue - min) / (max - min)) * 100}%`
              }}
            >
              <span className='slider-thumb-indicator-text'></span>
            </div>
          </Tooltip>

          {isRange && (
            <Tooltip content={maxValue} controlledOpen={inputFocus.max} position={position}>
              <div
                className={classNames('indicator-wrapper', indicatorSide)}
                style={{
                  [isVertical ? 'bottom' : 'left']: `${((maxValue - min) / (max - min)) * 100}%`
                }}
              >
                <span className='slider-thumb-indicator-text'></span>
              </div>
            </Tooltip>
          )}
        </>
      ) : (
        <>
          <div
            className={classNames('indicator-wrapper', indicatorSide)}
            style={{
              [isVertical ? 'bottom' : 'left']: `${((minValue - min) / (max - min)) * 100}%`
            }}
          >
            <span className='slider-thumb-indicator-text'>{minValue}</span>
          </div>

          {isRange && (
            <div
              className={classNames('indicator-wrapper', indicatorSide)}
              style={{
                [isVertical ? 'bottom' : 'left']: `${((maxValue - min) / (max - min)) * 100}%`
              }}
            >
              <span className='slider-thumb-indicator-text'>{maxValue}</span>
            </div>
          )}
        </>
      )}
    </React.Fragment>
  );
};
