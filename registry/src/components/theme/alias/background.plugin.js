const background = ({ addComponents }) => {
  const backgroundClassToVariableMap = {
    'background-surface': '--gray-100',
    'background-surface-default': '--gray-50',
    'background-surface-default-hover': '--gray-100',
    'background-surface-default-active': '--gray-200',
    'background-surface-default-disabled': '--gray-100',
    'background-surface-default-selected': '--gray-200',
    'background-surface-default-selected-hover': '--gray-300',
    'background-surface-default-selected-active': '--gray-400',
    'background-surface-default-selected-disabled': '--gray-200',

    'background-alternative': '--gray-100',
    'background-surface-alternative': '--gray-50',
    'background-surface-alternative-hover': '--gray-100',
    'background-surface-alternative-active': '--gray-200',
    'background-surface-alternative-disabled': '--gray-100',
    'background-surface-alternative-selected': '--gray-100',
    'background-surface-alternative-selected-hover': '--gray-300',
    'background-surface-alternative-selected-active': '--gray-400',
    'background-surface-alternative-selected-disabled': '--gray-200'
  };

  const backgroundStyles = {};

  for (const [key, value] of Object.entries(backgroundClassToVariableMap)) {
    const valueToUse = { 'background-color': `var(${value})` };
    backgroundStyles[`.${key}`] = valueToUse;
  }

  addComponents(backgroundStyles);
};

export default background;
