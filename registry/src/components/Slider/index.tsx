import * as React from 'react';
import './index.css';
import { Input } from '@ui/BaseInput';

export interface SliderProps extends React.ComponentPropsWithoutRef<typeof Input> {}

export const Slider = React.forwardRef<React.ElementRef<typeof Input>, SliderProps>(
  ({ type = 'slider', ...props }, ref) => {
    return <Input ref={ref} type={type} {...props} />;
  }
);

Slider.displayName = 'Slider';
