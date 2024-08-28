import React from 'react';
import '../global.css';
import '../loading-mask.css';

type Props = {
  children: React.ReactNode;
  color?: any;
};

const ThemeProvider = (props: Props) => {
  const { color } = props;

  if (!color) return props.children;

  /**
   * create a function/use library to generate palette accent theme
   */

  const accentPalette = {
    '--accent-25': color,
    '--accent-50': color,
    '--accent-100': color,
    '--accent-200': color,
    '--accent-300': color,
    '--accent-400': color,
    '--accent-500': color,
    '--accent-550': color,
    '--accent-600': color,
    '--accent-700': color,
    '--accent-800': color,
    '--accent-900': color,
    '--accent-950': color
  };

  return (
    <React.Fragment>
      {props.children}
      <style>
        {`:root *{${Object.keys(accentPalette)
          .map((key) => `${key}: ${accentPalette[key as keyof typeof accentPalette]};`)
          .join(' ')} }`}
      </style>
    </React.Fragment>
  );
};

export default ThemeProvider;
