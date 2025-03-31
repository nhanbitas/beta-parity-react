import { useState } from 'react';
import './index.css';

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
  onValueChange
}: SliderProps) {
  const isRange = mode === 'range';
  const [value, setValue] = useState(isRange ? (defaultValue as [number, number]) : (defaultValue as number));

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
    <div className='slider'>
      {/* Track */}
      <div className='slider-track' style={{ background: 'lightgray', height: '8px' }}>
        {/* Highlighted range */}
        <div
          className='slider-highlight'
          style={{
            left: isRange ? `${((minValue - min) / (max - min)) * 100}%` : '0%',
            width: isRange
              ? `${((maxValue - minValue) / (max - min)) * 100}%`
              : `${((minValue - min) / (max - min)) * 100}%`,
            background: color
          }}
        />
      </div>

      {/* Input Range - Min (hoặc single) */}
      <input
        type='range'
        min={min}
        max={max}
        step={step}
        value={minValue}
        onChange={handleMinChange}
        className='slider-input'
        style={{ top: '50%', transform: 'translateY(-50%)' }}
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
          style={{ top: '50%', transform: 'translateY(-50%)' }}
        />
      )}

      {/* Marks */}
      <div className='slider-marks' style={{ top: '50%', transform: 'translateY(-50%)' }}>
        {marks.map((mark, index) => (
          <div key={mark.value} className='slider-marks-item'>
            {/* Dot */}

            {index === 0 || index === marks.length - 1 ? null : (
              <div
                className='slider-dot'
                style={{
                  left: `${((mark.value - min) / (max - min)) * 100}%`
                }}
              />
            )}

            {/* Label */}
            {mark.label && (
              <span
                className='slider-label'
                style={{
                  left: `${((mark.value - min) / (max - min)) * 100}%`
                }}
              >
                {mark.label}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
