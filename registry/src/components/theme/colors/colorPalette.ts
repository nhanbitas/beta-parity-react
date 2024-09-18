export const colorPalette = {
  transparent: 'transparent',
  inherit: 'inherit',
  black: '#000000',
  white: '#FFFFFF',
  gray: {
    DEFAULT: '#8D8D8D',
    25: '#F7F7F7',
    50: '#F1F1F1',
    100: '#E3E3E3',
    200: '#CBCBCB',
    300: '#ABABAB',
    400: '#8A8A8A',
    500: '#767676',
    550: '#6B6B6B',
    600: '#5F5F5F',
    700: '#4A4A4A',
    800: '#393939',
    900: '#262626',
    950: '#161616'
  },
  orange: {
    DEFAULT: '#FF5715',
    25: '#FEF5F0',
    50: '#FFEFE7',
    100: '#FFDDCD',
    200: '#FDBC9E',
    300: '#F4915C',
    400: '#E2672B',
    500: '#D1450C',
    550: '#C23901',
    600: '#AF3301',
    700: '#8D2800',
    800: '#6D2102',
    900: '#471700',
    950: '#251000'
  },
  blue: {
    DEFAULT: '#147AFF',
    25: '#F3F8FF',
    50: '#ECF2FF',
    100: '#D4E5FF',
    200: '#ACCDFF',
    300: '#73AEFF',
    400: '#438BF2',
    500: '#0074E3',
    550: '#0069D1',
    600: '#0F5FC0',
    700: '#004B9D',
    800: '#013A7B',
    900: '#002555',
    950: '#001536'
  },
  lime: {
    25: '#F2FAEC',
    50: '#E6F8DA',
    100: '#CCEDB5',
    200: '#A9D885',
    300: '#82BA50',
    400: '#609A21',
    500: '#48850D',
    550: '#47770A',
    600: '#426D13',
    700: '#365715',
    800: '#2C4417',
    900: '#1F2E13',
    950: '#13190E'
  },
  violet: {
    DEFAULT: '#884ACE',
    25: '#F9F6FE',
    50: '#F5EFFF',
    100: '#ECDEFF',
    200: '#D7C0FC',
    300: '#BE99FD',
    400: '#9E73F4',
    500: '#8259F1',
    550: '#724AEF',
    600: '#693CE5',
    700: '#512AC2',
    800: '#412291',
    900: '#2E185C',
    950: '#1B0F31'
  },
  cyan: {
    25: '#F1F9FE',
    50: '#E6F5FF',
    100: '#C5E9FF',
    200: '#93D2FA',
    300: '#5AB4E9',
    400: '#3692CA',
    500: '#1B7EB0',
    550: '#1D739C',
    600: '#24688D',
    700: '#22536F',
    800: '#244051',
    900: '#1A2A36',
    950: '#0F171C'
  },
  red: {
    DEFAULT: '#D62E42',
    25: '#FEF5F3',
    50: '#FFEEEC',
    100: '#FEDBDB',
    200: '#FFB8BB',
    300: '#FE8889',
    400: '#F15254',
    500: '#DB2D32',
    550: '#CB1C2B',
    600: '#BB142A',
    700: '#960821',
    800: '#750C1A',
    900: '#4D030A',
    950: '#2B0902'
  },
  yellow: {
    DEFAULT: '#FFBC05',
    25: '#F9F7F0',
    50: '#FBF4CB',
    100: '#F4E58F',
    200: '#EAC756',
    300: '#D2A524',
    400: '#BB8108',
    500: '#9F6D00',
    550: '#916300',
    600: '#865800',
    700: '#6C4712',
    800: '#543715',
    900: '#3A2815',
    950: '#211607'
  },
  green: {
    DEFAULT: '#39AC56',
    25: '#EEFBEF',
    50: '#DFFAE0',
    100: '#BCF0C3',
    200: '#93DB9F',
    300: '#57BF6F',
    400: '#219F58',
    500: '#198844',
    550: '#227A41',
    600: '#216F41',
    700: '#22592F',
    800: '#1E452A',
    900: '#152F1E',
    950: '#0E1A12'
  }
};

export const defaultColors = colorPalette.gray;

export const supportColors = colorPalette.lime;

export const successColors = colorPalette.green;

export const warningColors = colorPalette.yellow;

export const dangerColors = colorPalette.red;

export const infoColors = colorPalette.cyan;

export const kindColors = {
  default: defaultColors,
  success: supportColors,
  warning: warningColors,
  danger: dangerColors,
  info: infoColors
};