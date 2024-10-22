'use client';

import * as React from 'react';
import './index.css';
import '../Select/index.css';
import { Input } from '../BaseInput';
import { NumericFormatProps, numericFormatter, removeNumericFormat } from 'react-number-format';

export interface NumberInputProps extends Omit<React.ComponentPropsWithoutRef<typeof Input>, 'type' | 'min' | 'max'> {
  unit?: string | string[];
  onUnitChange?: (unit: string) => void;
  min?: number;
  max?: number;
  value?: number | string;
  onValueChange?: ({
    value,
    floatValue,
    fomatedValue
  }: {
    value: string;
    floatValue: number;
    fomatedValue: string;
  }) => void;

  locales?: string | string[];
  formatOptions?: Intl.NumberFormatOptions;
}

const numbericChangeMeta = {
  from: { start: 0, end: 0 },
  to: { start: 0, end: 0 },
  lastValue: ''
};

// ! Lỗi không sử dụng được dấu "." từ bản phím khi sử dung thousandSeparator: '.', decimalSeparator: ',',

// export const NumberInput = React.forwardRef<React.ElementRef<typeof Input>, NumberInputProps>(
//   (
//     {
//       value,
//       inputMode = 'decimal',
//       min,
//       max,
//       unit = '',
//       formatOptions = {},
//       onChange,
//       onValueChange,
//       onUnitChange,
//       ...props
//     },
//     ref
//   ) => {
//     const [currentValue, setCurrentValue] = React.useState(value || '');

//     const options: NumericFormatProps = {
//       allowNegative: true,
//       thousandSeparator: '.',
//       decimalSeparator: ',',
//       allowLeadingZeros: true,
//       ...formatOptions
//     };

//     const updateCurrentValue = (stringValue: string) => {
//       const formatedNumber = numericFormatter(stringValue, options); // format
//       setCurrentValue(formatedNumber);
//       onValueChange?.({
//         value: stringValue,
//         floatValue: Number(stringValue),
//         fomatedValue: formatedNumber
//       });
//     };

//     const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//       const value = e.target.value;
//       if (!value) return updateCurrentValue('');
//       let stringValue = removeNumericFormat(value, numbericChangeMeta, options); // remove format
//       if (!Number(stringValue)) return updateCurrentValue(stringValue); // not a number, handle for ["-", "+"]
//       if (min != undefined && Number(stringValue) <= min) stringValue = min.toString(); // set min if less than min
//       if (max != undefined && Number(stringValue) >= max) stringValue = max.toString(); // set max if greater than max

//       onChange?.(e);
//       updateCurrentValue(stringValue);
//     };

//     const isSelectUnit = Array.isArray(unit);
//     const handleUitChage = (e: React.ChangeEvent<HTMLSelectElement>) => {
//       onUnitChange?.(e.target.value as string);
//     };

//     const unitElement = !!unit ? (
//       <span className={`input-icon number-input-unit ${isSelectUnit ? 'selectable' : ''}`}>
//         {isSelectUnit ? (
//           <select onChange={handleUitChage}>
//             {unit.map((u) => (
//               <option key={u} value={u}>
//                 {u}
//               </option>
//             ))}
//           </select>
//         ) : (
//           unit
//         )}
//       </span>
//     ) : null;

//     return (
//       <Input
//         ref={ref}
//         type='text'
//         value={value === undefined ? currentValue : numericFormatter(value.toString(), options)}
//         inputMode={inputMode}
//         onChange={handleChange}
//         ActionBtn={unitElement}
//         {...props}
//       />
//     );
//   }
// );

// NumberInput.displayName = 'NumberInput';

export const NumberInput = React.forwardRef<React.ElementRef<typeof Input>, NumberInputProps>(
  (
    {
      value,
      inputMode = 'decimal',
      min,
      max,
      unit = '',
      locales = 'en-US',
      formatOptions = {
        style: 'decimal'
      },
      onChange,
      onValueChange,
      onUnitChange,
      ...props
    },
    ref
  ) => {
    const [currentValue, setCurrentValue] = React.useState(value || '');

    const numberFormatter = numberFormatterFactory(locales, formatOptions);

    // TODO: handle cursor
    const updateCurrentValue = (stringValue: string) => {
      // TODO: should handle Nan in formatted number
      const formatedNumber = numberFormatter.format(stringValue);

      const inputValue = isNaN(Number(stringValue)) || !stringValue ? stringValue : formatedNumber;
      if (currentValue === inputValue) return;
      setCurrentValue(inputValue);
      onValueChange?.({
        value: inputValue,
        floatValue: (isNaN(Number(stringValue)) ? stringValue : Number(stringValue)) as number,
        fomatedValue: formatedNumber
      });
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;

      if (containsLetters(value)) return;
      if (!value) return updateCurrentValue('');

      let stringValue = numberFormatter.unformat(value).toString(); // remove format

      if (!Number(stringValue)) return updateCurrentValue(stringValue); // not a number, handle for ["-", "+"]

      if (min != undefined && Number(stringValue) <= min) stringValue = min.toString(); // set min if less than min
      if (max != undefined && Number(stringValue) >= max) stringValue = max.toString(); // set max if greater than max

      onChange?.(e);
      updateCurrentValue(stringValue);
    };

    const isSelectUnit = Array.isArray(unit);
    const handleUitChage = (e: React.ChangeEvent<HTMLSelectElement>) => {
      onUnitChange?.(e.target.value as string);
    };

    const unitElement = !!unit ? (
      <span className={`input-icon number-input-unit ${isSelectUnit ? 'selectable' : ''}`}>
        {isSelectUnit ? (
          <select onChange={handleUitChage}>
            {unit.map((u) => (
              <option key={u} value={u}>
                {u}
              </option>
            ))}
          </select>
        ) : (
          unit
        )}
      </span>
    ) : null;

    return (
      <Input
        ref={ref}
        type='text'
        value={value === undefined ? currentValue : numberFormatter.format(value.toString())}
        inputMode={inputMode}
        onChange={handleChange}
        ActionBtn={unitElement}
        {...props}
      />
    );
  }
);

NumberInput.displayName = 'NumberInput';

function numberFormatterFactory(locales: string | string[], options: Intl.NumberFormatOptions) {
  const formatter = new Intl.NumberFormat(locales, options);

  return {
    format(value: string): string {
      if (isNaN(Number(value))) return '';

      const stringValue = String(value);
      const demacialSeparator = formatter.format(1.1).charAt(1);

      if (stringValue.includes(demacialSeparator)) {
        const [integerPart, decimalPart, ...rest] = stringValue.split(demacialSeparator);
        const formattedIntegerPart = formatter.format(Number(integerPart));

        if (decimalPart !== undefined && decimalPart !== '') {
          return `${formattedIntegerPart}${demacialSeparator}${decimalPart}`;
        } else {
          return `${formattedIntegerPart}${demacialSeparator}`;
        }
      } else {
        return formatter.format(Number(stringValue));
      }
    },

    unformat(formattedValue: string): string {
      const demacialSeparator = formatter.format(1.1).charAt(1);
      const [integerPart, decimalPart, ...rest] = formattedValue.split(demacialSeparator);

      let unformattedValue = integerPart
        .replace(new RegExp(`[^\\d\\-\\${demacialSeparator}]`, 'g'), '')
        .replace(demacialSeparator, '.');

      if (decimalPart !== undefined) unformattedValue += `.${decimalPart}`;

      return unformattedValue;
    }
  };
}

function containsLetters(value: string): boolean {
  const regex = /\p{L}/u; // Biểu thức chính quy để kiểm tra chữ cái Unicode
  return regex.test(value);
}
