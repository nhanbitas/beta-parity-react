import React from 'react';
import './index.css';
import { Input } from '../BaseInput';

// =========================
// TextInput
// =========================
// Declare and export TextInput type and TextInput component

/**
 * Props for the TextInput component.
 *
 * Extends properties from the `Input` component.
 */
export interface TextInputProps extends React.ComponentPropsWithoutRef<typeof Input> {}

/**
 * **Parity TextInput**.
 *
 *  @see {@link https://beta-parity-react.vercel.app/text-input Parity TextInput}
 */
export const TextInput = React.forwardRef<React.ElementRef<typeof Input>, TextInputProps>(
  ({ type = 'text', ...props }, ref) => {
    return <Input ref={ref} type={type} {...props} />;
  }
);

TextInput.displayName = 'TextInput';
