const themeMapDefault = {
  primary: 'orange',
  neutral: 'gray',
  success: 'green',
  danger: 'red',
  info: 'blue',
  custom: 'custom'
};

const stateMapDefault = {
  default: 500,
  hover: 600,
  focus: 600,
  active: 700,
  disabled: 400
};

const getTheme = (theme = 'primary' as keyof typeof themeMapDefault) => themeMapDefault[theme] || 'gray';

const getState = (state = 'default' as keyof typeof stateMapDefault) => stateMapDefault[state] || 500;

const getThemeColor = (theme: keyof typeof themeMapDefault, state: keyof typeof stateMapDefault) => {
  const themeColor = getTheme(theme);
  const stateColor = getState(state);
  return `var(--color-${themeColor}-${stateColor})`;
};

export const generateThemeVars = (
  component: string,
  theme: keyof typeof themeMapDefault,
  options: { themeMap: typeof themeMapDefault; stateMap: typeof stateMapDefault } = {
    themeMap: themeMapDefault,
    stateMap: stateMapDefault
  }
) => {
  const { stateMap } = options;

  const themeObject: { [key: string]: string } = {};

  Object.keys(stateMap).forEach((state: any) => {
    themeObject[`--${component}-${state}-border`] = getThemeColor(theme, state);
    themeObject[`--${component}-${state}-bg`] = getThemeColor(theme, state);
    themeObject[`--${component}-${state}-text`] = getThemeColor(theme, state);
  });

  return themeObject;
};
