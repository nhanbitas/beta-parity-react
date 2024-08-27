import React from 'react';
import '../global.css';
import '../loading-mask.css';

type Props = {
  children: React.ReactNode;
};

const ThemeProvider = (props: Props) => {
  return props.children;
};

export default ThemeProvider;
