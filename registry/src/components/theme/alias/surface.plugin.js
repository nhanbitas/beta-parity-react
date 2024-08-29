const surface = ({ addComponents }) => {
  const surfaceClassToVariableMap = {
    '.surface': '--gray-300',
    '.surface-default': '--gray-100',
    '.surface-default-hover': '--gray-300',
    '.surface-default-active': '--gray-300',
    '.surface-default-disabled': '--gray-300',
    '.surface-default-selected': '--gray-300',
    '.surface-default-selected-hover': '--gray-300',
    '.surface-default-selected-active': '--gray-500',
    '.surface-default-selected-disabled': '--gray-300',

    '.surface-alternative': '--gray-100',
    '.surface-alternative-hover': '--gray-300',
    '.surface-alternative-active': '--gray-300',
    '.surface-alternative-disabled': '--gray-300',
    '.surface-alternative-selected': '--gray-300',
    '.surface-alternative-selected-hover': '--gray-300',
    '.surface-alternative-selected-active': '--gray-500',
    '.surface-alternative-selected-disabled': '--gray-300'
  };

  const surfaceStyles = {};

  for (const [key, value] of Object.entries(surfaceClassToVariableMap)) {
    const valueToUse = { 'background-color': `var(${value})` };
    surfaceStyles[`.${key}`] = valueToUse;
  }

  // Add the utility classes using Tailwind's `addComponents` function
  addComponents(surfaceStyles);
};

export default surface;
