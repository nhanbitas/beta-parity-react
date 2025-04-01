import React from 'react';
import './index.css';
import classNames from 'classnames';

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
  color = 'black',
  orientation = 'horizontal',
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
    } else if (newMin < maxValue - step) {
      setValue([newMin, maxValue]);
      onValueChange?.([newMin, maxValue]);
    }
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMax = Number(e.target.value);
    if (isRange && newMax > minValue + step) {
      setValue([minValue, newMax]);
      onValueChange?.([minValue, newMax]);
    }
  };

  return (
    <div className={classNames('slider', { 'slider-vertical': isVertical })}>
      {/* Track */}
      <SliderTrack
        isVertical={isVertical}
        isRange={isRange}
        minValue={minValue}
        min={min}
        max={max}
        maxValue={maxValue}
        color={color}
      />

      {/* Input Range */}
      <RangeInputs
        isVertical={isVertical}
        minValue={minValue}
        maxValue={maxValue}
        min={min}
        max={max}
        step={step}
        handleMinChange={handleMinChange}
        handleMaxChange={handleMaxChange}
        isRange={isRange}
        indicatorSide={indicatorSide}
      />

      {/* Marks */}
      <Marks marks={marks} min={min} max={max} isVertical={isVertical} minValue={minValue} maxValue={maxValue} />
    </div>
  );
}

export const Marks = ({
  marks,
  min,
  max,
  minValue,
  maxValue,
  isVertical
}: {
  marks: Mark[];
  min: number;
  max: number;
  minValue: number;
  maxValue: number;
  isVertical: Boolean;
}) => {
  const checkInRange = (value: number) => {
    const isNotRange = minValue === maxValue;
    return isNotRange ? value <= maxValue : value >= minValue && value <= maxValue;
  };

  return (
    <div className={classNames('slider-marks')} style={{ top: '50%', transform: 'translateY(-50%)' }}>
      {marks.map((mark, index) => (
        <div key={mark.value} className='slider-marks-item'>
          {/* Dot */}

          {index === 0 || index === marks.length - 1 ? null : (
            <div
              className={classNames('slider-dot', {
                'in-range': checkInRange(mark.value),
                'out-range': !checkInRange(mark.value)
              })}
              style={{
                [isVertical ? 'bottom' : 'left']: `${((mark.value - min) / (max - min)) * 100}%`
              }}
            />
          )}

          {/* Label */}
          {mark.label && (
            <span
              className='slider-label'
              style={{
                [isVertical ? 'bottom' : 'left']: `${((mark.value - min) / (max - min)) * 100}%`
              }}
            >
              {mark.label}
            </span>
          )}
        </div>
      ))}
    </div>
  );
};

export const SliderTrack = ({
  isVertical,
  isRange,
  minValue,
  min,
  max,
  maxValue,
  color
}: {
  isVertical: boolean;
  isRange: boolean;
  minValue: number;
  min: number;
  max: number;
  maxValue: number;
  color: string;
}) => {
  return (
    <div
      className='slider-track'
      style={{ background: 'lightgray', height: isVertical ? '100%' : '8px', width: isVertical ? '8px' : '100%' }}
    >
      {/* Highlighted range */}
      <div
        className='slider-highlight'
        style={{
          [isVertical ? 'bottom' : 'left']: isRange ? `${((minValue - min) / (max - min)) * 100}%` : '0%',
          [isVertical ? 'height' : 'width']: isRange
            ? `${((maxValue - minValue) / (max - min)) * 100}%`
            : `${((minValue - min) / (max - min)) * 100}%`,
          background: color
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
  indicatorSide
}: {
  isVertical: boolean;
  minValue: number;
  maxValue: number;
  min: number;
  max: number;
  step: number;
  handleMinChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleMaxChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isRange: boolean;
  indicatorSide?: 'normal' | 'reverse';
}) => {
  return (
    <React.Fragment>
      {/* Input Range - Min (or single) */}
      <input
        type='range'
        min={min}
        max={max}
        step={step}
        value={minValue}
        onChange={handleMinChange}
        className='slider-input'
      />

      {/* Input Range - Max (chỉ hiển thị nếu mode === "range") */}
      {isRange && (
        <input
          type='range'
          min={min}
          max={max}
          step={step}
          value={maxValue}
          onChange={handleMaxChange}
          className='slider-input'
        />
      )}

      {/* Lable */}
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
    </React.Fragment>
  );
};
