import React from 'react';

import './index.css';
import './variables.css';
import classNames from 'classnames';
import { Tooltip } from '../Tooltip';

interface Mark {
  value: number;
  label?: string;
}

interface SliderProps {
  mode?: 'single' | 'range';
  min?: number;
  max?: number;
  step?: number;
  defaultValue?: number | [number, number];
  marks?: Mark[];
  color?: string;
  orientation?: 'horizontal' | 'vertical';
  indicator?: 'normal' | 'tooltip';
  indicatorSide?: 'normal' | 'reverse';
  onValueChange?: (value: number | [number, number]) => void;
}

export function Slider({
  mode = 'single',
  min = 0,
  max = 100,
  step = 1,
  defaultValue = mode === 'range' ? [20, 80] : 50,
  marks = [],
  color,
  orientation = 'horizontal',
  indicator = 'normal',
  indicatorSide = 'normal',
  onValueChange
}: SliderProps) {
  const isRange = mode === 'range';
  const isVertical = orientation === 'vertical';

  const [value, setValue] = React.useState(isRange ? (defaultValue as [number, number]) : (defaultValue as number));

  const minValue = isRange ? (value as [number, number])[0] : (value as number);
  const maxValue = isRange ? (value as [number, number])[1] : (value as number);

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMin = Number(e.target.value);
    if (!isRange) {
      setValue(newMin);
      onValueChange?.(newMin);
    } else if (newMin < maxValue) {
      setValue([newMin, maxValue]);
      onValueChange?.([newMin, maxValue]);
    }
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMax = Number(e.target.value);
    if (isRange && newMax > minValue) {
      setValue([minValue, newMax]);
      onValueChange?.([minValue, newMax]);
    }
  };

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
    indicator
  };

  return (
    <div className={classNames('slider', { 'slider-vertical': isVertical })}>
      {/* Track */}
      <SliderTrack {...childProps} />

      {/* Input Range */}
      <RangeInputs {...childProps} />

      {/* Marks */}
      <Marks {...childProps} />
    </div>
  );
}

export const Marks = ({ marks, min, max, minValue, maxValue, isVertical }: Record<string, any>) => {
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

export const SliderTrack = ({ isVertical, isRange, minValue, min, max, maxValue, color }: Record<string, any>) => {
  return (
    <div className='slider-track'>
      <div
        className='slider-progress'
        style={{
          [isVertical ? 'bottom' : 'left']: isRange ? `${((minValue - min) / (max - min)) * 100}%` : '0%',
          [isVertical ? 'height' : 'width']: isRange
            ? `${((maxValue - minValue) / (max - min)) * 100}%`
            : `${((minValue - min) / (max - min)) * 100}%`,
          ...(color && { background: color })
        }}
      />
    </div>
  );
};

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
  indicator
}: Record<string, any>) => {
  const isTooltip = indicator === 'tooltip';
  const normalPosition = isVertical ? 'left' : 'top';
  const reversePosion = isVertical ? 'right' : 'bottom';
  const position = indicatorSide === 'normal' ? normalPosition : reversePosion;

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
    className: 'par-input-range'
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
