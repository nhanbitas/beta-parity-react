'use client';

import * as React from 'react';
import './index.css';
import { Input } from '../Input';

import useCombinedRefs from '../hooks/useCombinedRefs';

export interface NumberInputProps {
  unit?: string | string[];
}

const NumberInput = React.forwardRef<
  React.ElementRef<typeof Input>,
  React.ComponentPropsWithoutRef<typeof Input> & NumberInputProps
>(({ unit, ...props }, ref) => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const combinedRef = useCombinedRefs(inputRef, ref);
  const [currentUnit, setCurrentUnit] = React.useState<string | string[] | undefined>(unit);

  return (
    <Input
      ref={combinedRef}
      type='number'
      {...props}
      ActionBtn={<UnitSelector unit={unit} setCurrentUnit={setCurrentUnit} currentUnit={currentUnit} />}
    />
  );
});

NumberInput.displayName = 'NumberInput';

export { NumberInput };

export interface UnitSelectorProps {
  unit?: string | string[];
  currentUnit?: string | string[];
  setCurrentUnit?: (unit: string | string[]) => void;
}

const UnitSelector = ({ unit, currentUnit, setCurrentUnit }: UnitSelectorProps) => {
  if (!unit) return <></>;

  return (
    <select value={currentUnit || ''} onChange={(e) => setCurrentUnit?.(e.target.value)}>
      {unit.length === 1 || typeof unit === 'string' ? (
        <option value={unit}>{unit}</option>
      ) : (
        unit.map((u: string) => (
          <option key={u} value={u}>
            {u}
          </option>
        ))
      )}
    </select>
  );
};
